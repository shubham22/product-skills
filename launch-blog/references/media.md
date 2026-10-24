# Media for a launch story

Use real footage or screenshots when the post describes a working product. A visual should answer a question: what do we configure, how do we use it, or what happens when it runs?

## Select the right medium

- **Screenshot:** a configuration, saved result, or code/output the reader needs time to inspect.
- **GIF:** a short interaction or a change whose order matters. An annotated comparison can also work when clearly labeled as response excerpts.
- **No visual:** the point is already clear in one sentence or a small code example.

Do not force a fixed number of images or GIFs. Avoid duplicating the same screen without a new purpose. Use a full-enough configuration crop to preserve the feature’s context; avoid a whole desktop with unreadably small UI text.

## From recording to GIF

1. Inspect a storyboard or sampled frames before choosing time ranges. Find the actual interaction and final result; do not assume timestamps or crop coordinates from another recording.
2. Crop browser chrome, customer-specific project names, usernames, private message contents, tokens, and unrelated windows. Check all frames because content moves during scrolling and transitions. If safe cropping is impossible, redact visibly or choose another excerpt; never replace a private result with invented data.
3. Keep one clear idea per clip. Shorten idle time, preserve enough context to understand the action, and pause on meaningful results. Roughly 6–15 seconds is a useful starting point, not a requirement.
4. Use restrained chapter labels or emphasis outside the captured UI. Keep source behavior intact. Label a montage or annotated comparison as excerpts; do not imply it is uninterrupted footage or a timing benchmark.
5. Preserve text readability at the intended publication width. Optimize frame rate, dimensions, palette, and frame differences to reduce file size. Avoid changing source values or creating a fake product UI for a product demonstration.
6. Choose an informative first frame. Export a PNG poster and a standalone GIF. The same frame should explain something useful in a static document or reduced-motion presentation.
7. Decode and review the beginning, transitions, and end, and scan the source-frame storyboard for leaks. Check GIF timing, dimensions, loop behavior, file size, and any encoding artifacts. Remove accidental loading flashes when the edit remains an honest excerpt.

Use locally available media tooling appropriate to the recording. Do not assume a particular operating system, decoder, or installed package. Keep editing scripts and QA frames separate from final publishing assets. A recorded clip does not authorize another live test or a write operation.

## Word and web delivery

For DOCX, an embedded animated GIF may display only its first frame in some viewers. Validate the static rendering, preserve the actual multi-frame GIF in the document when supported, and give the user the standalone GIF for publishing. Do not promise universal playback or mistake a successful PDF render for an animation test.

For a web-targeted artifact, honor reduced-motion preferences with a poster or provide a way to pause animation when the output format permits. Do not replace an explicitly requested Word deliverable with a web page without explaining the choice.

Captions state what the visual proves: “The same policy allows the reads and rejects the send attempt.” Avoid captions that merely say “Screenshot of the dashboard.”
