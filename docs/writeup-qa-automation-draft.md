# Building a test suite that proves it catches bugs, not just that it passes

*Draft source material — factually checked against the original testing notes and commits.
Attribution corrected this pass, same issue as the RLS write-up: the original notes were written
in "we" throughout (collaborative), and an earlier draft tightened that into "I" without checking
whether it held. It didn't everywhere — fixed below.*

## The gap I noticed

YRT had CI wired up — type checking, lint, a build step — but zero actual tests. That's a real
gap most people miss: a green CI run proves the code *compiles*, never that a given function
*does the right thing*. I decided to fix that, deliberately, rather than arbitrarily — an AI
session did the actual setup and writing under that direction.

## What got tested first, and why I picked it

Not a random function — `sanitizeArticleHtml.ts`, the code that cleans HTML pasted into the blog
editor before it's shown to visitors. **I chose this one to go first**, for two reasons: it's a
security boundary (get it wrong and someone can inject a script into a public page), and its own
code comments already referenced a real bug found and fixed once before — which made it a
natural candidate for a regression test, not just a unit test. The AI session added Vitest,
wired a test script, and wrote 15 small tests, each checking one specific behavior — a
`javascript:` link gets stripped, a `../` path traversal gets blocked.

## Proving the suite actually catches bugs

A test suite that always passes might just be re-describing whatever the code already does,
right or wrong — that's not the same as verifying it. **I asked for the suite to be checked for
real**, not just written: the old, already-fixed bug was deliberately reintroduced, the suite was
run, and exactly one test failed while the other 14 stayed green. Then reverted. A test you
haven't watched fail is a test you don't actually trust yet.

## Testing against real, verified data instead of invented examples

For a separate CSV-export feature, rather than inventing example data, **the client** (the
business owner, not me) created a real test order directly in the live admin panel — deliberately
containing commas and quote marks, the trickiest case for CSV escaping. That real export was
decoded and used as the test's expected answer — proof the feature behaves correctly today, not
just that the code's internal logic is self-consistent. While building that test, the escaping
logic was found copy-pasted identically in three separate files; **I made the call** to pull it
into one shared, tested module instead of trusting three untested copies to stay in sync forever.

## Hitting a real wall, and stopping instead of forcing it

An end-to-end test that actually clicked the "Export" button in a real browser was wanted. Two
real blockers turned up: the login check lives in middleware with its own direct database
connection the test stub couldn't reach, and a fully local backend needed Docker, which couldn't
actually run in that environment — confirmed directly (`docker ps` failed cleanly), not assumed.
**I made the call** not to weaken the real login check just to make a test technically possible,
named the tradeoff, and kept the unit coverage already in hand instead. Knowing when *not* to
write a test is as much a skill as writing one — and that's the one skill in this whole
write-up that's unambiguously a judgment call, not an execution step.

## The filter for what's actually worth testing

Not everything deserves a unit test — testing every trivial function is wasted effort. The
priority order I use to direct this kind of work:

- **Security boundaries** — anything sanitizing input, checking permissions, or validating a
  URL/path.
- **Money or business logic** — anywhere a silent bug produces wrong data someone acts on
  without noticing.
- **Shared or duplicated logic** — the same function copy-pasted in two or three places is a
  signal it's load-bearing enough to extract and test once, properly.
- **Skip:** components that are mostly wiring or rendering props with no real branching logic —
  that's what manual or end-to-end checking is for, not a unit test.

## Three layers, not one — and why a passing test still isn't the finish line

I think about verification in three separate tiers, because none of them substitutes for the
others:

1. **Behavioral tests** — unit and integration tests that run real code (or a real database)
   and check the actual outcome.
2. **Mechanical pattern checks** — a separate, cheaper tool (see the RLS write-up) that scans raw
   SQL for specific bug *shapes* that have recurred before, without running anything. It can't
   prove a policy is correct — only flag a shape already known to have gone wrong once.
3. **Live verification** — re-running the same checks against the actual production service, not
   a local stand-in. On this project, a clean local suite passed repeatedly while a real
   platform-specific permission default was invisible to any local recreation, and only surfaced
   once tested against the live database. A clean local result is evidence, not proof.

## What I'd actually say if asked to walk through this

I didn't write the test code or the Vitest config myself — an AI session did, under my
direction. What's mine: I decided testing mattered when CI alone was creating a false sense of
coverage; I chose which function was risky enough to go first and why; I insisted the suite be
proven against a real reintroduced bug before I'd trust it; I made the call to stop rather than
weaken a real security check just to force a test through; and I set the priority filter for
what's worth testing at all. The actual data for the CSV test came from the client directly, not
from me or an AI. That's a real, specific role — not "I wrote the tests."

## Open, stated honestly

- No end-to-end test exists yet for the flow blocked by the Docker/middleware wall above — the
  right fix is deciding the end-to-end testing strategy *before* building login/auth, not after.
- No accessibility or performance checks are in place yet (color contrast, keyboard navigation,
  bundle size creep) — worth adding if the site carries real public traffic.
