---
name: behavioral-tests
description: Write, refactor, or review automated tests that prove observable product behavior rather than implementation details. Use for regression tests, brittle mock-heavy suites, assertion design, and test-quality reviews, including integration tests against real Postgres, Redis, and internal test services, safe fixture ownership, and shared mock fixtures.
---

# Behavioral Tests

Base each test on a concrete product failure. A behavior-preserving refactor—including a rewrite in Effect—should leave it green. Apply repository-specific fixture guidance only where it belongs. If `references/private/` exists, read it first. It holds one team's repositories, fixtures, and test services, and its rules take precedence over the generic examples here.

## Define the scenario before writing assertions

- Read the relevant repository instructions, test setup, production behavior, and nearby integration tests.
- Name the failure the test should catch and the observable boundary: return value, HTTP response, persisted row, Redis state, emitted event, or outbound protocol.
- Name the test with the outcome and situation so a reviewer understands the scenario from the name alone. For example, write `creates a link for a toolkit enabled on the session` instead of `should work for enabled toolkit`. Avoid names such as `should work` or `handles X`.
- Derive expected behavior independently from the contract. Do not copy production algorithms, policy tables, or mappings into the expected result.
- Review-only requests do not authorize rewriting or deleting tests. Stay within the requested subsystem rather than launching a repository-wide audit.

## Exercise the boundary that can break

Use the real isolated test services that integration CI already runs, such as Postgres, Redis, and internal services, by default. Keep Postgres and Redis real when testing persistence, queries, joins, filters, constraints, transactions, expiration, or single-use consumption. Do not mock Prisma or program fake query results to prove database behavior.

When a test depends on state owned by an internal service that CI runs for real, publish that state through the service's fixture instead of stubbing its generated client. Keep mocking that service only for failure injection such as timeouts or 5xx responses.

```ts
// Bad: stub the catalog service, then assert the arguments it received
vi.spyOn(catalog, 'getItem').mockImplementation(/* ... */);
expect(getItemSpy).toHaveBeenCalledWith(
  expect.objectContaining({ version: LATEST_VERSION }),
);

// Good: publish two real versions and assert the API serves the latest
catalogItem = await createCatalogItemFixture({
  owner: String(project.id),
  name: 'Default-version fixture',
  description: 'Pinned fixture item',
});
const latest = await catalogItem.publishVersion({
  description: 'Latest fixture item',
});
const response = await app.request(
  `/api/items/${catalogItem.slug()}`,
  { headers: { 'x-api-key': apiKey } },
);
const body = await response.json();

expect(body.version).toBe(latest.version);
```

Mock a third-party provider only when its own behavior is outside the test's scope. Use narrow failure injection for a failure a healthy test service cannot reproduce. Do not mock away the boundary whose correctness the scenario claims to establish.

For pure computation, test inputs and outputs without adding infrastructure. In other repositories, follow their supported test environment while preserving the same boundary principle.

Before using shared fixtures, read the repository's fixture conventions. Confirm services point to isolated test resources, not production or a shared customer environment. If the test environment is unavailable, report the missing prerequisite; do not replace the integration test with a fake and claim equivalent coverage.

## Match assertion strength to the guarantee

- **Extensible responses:** assert the relevant fields, values, and absences. Do not make a compatible extra field fail the test.
- **Closed contracts:** use whole-shape equality when missing or additional fields are themselves a contract violation. Partial matching must not hide unexpected fields or extra authorized resources.
- **Collections:** check membership, exclusion, cardinality, and ordering according to the scenario. `arrayContaining` alone cannot prove that forbidden entries are absent.
- **Errors:** assert service error classes and stable fields, or HTTP status and error code. Avoid prose messages unless exact text is explicitly the contract under test.
- **Timing:** use benchmarks or telemetry for performance, not arbitrary wall-clock thresholds in ordinary unit tests. For expiration, retries, and timeouts, exercise the documented timing behavior using the repository's deterministic clock or supported integration strategy.

Ask: would adding an unrelated field break callers? If not, exact equality on the entire response is usually too strict. A security-sensitive whitelist or documented closed wire shape may require exactness.

Keep `expect()` easy to read. Await, unwrap, and transform into named values first. Use enough assertions to prove the scenario; there is no one-assertion-per-test rule.

