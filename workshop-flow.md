# Accessibility Workshop — Flow (≈4h)

## Prerequisites (before the day)

- Everyone reads the accessibility wiki pages for their role (QA / dev).

## Teams

- Pairs of 1 QA + 1 dev. Adjust to teams of 3 if numbers are odd.

## Intro & Demos (~30 min)

1. **Intro (5 min):** what accessibility is, the workshop goal, how the day runs.
2. **App demo (5 min):** quick tour of all pages and main features.
3. **Code demo (10 min):** structure, libraries (React / TS / Tailwind / React Router), tools, where things live; take questions.
4. **Gabi's tool demo (5 min):** what it is, live demo, why it's useful.
5. **Gabi's linter (brief):** what it is and what it does.

## Setup (~30–40 min)

- **QAs:** test the shared demo link, **keyboard navigation only**. Log proper bugs: priority (with why), broken WCAG rule #, short repro. Ignore functional bugs.
- **Devs:** fork the repo, run locally, deploy the fork to Netlify/Vercel so the team can test fixes; skim the app + code and ask questions.

## Preparation (~30–40 min)

- **Both roles:** run axe DevTools + browser widgets → capture initial score/issues. Facilitator explains rules and tooling.
- Discuss why accessibility is **both** roles' responsibility.
- **Common:** agree on issue priority together — what to fix first and why, how to reason about severity and order.

## Fixing (~1h30)

- **QAs:** continue testing/logging; validate fixes manually or with browser tools.
- **Devs:** fix → deploy → hand to QA to validate.
- **Common:** tackle subjective/ambiguous rules together and agree on the right call for this use case.
- Run Gabi's linter + tool during this time. Support available throughout.

## Final hour (flex)

- Either continue fixing + validating, **or** introduce web screen readers and have teams test/fix screen-reader issues on 2–3 pre-picked pages.
- Keep it from getting overloaded with information.

**Total: ~4h**
