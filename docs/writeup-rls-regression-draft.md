# A regression that shipped silently, and the tool built to stop it happening again

*Draft source material — factually checked against commit history (including git author/
co-author trailers, not just commit messages) and the original postmortems. Second attribution
pass: the first pass fixed the tool-build section; this one corrects the origin story, which was
wrong in a different, more basic way — it assumed I'd personally found the original bug.*

## Part 1 — a bug found by accident, not by looking for it

In July, an AI session was building an unrelated feature — a new trigger for the checkout/orders
flow, on a separate branch — and noticed something wrong nearby: a different, older trigger
(`protect_account_columns()`, which is supposed to stop an ordinary customer from reassigning
their own clinician or rewriting their own email) had a real bypass. Its permission check,
`if not is_admin()`, relied on `is_admin()` returning `true` or `false` — but for an ordinary
customer with no admin role claim at all, it returned SQL `NULL` instead. `if not <null>` never
executes its body in PL/pgSQL, so the one role the check most needed to restrict was exactly the
role it silently never restricted. Any logged-in customer could run an ordinary `UPDATE` and
reassign their own clinician to anyone, or rewrite their own email.

The AI session confirmed this live in a sandbox — not theorized from reading the code — fixed
the trigger, and separately found and fixed a masking bug in the project's own test suite: the
test meant to catch exactly this had a bare exception handler that caught the test's own
deliberate failure signal the same way it caught a real one, so it had been silently passing
regardless. All of that — the find, the fix, the live confirmation, the test-suite fix — is in
one commit, authored and committed entirely by the AI session. **I want to be precise about my
own role here: I don't have a confirmed record of what I personally did in that session** —
whether the live-confirmation step happened because I asked for it or because it's standard
practice regardless, I can't verify from the commit alone, and I'd rather say that plainly than
imply I caught this myself.

## Part 2 — it came back, and nobody was watching

Eight days later, an unrelated change added two new protected columns to the same table, and to
wire in their checks it used `CREATE OR REPLACE FUNCTION` on the exact function that had just
been fixed — and in doing so, pasted the *original broken version* of the permission check back
in. Nobody touched that function again after that. **It sat live, in production, for roughly six
weeks, and nothing caught it — not me, not any process, nothing.** That's the real gap: a
documented fix, with a clear written root cause right in the migration file, still didn't
survive contact with a completely unrelated later change.

## Part 3 — how it actually resurfaced

In September, I was personally reviewing PEPPOOL's database schema — a different project — for
access-control gaps, directing that review and then reviewing what an AI session found (three
real gaps there, detailed in the tool-build section below). Partway through, **I made the call**
to widen the same kind of check to YRT too — a general "check the other project's SQL as well"
decision, not a specific hypothesis that the exact PEPPOOL bug would also be in YRT. An AI
session ran that review under my direction, and that's what found the regression — the exact
same bug shape, silently back, six weeks after being fixed the first time.

The same review also found a second, independent bug: a permission check on order status changes
was correctly admin-only, but a related table (line items belonging to an order) only checked
who owned the order, not what state it was in — letting a customer add a new item to their own
order *after* it had already been marked paid, silently growing the total with no real payment
behind it.

**What's actually mine in Part 3:** I made the call to widen the review's scope. I reviewed and
approved both fixes. And I applied and confirmed both against the live production database
myself — an AI session structurally cannot hold live production credentials, so anything that
touches the real system runs through me, not through the session that found or drafted the fix.

## Part 4 — the tool built afterward, and the question that changed its scope

The real lesson wasn't "fix the bug again" — it's that a documented rule with one worked example
still isn't self-enforcing; nothing mechanical re-checked a `CREATE OR REPLACE FUNCTION` against
previously-fixed vulnerable shapes before it shipped. **I decided** a small static-analysis tool
was worth building to catch this bug shape automatically going forward, without needing live
database credentials, and an AI session wrote it.

When the first version only covered this one bug shape, **I asked the question that changed its
scope** — "so this only checks one type of bug?" — which is what took it from one check to
three (it now also catches a Postgres privilege-escalation footgun and a different test-masking
pattern). The tool wasn't trustworthy on its first real run either: against actual migration
files, it threw 11 false positives, misreading ordinary policy clauses as something else
entirely. The AI session found and fixed both root causes before I trusted its output.

## What I'd actually say if asked to walk through this, start to finish

I didn't find the original bug, write the fix, trace the trigger logic, or write the detection
regexes — an AI session did all of that, across two separate incidents, months apart. What's
mine, specifically: the decision to widen scope from PEPPOOL to YRT; the decision to build a
tool rather than trust documentation alone; the question that corrected the tool's actual scope;
and everything that touched the real, live production database, which only ever runs through me.
That's a narrower claim than "I found and fixed this," and it's the one I can actually defend if
asked to go deeper on any part of it.

## Why this is still the artifact I'd lead with

- Two real bugs, live, in a production system real people use — not a lab exercise, and not
  hypothetical: the header comment on the original fix shows the exact live exploit that worked.
- The regression is the more interesting finding than either bug on its own: documenting a fix
  well was not sufficient to prevent it recurring, and it took an unrelated review, widened by a
  judgment call, to catch it again — nothing was watching in between.
- The response wasn't just "fix it twice" — it was building something that watches now, and then
  subjecting that something to the same scrutiny the original bugs got.

## Note — to fold in later, not yet done

This became a standing practice, not a one-off: once the tool existed, it was run as a full
sweep across YRT's entire codebase (92 files) and Tios Bandidos's (4 files), not just the two
bugs already known — and it's now a standard check before trusting any new schema change on
PEPPOOL going forward. The full YRT sweep found 2 more real issues (a masked-test-failure
pattern, a test's own deliberate failure signal getting silently swallowed by an overly broad
exception handler) in files written the same session. **These 2 findings are still open,
unfixed, as of the last commit touching them** — say so honestly if this comes up, don't imply
they were resolved like the first two.

## Open, stated honestly

- The tool is SQL/Postgres-specific and pattern-based — it would not catch a permission bug
  outside the shapes it knows to look for. It's a guard against a known-recurring pattern, not
  a general vulnerability scanner.
- A second, "run the real test suite automatically" tier was considered and deliberately not
  built yet — it would need either live database credentials in an automated context (a real
  privilege increase not taken on without deciding it separately) or a local database harness,
  and that tradeoff hasn't been decided.
- `[VERIFY: whether the original July live-confirmation step was requested by the operator or
  ran as standard practice regardless]` — flagged rather than guessed, per the correction above.
