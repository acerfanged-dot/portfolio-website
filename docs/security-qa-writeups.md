# Two write-ups: a security regression, and a test suite built to prove itself

The long versions of the "Security" sections on the case studies. Both describe real bugs,
confirmed against live databases rather than read off a schema file.

**On naming.** The systems are described by shape rather than by name, and identifiers are
generic. Both are real projects of mine, but one belongs to a client, and their security
history isn't mine to publish in detail. The mechanisms are exactly as they happened —
nothing here is invented or softened for the retelling.

**On attribution.** I direct AI-assisted development and verify the results; I don't yet write
production code unassisted. Below, "I" means decisions, scoping calls, the questions that
changed an outcome, and anything touching a live production database. Work an AI session did is
attributed to an AI session. Where I can't confirm my own role, I say so rather than guessing.

---

## 1. A regression that shipped silently, and the tool built to stop it happening again

**The setup.** An AI session reviewed a commerce platform's database schema for access-control
gaps — Row Level Security policies in Supabase/Postgres, the rules the database itself enforces
about which rows a given user may see or change. It found three: a suspension flag not enforced
on four write paths, a "submit once" rule with nothing in the database backing it, and an
undocumented ownership assumption behind one table's write model.

I scoped that review and reviewed its findings. I did not personally read the schema.

Partway through I made the call to widen the same check to an older project of mine, to see
whether it held up. It didn't.

**Part 1 — a bug found by accident, not by looking for it.** In July, an AI session was building
an unrelated feature on a separate branch and noticed something wrong nearby. An older trigger —
meant to stop an ordinary customer from reassigning the professional assigned to their account,
or rewriting their own email — had a real bypass.

The permission check was `if not is_admin()`. That relies on `is_admin()` returning true or
false. For an ordinary customer with no admin role claim, it returned SQL `NULL`. In PL/pgSQL,
`if not <null>` never executes its body — so the one role the check most needed to restrict was
exactly the role it silently never restricted. Any logged-in customer could run an ordinary
`UPDATE` and rewrite fields the trigger existed to protect.

The AI session confirmed this live in a sandbox rather than theorising it from the code, fixed
the trigger, and separately found and fixed a masking bug in the project's own test suite. That
work is one commit. I want to be precise about my role: I don't have a confirmed record of what
I personally did in that session, and I'd rather say that than imply I caught it.

**Part 2 — it came back, and nobody was watching.** Eight days later, an unrelated change added
two new protected columns to the same table. To wire in their checks it used `CREATE OR REPLACE
FUNCTION` on the exact function that had just been fixed — and pasted the original broken check
back in. Nobody touched that function again.

It sat live for roughly six weeks and nothing caught it. Not me, not any process. A documented
fix, with a clear written root cause right there in the migration file, still didn't survive
contact with an unrelated later change.

**What the exposure actually was, stated precisely.** This project was deployed but had not yet
onboarded a single customer. The vulnerability was real, and confirmed exploitable against a
live database — but the population it could have affected was zero. I'd rather say that plainly
than let "live in production for six weeks" imply harm that didn't occur. The interesting part
was never the blast radius. It's that a fix with a written root cause was silently undone by an
unrelated change, and nothing mechanical noticed for six weeks.

**Part 3 — how it resurfaced.** In September I made the call to widen the first review to this
older project too. A general "check the other codebase's SQL as well" decision, not a hypothesis
that this specific bug would be there. An AI session ran that review under my direction, and
that's what found the regression — the same bug shape, silently back.

The same review found a second, independent bug. A permission check on order status changes was
correctly admin-only, but a related table — the line items belonging to an order — checked only
who owned the order, never what state it was in. A customer could add a new item to their own
order *after* it was already marked paid, silently growing the total with no payment behind it.

What's mine here: the decision to widen scope, reviewing and approving both fixes, and applying
and confirming both against the live production database myself. An AI session structurally
cannot hold live production credentials, so anything touching the real system runs through me —
not through the session that found or drafted the fix.

**Part 4 — the tool, and the question that changed its scope.** The lesson wasn't "fix the bug
again." It's that a documented rule with one worked example isn't self-enforcing: nothing
mechanical re-checked a `CREATE OR REPLACE FUNCTION` against previously-fixed vulnerable shapes
before it shipped.

I decided a small static-analysis tool was worth building to catch this shape automatically,
without needing live database credentials. An AI session wrote it. The first version covered
only the one shape, and the question I asked — "so this only checks one type of bug?" — is what
took it from one check to three.

It wasn't trustworthy on its first run either. Against real migration files it threw 11 false
positives, mostly ordinary policy clauses misread as CHECK constraints — which matters, because
Postgres treats a NULL differently in those two contexts. Both root causes were fixed before its
output was trusted. It has since been swept across 96 files in two codebases and is now a
standing check before any new schema change is trusted.

