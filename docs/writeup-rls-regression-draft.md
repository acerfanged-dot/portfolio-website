# A regression that shipped silently, and the tool built to stop it happening again

*Draft source material — factually checked against commit history and the original postmortems,
not yet voice-rewritten. Replace this note when that pass happens.*

## The setup

I was reviewing PEPPOOL's database schema for access-control gaps (Row-Level Security policies
in Supabase/Postgres — rules the database itself enforces about which rows a user is allowed to
see or touch). Partway through, I decided to run the same review against YRT, an older,
already-live project of mine, to see if it held up. It didn't.

## Finding 1 — a bug I'd already fixed once came back

Months earlier I'd fixed a real access-control bug: a permission check function returned SQL
`NULL` instead of `false` for an ordinary user, and `if not is_admin()` treats `NULL` as neither
true nor false — so the restriction it was supposed to enforce silently never fired for anyone.
I fixed it, documented the fix and the reasoning directly in the migration file, and moved on.

Eight days later, an unrelated change — adding two new protected columns to the same table —
used `CREATE OR REPLACE FUNCTION` on that exact function to add the new columns' checks, and in
doing so pasted the *original broken version* of the permission check back in. Nobody touched
that function again after that. It sat live, in production, until I found it: any logged-in
customer could reassign their own assigned staff member, or rewrite their own recorded consent
timestamp, both of which should have required admin access.

I confirmed this wasn't theoretical by querying the live database directly for the function's
actual deployed source before touching anything, then wrote and applied a fix, then re-queried
to confirm the safe version was actually the one running.

**What made this worth writing up isn't the bug — it's why it came back.** A test already
existed that would have caught this exact regression. Nothing forced it to run before that
migration shipped. Documenting a fix, even documenting it well, doesn't stop a *different*
change from silently undoing it later if nothing mechanical rechecks it.

## Finding 2 — a permission check that didn't propagate to a related table

Separately: order status changes (e.g., marking an order paid) were correctly locked to admins
only. But a related table — line items belonging to an order — only checked that the order
belonged to the requesting customer, not what state the order was in. Combined with an
automatic total-recalculation trigger, a customer could add a new item to their own order
*after* it had already been marked paid, and the order's total would silently grow to include
it — a free item, with no real payment behind it. I traced the actual trigger definitions
end-to-end (not a summary of them) before confirming the gap was real, fixed the policy, added
regression tests that specifically re-create the exploit and assert it's now rejected, and
confirmed the fix live.

## What I built afterward

The real lesson wasn't "fix the bug" — it was that a documented rule with one worked example
still isn't self-enforcing. So I built a small static-analysis tool that scans SQL migration
files for the exact broken pattern (an un-negated or un-coalesced boolean permission check) and
flags it before it ships, without needing live database credentials.

The interesting part: the tool wasn't trustworthy on the first pass either. Run against real
migration files, it threw 11 false positives — it couldn't tell the difference between an
ordinary row-filtering policy clause and a table-level `CHECK` constraint, which have different
NULL-handling semantics, and it was reading its own fix migration's explanatory comments as if
they were live findings. I fixed both classes of false positive and re-verified against the real
files before trusting its output. A checker built to catch a shallow-check failure needed its
own shallow-check problem caught first — which felt like the right kind of ironic to note rather
than bury.

## Why this is the artifact I'd lead with

- Both bugs were real, live, in a production system real people use — not a lab exercise.
- Both were confirmed against the actual database, not just read off a migration file.
- The fix wasn't the end of the work — the recurrence is what got acted on, with a tool, and
  the tool's own failure modes got the same scrutiny as the original bug.

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
  privilege increase I wasn't willing to take on without deciding it separately) or a local
  database harness, and that tradeoff hasn't been decided.
