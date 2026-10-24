# Diagram snippets (Mermaid)

Render with `scripts/render_diagrams.sh <dir>`; every `.mmd` in the dir becomes a `.png`.

## Current request path (sequence)
```mermaid
sequenceDiagram
    participant App as Customer application
    participant AP as Service A<br/>(vendor cloud)
    participant EX as Executor<br/>(vendor cloud)
    participant PR as Provider API
    App->>AP: Request: arguments, files
    Note over AP: Resolves account and<br/>decrypts credentials
    AP->>EX: Credentials + arguments + code bundle
    EX->>PR: Provider request
    PR-->>EX: Response
    EX-->>AP: Result
    Note over AP: Request and response logged<br/>(retention: N days)
    AP-->>App: Result
```

## Option with a customer-hosted executor (sequence)
```mermaid
sequenceDiagram
    participant App as Customer application
    participant GW as Local gateway<br/>(customer VPC)
    participant KR as Credential proxy + KMS<br/>(customer VPC)
    participant EX as Executor<br/>(customer VPC)
    participant PR as Provider API
    participant CP as Vendor control plane
    Note over GW,CP: Agent pulls signed bundles + config (outbound only)
    App->>GW: Tool call (local endpoint)
    GW->>KR: Resolve or refresh credential
    GW->>EX: Execute signed bundle
    EX->>PR: Provider request
    PR-->>EX: Response
    EX-->>GW: Result
    GW-->>App: Result — never leaves the customer boundary
    GW--)CP: Metadata allowlist only: tool, status, latency, error class
```

## Control plane / data plane split (flowchart)
```mermaid
flowchart LR
  subgraph C["CUSTOMER ENVIRONMENT — payloads, credentials, logs stay here"]
    APP["Customer app"] --> DP["Data plane<br/>executes everything"]
    DP --- KEY["Customer KMS / secrets"]
    AGT["Agent<br/>pulls desired state, verifies signatures"] --> DP
  end
  DP --> PROV["Provider APIs"]
  subgraph V["VENDOR CLOUD — control plane, no payload access"]
    CP["Catalog · signed artifacts · desired state · fleet health · billing"]
  end
  AGT -. "outbound-only mTLS · enumerated metadata" .-> CP
```

## Vendor-operated deployment in a customer sub-account (flowchart)
```mermaid
flowchart LR
  subgraph C["CUSTOMER SUB-ACCOUNT — holds only the vendor's deployment"]
    AGT["Vendor agent<br/>bounded, audited verbs: upgrade to digest, restart, scale"]
    DP["Data plane"]
    AGT --> DP
    APPS["Customer apps"] --> DP
  end
  subgraph V["VENDOR CLOUD"]
    CP["Control plane: one release train · gated waves · rollback"]
    REG["Signed image registry (mirrorable)"]
  end
  AGT -. "outbound only: pull proposed ops<br/>managed tier auto-approved · strict tier customer-approved" .-> CP
  REG -. "signed artifacts" .-> AGT
```

Tips: `box … end` participant grouping needs Mermaid ≥ 10.3 — put the zone in the
participant label instead when the target renderer is older. Avoid parentheses inside
`box` titles. Check note text renders (set `noteTextColor`). Diagrams taller than wide
should be placed at reduced width.
