# Accessibility Workshop — Suggestions, Corrections & Improvements

## Corrections / gaps filled

- **Map view removed** — no list/map toggle on Events or All Events.
- **404 event** handled naturally: that card links to a dead route so the router's catch-all 404 renders (no hacks).
- **Payment outcome** stored as a field per event for deterministic demos (3 error, 1 → 404, rest success).
- **Route protection + logout** added (users blocked from `/admin/*`), with a natural focus issue on route change.
- **Persistence:** registering ("My events"), admin name edits, and deletes all write to localStorage so QA can validate.

## Recommended improvements (confirmed)

- **Facilitator issue map** (gitignored): per page — issue, WCAG rule, severity, fix. Single source of truth for guiding debates and validating fixes.
- **Seeded credentials** shown on the login page (admin + regular user) so QAs can reach admin-only pages on the demo link.
- **Hidden "Reset data" control** (discreet footer link) to re-run the workshop cleanly.
- **QA bug-log template** in the README (priority + rationale, WCAG rule #, short repro) for consistent, comparable logs.
- **"Realistic average codebase" approach:** native `button/input/table/form/headings` where a real dev would; div-based patterns only for custom widgets — believable, not pathologically broken.

## Optional extras (not implemented unless requested)

- **Empty states** (e.g., no "My events") for a couple of easy minor issues.
- A **filters "clear all"** as a vague icon button (another empty-name case).
- Reserve **2–3 pages** specifically for the screen-reader final hour to keep it focused.

## Minor flags (no action needed)

- Plaintext passwords in localStorage — fine for a dummy workshop, not production practice.
- base64 images in localStorage can bloat storage if many are added — acceptable for a workshop session.
