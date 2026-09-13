# Building a test suite that proves it catches bugs, not just that it passes

*Draft source material — factually checked against the original testing notes and commits, not
yet voice-rewritten.*

## The gap I noticed

YRT had CI wired up — type checking, lint, a build step — but zero actual tests. That's a real
gap most people miss: a green CI run proves the code *compiles*, never that a given function
*does the right thing*. I decided to fix that, deliberately, rather than arbitrarily.

## What I tested first, and why

Not a random function — `sanitizeArticleHtml.ts`, the code that cleans HTML pasted into the
blog editor before it's shown to visitors. Two reasons it went first: it's a security boundary
(get it wrong and someone can inject a script into a public page), and its own code comments
already referenced a real bug found and fixed once before — which made it a natural candidate
for a regression test, not just a unit test.

I added Vitest, wired a test script, and wrote 15 small tests, each checking one specific
behavior — a `javascript:` link gets stripped, a `../` path traversal gets blocked.

## Proving the suite actually catches bugs

A test suite that always passes might just be re-describing whatever the code already does,
right or wrong — that's not the same as verifying it. To check mine for real, I deliberately
reintroduced the old, already-fixed bug, ran the suite, and watched exactly one test fail while
the other 14 stayed green. Then reverted. A test you haven't watched fail is a test you don't
actually trust yet.

## Testing against real, verified data instead of invented examples

For a separate CSV-export feature, rather than inventing example data, I had a real test order
created directly in the live admin panel — deliberately containing commas and quote marks, the
trickiest case for CSV escaping — exported the real file, and used the exact decoded bytes as
the test's expected answer. That's proof the feature behaves correctly today, not just that my
mental model of it is internally consistent. While building that test I also noticed the
escaping logic was copy-pasted identically in three separate files, and pulled it into one
shared, tested module instead of trusting three untested copies to stay in sync forever.

## Hitting a real wall, and stopping instead of forcing it

I wanted an end-to-end test that actually clicked the "Export" button in a real browser. Two
real blockers: the login check lives in middleware with its own direct database connection my
test stub couldn't reach, and a fully local backend needed Docker, which couldn't actually run
in that environment — confirmed directly (`docker ps` failed cleanly), not assumed. Rather than
weaken the real login check just to make a test technically possible, I named the tradeoff,
skipped that one test, and kept the unit coverage already in hand. Knowing when *not* to write a
test is as much a skill as writing one.

## The filter I use for what's actually worth testing

Not everything deserves a unit test — testing every trivial function is wasted effort. What I
prioritize:

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
2. **Mechanical pattern checks** — a separate, cheaper tool I built that scans raw SQL for
   specific bug *shapes* that have recurred before (the exact regression covered in the RLS
   write-up), without running anything. It can't prove a policy is correct — only flag a shape
   already known to have gone wrong once.
3. **Live verification** — re-running the same checks against the actual production service,
   not a local stand-in. On this project, a clean local suite passed repeatedly while a real
   platform-specific permission default was invisible to any local recreation, and only
   surfaced once tested against the live database. A clean local result is evidence, not proof.

## Open, stated honestly

- No end-to-end test exists yet for the flow blocked by the Docker/middleware wall above — the
  right fix is deciding the end-to-end testing strategy *before* building login/auth, not after.
- No accessibility or performance checks are in place yet (color contrast, keyboard navigation,
  bundle size creep) — worth adding if the site carries real public traffic.