**What I'd say if asked to walk through this.** I didn't find the original bug, write the fix,
trace the trigger logic, or write the detection patterns — an AI session did all of that, across
two incidents months apart. What's mine: the decision to widen scope from one project to the
other, the decision to build a tool rather than trust documentation alone, the question that
corrected the tool's scope, and everything touching the live production database. That's a
narrower claim than "I found and fixed this," and it's the one I can defend at any depth.

**Still open, stated plainly:**

- The full sweep surfaced two further issues — a masked-test-failure pattern — that remain
  unfixed as of the last commit touching them.
- The tool is SQL/Postgres-specific and pattern-based. Not a general vulnerability scanner, and
  it prints that on every run, including clean ones.
- A "run the real test suite automatically" tier was considered and deliberately not built. It
  would need live database credentials in an automated context, which isn't a decision I'll take
  on incidentally.

---

## 2. Building a test suite that proves it catches bugs, not just that it passes

**The gap.** The project had CI wired up — type checking, lint, a build step — and zero actual
tests. A green CI run proves the code compiles. It never proves a given function does the right
thing. I decided to fix that; an AI session did the setup and writing under that direction.

**What got tested first, and why.** Not a random function — the code that sanitises HTML pasted
into a blog editor before visitors see it. I chose it for two reasons: it's a security boundary,
since getting it wrong lets someone inject a script into a public page, and its own code comments
already referenced a real bug found and fixed once before. The AI session added Vitest, wired a
test script, and wrote 15 small tests, each checking one specific behaviour.

**Proving the suite actually catches bugs.** A suite that always passes might just be
re-describing whatever the code already does, right or wrong. So I asked for it to be checked for
real, not just written: the old, already-fixed bug was deliberately reintroduced, the suite run,
and exactly one test failed while the other 14 stayed green. Then reverted. A test you haven't
watched fail is a test you don't trust yet.

**Testing against real data instead of invented examples.** For a separate CSV-export feature,
rather than inventing example data, I created a real test order in the live admin panel myself,
deliberately containing commas and quote marks — the trickiest case for CSV escaping. That real
export was decoded and used as the test's expected answer. While building it, the escaping logic
turned up copy-pasted identically in three separate files; I made the call to pull it into one
shared, tested module rather than trust three untested copies to stay in sync forever.

**Hitting a wall, and stopping instead of forcing it.** An end-to-end test that actually clicked
"Export" in a real browser was wanted. Two real blockers: the login check lives in middleware
with its own direct database connection the test stub couldn't reach, and a fully local backend
needed Docker, which couldn't run in that environment — confirmed directly, not assumed. I made
the call not to weaken a real login check just to make a test technically possible, named the
tradeoff, and kept the unit coverage already in hand. Knowing when not to write a test is part
of the job.

**The filter for what's worth testing:**

- **Security boundaries** — anything sanitising input, checking permissions, validating a path
  or URL.
- **Money and business logic** — anywhere a silent bug produces wrong data someone acts on
  without noticing.
- **Shared or duplicated logic** — the same function copy-pasted in three places is a signal
  it's load-bearing enough to extract and test once, properly.
- **Skip** components that are mostly wiring or rendering props with no real branching.

**Three layers, and why a passing test still isn't the finish line:**

1. **Behavioural tests** — unit and integration tests that run real code and check the actual
   outcome.
2. **Mechanical pattern checks** — the cheaper tool described above, scanning raw SQL for bug
   shapes that have recurred before, without running anything.
3. **Live verification** — re-running the same checks against the real service. On this project
   a clean local suite passed repeatedly while a platform-specific permission default stayed
   invisible to every local recreation, and only surfaced against the live database. A clean
   local result is evidence, not proof.

**What I'd say if asked to walk through this.** I didn't write the test code or the Vitest config
— an AI session did, under my direction. What's mine: deciding testing mattered when CI alone was
creating a false sense of coverage; choosing which function was risky enough to go first, and
why; insisting the suite prove itself against a reintroduced bug before I'd trust it; the call to
stop rather than weaken a real security check to force a test through; and the priority filter
above. The CSV test data was mine — I created that order. The export testing itself was a joint
pass across the project's two export functions, a full-data export and a scoped sales-only one.

**Still open, stated plainly:**

- No end-to-end test yet for the flow blocked by the Docker/middleware wall. The fix is known
  rather than hoped for — a Docker-free local Postgres harness, real Postgres, no live
  credentials, already proven working on this machine on both projects. It just hasn't been
  pointed at this test yet. A "not done" gap, not a "don't know how" one.
- No accessibility or performance checks in place yet.