```ts
// Bad
expect((await collectFailedConnectionIds(JOB)).unwrap()).toEqual([]);

// Good
const result = await collectFailedConnectionIds(JOB);
const failedConnectionIds = result.unwrap();

expect(failedConnectionIds).toEqual([]);
```

For errors, assert the class at a service boundary and status plus code at an HTTP boundary.

```ts
// Bad: prose is copy, not the contract
expect(json.error.message).toBe('Project not found: missing-project');

// Good: HTTP boundary
expect(response.status).toBe(404);
expect(json.error.code).toBe('PROJECT_NOT_FOUND');

// Good: service boundary
expect(result.err).toBe(true);
if (result.ok) return;
expect(result.val).toBeInstanceOf(JWTError.SigningKeyNotConfigured);
```

```ts
// The contract is omission of team, not an exact set of all query parameters.
const params = new URL(authorizationUrl).searchParams;
expect(params.has('team')).toBe(false);
expect(params.get('response_type')).toBe('code');
expect(params.get('user_scopes')).toBe('admin');
```

```ts
// A missing score is different from a present score with undefined or zero.
expect(attributes).not.toHaveProperty('search.top_score');
expect(attributes['search.num_results']).toBe(0);
```

## Preserve contracts, not internal plumbing

Avoid private helper access, production test-only exports, Prisma query-shape assertions, cache-hit checks, and internal collaborator call counts or ordering when those are not observable requirements.

Do not remove interaction assertions reflexively. Exact provider payloads, documented retry limits, required lock/mutation order, durable workflow replay, serialization, and migration compatibility can be legitimate contracts. Mocks, golden files, and snapshots are not defects by themselves.

For each suspected implementation-coupled test, inspect production code and establish one concrete concern:

- A behavior-preserving refactor would unnecessarily fail it.
- A product bug could still pass because the mock or copied logic supplies the expected answer.
- It freezes a private representation without protecting a caller-visible guarantee.

Replace the assertion at the nearest observable boundary. For example, prove one-time token redemption with a successful first read and empty second read against test Redis, rather than inspecting a mocked cache key. Preserve any separate key-confidentiality guarantee with its own appropriate test; single-use redemption does not prove secret handling.

Deletion is reasonable for a pure change-detector with no independent regression value. Before removing a test, identify any useful guarantee it still protects and retain or replace that coverage. Do not lower assertion strength merely to get a failing suite green.

## Share mocks through fixtures

When several suites mock the same module, move the mock into one production-typed fixture in the repository's shared fixtures directory. Inline copies drift from the production shape without anyone noticing. For example, an inline logger mock that covered 3 of the logger's 9 methods broke any suite whose code called `logger.debug`.

```ts
// Good: one production-typed fixture, reused by every suite
vi.mock('@/lib/logger', async () => {
  const { createLoggerFixture } = await import('@/tests/fixtures/logger');
  return { logger: createLoggerFixture() };
});

const { logger } = await import('@/lib/logger');
const loggerFixture = vi.mocked(logger);

beforeEach(() => {
  resetLoggerFixture(loggerFixture);
});
```

- Check the shared fixtures directory before writing a mock inline.
- If you are about to copy a mock into a second suite, move it into a fixture instead.
- Take fixture types from the production module (`Mocked<typeof logger>`), not hand-written shapes.
- Keep the `vi.mock` call in each suite and share only the fixture, so mock state cannot leak between files.
- If many suites still mock a module inline, migrate a suite when you touch it, but do not expand an unrelated PR to migrate all of them.

## Verify and hand off

Run focused tests using the repository's documented setup; include affected integration or route suites when the behavior crosses those boundaries. Never describe unexecuted checks as passing.

Before finishing, check:

- What observable bug makes each test fail?
- Would a behavior-preserving refactor still pass?
- Does the test exercise the real boundary and avoid a mock that supplies the answer?
- Do the assertions match the scenario, including required absence and exactness?
- Are errors checked through stable contracts and mutable fixtures privately owned?
- Is every mock used by more than one suite a shared fixture?

For changes, summarize scenarios added or retained, implementation-coupled checks removed, and actual test results or blockers. For reviews, give test and production locations, a concrete false-pass or false-failure scenario, and a replacement assertion. Do not count files containing mocks as defective tests.
