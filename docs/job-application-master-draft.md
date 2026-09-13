# Job application master draft

*Single working document — edit this one file, not three. Combines the resume and both
write-ups that were previously separate drafts (`resume-security-qa-role-draft.md`,
`writeup-rls-regression-draft.md`, `writeup-qa-automation-draft.md` — now removed, this
replaces them). Everything here is factually checked against commit history, not yet
voice-rewritten — that pass is yours. AI-written sections use "I" only for what's actually
verified as yours (decisions, scoping calls, anything touching a live system); everything else
is attributed to "an AI session."*

---

## Part 1 — Resume

acer.fanged@gmail.com | +63 927 422 2851 | Philippines | Remote
Live build: https://peppool-website.vercel.app/
Portfolio: https://portfolio-website-dusky-gamma-96.vercel.app/
GitHub: github.com/acerfanged-dot

*Standard section headers and consistent Title | Organization | Dates ordering throughout,
deliberately, for ATS parsing — not written in the narrative style of the Hobbyland resume.*

### SUMMARY

Self-taught, AI-directed developer with real, live production systems and one concrete,
verified security finding to show for it — not a CTF or coursework background, a live bug on a system I already owned and shipped, which I directed the review that found, decided the fix for, and personally applied and confirmed against the real database myself. Comfortable in both modes this role asks for: directing an adversarial review (deciding scope, asking the question that corrects it) and methodical QA (requiring a test prove itself before I'll trust it). Daily, structured user of Claude and GPT-class models — specify, direct, verify, document — not a casual user claiming AI fluency without evidence.

### SECURITY & QA PROJECTS

*Attribution below is deliberately specific about what I did myself versus what an AI session
did under my direction — the honest version needs to survive being asked about directly.*

**Directed Security Review, Regression Fix & Detection Tool — Personal Projects (PEPPOOL, YRT)**
| 2026

- Directed an AI-run review of a database's Row-Level-Security policies (Supabase/Postgres) on PEPPOOL, which found three real access-control gaps (a suspension flag not enforced on four write paths; an unenforced "submit once" rule; an undocumented ownership assumption).
- Made the call to extend the same kind of review to YRT, an older, already-live project; an AI session ran that review under my direction and found a previously-fixed permission bug had been silently reintroduced by an unrelated later migration — live in production.
- Decided the fix and applied it against the live production database myself, since an AI session cannot hold live production credentials — anything touching the real system runs through me. Had the session re-verify the corrected function was the one actually deployed.
- Same review surfaced a second, independent bug: a write-permission check on one table wasn't inherited by a related table. Reviewed and approved the fix; applied and confirmed it live myself, same as above.
- Decided a static-analysis tool was worth building to catch this bug *shape* automatically in future SQL changes; an AI session wrote it. Asked the scoping question ("does this only check one type of bug?") that took it from one check to three. The tool had real precision bugs (11 false positives) on its first run — found and fixed before trusting its output.
- Directed a full sweep of the finished tool across both projects' codebases (96 files combined) and made it a standing check before trusting any new schema change going forward.

**Regression-Test Suite Direction — Personal Project (YRT)** | 2026

- Identified a codebase with CI (type-checking, lint, build) but zero behavioral tests — a
  green pipeline that proved the code compiled, never that it did the right thing. Directed an AI session to add a test framework and write tests, prioritized by risk (security boundaries and business logic first).
- Required the suite to prove itself before I'd trust it: had a known-fixed bug deliberately reintroduced, confirmed exactly the relevant test failed, then reverted.
- Made the call not to weaken a real login/security check just to force an end-to-end test through a technical blocker (an auth layer my test stub couldn't reach) — named the tradeoff and kept the unit coverage already in hand instead.

### AI-DIRECTED DEVELOPMENT

**Full-Stack E-Commerce Platform — Personal Project (PEPPOOL)** | 2026

- Directed the AI-assisted build of a live group-buy ordering platform: database schema, access-control rules, server-verified pricing logic, and automated tests.
- Personally verify every AI-assisted change against the live system before trusting it — the security finding above came directly out of that verification habit, not a separate security-specific effort.
- Deployed on Vercel with a Supabase backend; currently taking real customer orders.

**Verification-First Working Method** | ongoing

- Maintain a written, dated decision record for AI-directed work — what was built, what was verified and how, and what's still open — rather than trusting a task as "done" because an AI reported it so.
- Directed the build of a small personal toolset of mechanical checks (documentation integrity, version-consistency, the SQL security checks above) specifically because a documented rule and a single fix did not, on their own, prevent the same bug from recurring.

### PROFESSIONAL EXPERIENCE

**Freelance Data Operations** | Remote — Multiple Clients | 2015 – Present

- Recurring monthly sales-compensation pipeline (Amazon + Shopify, 5 source files) where cleaning accuracy directly determined whether compensation calculated correctly.
- Real-estate market reporting for two clients, ~30 geographic files monthly, fixed deadlines, manual accuracy-checking workflow built in the absence of automated tooling.
- Standardized a 300,000+ item product catalog for automated upload — zero-failure ingestion on delivery.

**Production Operations, Baker** | Valley Bread | 2025 – 2026

- Sole-responsibility production runs, 100% daily inventory accuracy, front-line technical resource for customer inquiries.

**Content and Operations Specialist** | Adventure Tourism Platform — Remote | 2023 – 2024

- Content entry/formatting across a proprietary CMS; early adoption of AI image-generation tools for production marketing assets at scale.

### SKILLS & TOOLS

**AI tooling:** Claude (daily, structured — agentic workflows, code review, verification),
GPT-class models, prompt-driven development and debugging.
**Security/QA:** Row-Level Security (Postgres/Supabase) review and remediation, static
pattern-based vulnerability detection, Vitest, regression testing, TypeScript type-checking.
**Stack:** React, Next.js, Supabase, Postgres/SQL, Vercel, Git/GitHub.
**Operations:** Excel (advanced formulas, pipelines), SQL (DuckDB), Amazon Seller Central,
Shopify.

### EDUCATION

BS Psychology — University of the Cordilleras (2006–2012)
CSC Professional Eligibility (83.71%, 2012) · Computer Systems Servicing NC II (TESDA, 2023)

*No formal certification in security or software engineering — the security finding above is
offered as the actual evidence, per this role's own stated preference for demonstrated work
over certification.*

---

## Part 2 — The RLS regression write-up

### A regression that shipped silently, and the tool built to stop it happening again

**The setup.** An AI session reviewed PEPPOOL's database schema for access-control gaps
(Row-Level Security policies in Supabase/Postgres — rules the database itself enforces about which rows a user is allowed to see or touch) and found three real gaps, which I directed and then reviewed — confirmed against the peepool-website repo's commit history: the findings doc carries a `Co-Authored-By: Claude Sonnet 5` trailer, so this was not a personal read-through.
Partway through, I made the call to widen the same kind of check to YRT, an older, already-live project of mine, to see if it held up. It didn't.

**Part 1 — a bug found by accident, not by looking for it.** In July, an AI session was building an unrelated feature — a new trigger for the checkout/orders flow, on a separate branch — and noticed something wrong nearby: a different, older trigger (`protect_account_columns()`, which is supposed to stop an ordinary customer from reassigning their own clinician or rewriting their own email) had a real bypass. Its permission check, `if not is_admin()`, relied on `is_admin()` returning `true` or `false` — but for an ordinary customer with no admin role claim at all, it returned SQL `NULL` instead. `if not <null>` never executes its body in PL/pgSQL, so the one role the check most needed to restrict was exactly the role it silently never restricted. 
Any logged-in customer could run an ordinary `UPDATE` and reassign their own clinician to anyone, or rewrite their own email.

The AI session confirmed this live in a sandbox — not theorized from reading the code — fixed the trigger, and separately found and fixed a masking bug in the project's own test suite. All of that is in one commit, authored and committed entirely by the AI session. **I want to be precise about my own role here: I don't have a confirmed record of what I personally did in that session** — whether the live-confirmation step happened because I asked for it or because it's standard practice regardless, I can't verify from the commit alone, and I'd rather say that plainly than imply I caught this myself.
`[VERIFY: whether the original July live-confirmation step was requested by the operator or ran as standard practice regardless]`

**Part 2 — it came back, and nobody was watching.** Eight days later, an unrelated change added two new protected columns to the same table, and to wire in their checks it used `CREATE OR REPLACE FUNCTION` on the exact function that had just been fixed — and in doing so, pasted the *original broken version* of the permission check back in. Nobody touched that function again after that. **It sat live, in production, for roughly six weeks, and nothing caught it — not me, not any process, nothing.** A documented fix, with a clear written root cause right in the migration file, still didn't survive contact with a completely unrelated later change.

**Part 3 — how it actually resurfaced.** In September, I made the call to widen my PEPPOOL access-control review (see above) to YRT too — a general "check the other project's SQL as well" decision, not a specific hypothesis that the exact PEPPOOL bug would also be in YRT. An AI session ran that review under my direction, and that's what found the regression — the exact same bug shape, silently back, six weeks after being fixed the first time. The same review also found a second, independent bug: a permission check on order status changes was correctly admin-only, but a related table (line items belonging to an order) only checked who owned the order, not what state it was in — letting a customer add a new item to their own order *after* it had already been marked paid, silently growing the total with no real payment behind it.

**What's actually mine in Part 3:** I made the call to widen the review's scope. I reviewed and approved both fixes. And I applied and confirmed both against the live production database myself — an AI session structurally cannot hold live production credentials, so anything that touches the real system runs through me, not through the session that found or drafted the fix.

**Part 4 — the tool built afterward, and the question that changed its scope.** The real lesson wasn't "fix the bug again" — it's that a documented rule with one worked example still isn't self-enforcing; nothing mechanical re-checked a `CREATE OR REPLACE FUNCTION` against previously-fixed vulnerable shapes before it shipped. **I decided** a small static-analysis tool was worth building to catch this bug shape automatically going forward, without needing live database credentials, and an AI session wrote it. When the first version only covered this one bug shape, **I asked the question that changed its scope** — "so this only checks one type of bug?" — which is what took it from one check to three. The tool wasn't trustworthy on its first real run either: against actual migration files, it threw 11 false positives, misreading ordinary policy clauses as something else entirely. The AI session found and fixed both root causes before trusting its output.

**What I'd actually say if asked to walk through this, start to finish:** I didn't find the
original bug, write the fix, trace the trigger logic, or write the detection regexes — an AI
session did all of that, across two separate incidents, months apart. What's mine, specifically:
the decision to widen scope from PEPPOOL to YRT; the decision to build a tool rather than trust documentation alone; the question that corrected the tool's actual scope; and everything that touched the real, live production database, which only ever runs through me. That's a narrower claim than "I found and fixed this," and it's the one I can actually defend if asked to go deeper on any part of it.

**Why this is still the artifact I'd lead with:**

- Two real bugs, live, in a production system real people use — not a lab exercise.
- Both confirmed against the actual database, not just read off a migration file.
- The response wasn't just "fix it twice" — it was building something that watches now, and then subjecting that something to the same scrutiny the original bugs got.

**Note — to fold in later, not yet done.** This became a standing practice, not a one-off: once the tool existed, it was run as a full sweep across YRT's entire codebase (92 files) and Tios Bandidos's (4 files), not just the two bugs already known — and it's now a standard check before trusting any new schema change on PEPPOOL going forward. The full YRT sweep found 2 more real issues (a masked-test-failure pattern) in files written the same session. **These 2 findings are still open, unfixed, as of the last commit touching them** — say so honestly if this comes up.

**Open, stated honestly:**

- The tool is SQL/Postgres-specific and pattern-based — not a general vulnerability scanner.
- A "run the real test suite automatically" tier was considered and deliberately not built yet — it would need live database credentials in an automated context, a decision not taken on without deciding it separately.

---

## Part 3 — The QA automation write-up

### Building a test suite that proves it catches bugs, not just that it passes

**The gap I noticed.** YRT had CI wired up — type checking, lint, a build step — but zero actual tests. A green CI run proves the code *compiles*, never that a given function *does the right thing*. I decided to fix that, deliberately — an AI session did the actual setup and writing under that direction.

**What got tested first, and why I picked it.** Not a random function —
`sanitizeArticleHtml.ts`, the code that cleans HTML pasted into the blog editor before it's shown to visitors. **I chose this one to go first**, for two reasons: it's a security boundary (get it wrong and someone can inject a script into a public page), and its own code comments already referenced a real bug found and fixed once before. The AI session added Vitest, wired a test script, and wrote 15 small tests, each checking one specific behavior.

**Proving the suite actually catches bugs.** A test suite that always passes might just be
re-describing whatever the code already does, right or wrong. **I asked for the suite to be checked for real**, not just written: the old, already-fixed bug was deliberately reintroduced, the suite was run, and exactly one test failed while the other 14 stayed green. Then reverted. A test you haven't watched fail is a test you don't actually trust yet.

**Testing against real, verified data instead of invented examples.** For a separate CSV-export feature, rather than inventing example data, **I created a real test order directly in the live admin panel myself** — Kenny never touched this part — deliberately containing commas and quote marks, the trickiest case for CSV escaping. That real export was decoded and used as the test's expected answer. While building that test, the escaping logic was found copy-pasted identically in three separate files; **I made the call** to pull it into one shared, tested module instead of trusting three untested copies to stay in sync forever.

**Hitting a real wall, and stopping instead of forcing it.** An end-to-end test that actually
clicked the "Export" button in a real browser was wanted. Two real blockers turned up: the login check lives in middleware with its own direct database connection the test stub couldn't reach, and a fully local backend needed Docker, which couldn't actually run in that environment — confirmed directly (`docker ps` failed cleanly), not assumed. **I made the call** not to weaken the real login check just to make a test technically possible, named the tradeoff, and kept the unit coverage already in hand instead. Knowing when *not* to write a test is as much a skill as writing one.

**The filter for what's actually worth testing:**

- **Security boundaries** — anything sanitizing input, checking permissions, or validating a URL/path.
- **Money or business logic** — anywhere a silent bug produces wrong data someone acts on without noticing.
- **Shared or duplicated logic** — the same function copy-pasted in two or three places is a signal it's load-bearing enough to extract and test once, properly.
- **Skip:** components that are mostly wiring or rendering props with no real branching logic.

**Three layers, not one — and why a passing test still isn't the finish line.**

1. **Behavioral tests** — unit and integration tests that run real code and check the actual outcome.
2. **Mechanical pattern checks** — a separate, cheaper tool (see the RLS write-up above) that scans raw SQL for specific bug *shapes* that have recurred before, without running anything.
3. **Live verification** — re-running the same checks against the actual production service, not a local stand-in. On this project, a clean local suite passed repeatedly while a real platform-specific permission default was invisible to any local recreation, and only surfaced once tested against the live database. A clean local result is evidence, not proof.

**What I'd actually say if asked to walk through this:** I didn't write the test code or the
Vitest config myself — an AI session did, under my direction. What's mine: I decided testing mattered when CI alone was creating a false sense of coverage; I chose which function was risky enough to go first and why; I insisted the suite be proven against a real reintroduced bug before I'd trust it; I made the call to stop rather than weaken a real security check just to force a test through; and I set the priority filter for what's worth testing at all. The CSV test data itself was mine, not the client's — I created the test order. The export testing itself was a joint pass — me and an AI session together — across the project's two separate export functions: a full-data export and a scoped, sales-only export used for a dashboard.

**Open, stated honestly:**

- No end-to-end test exists yet for the flow blocked by the Docker/middleware wall above — but
  the fix is already known, not just hoped for: a Docker-free local Postgres harness (real
  Postgres, no Docker, no live credentials) is already documented and proven working on this
  exact machine, on both YRT and PEPPOOL. It just hasn't been pointed at this specific
  end-to-end test yet. This is a "not done" gap, not a "don't know how" one.
- No accessibility or performance checks are in place yet.

---

## Notes for the operator, not part of any of the above

- **Honesty check on scope:** this is real, verified work on systems you own — not a third-party engagement with a formal scope document. If asked directly, say that plainly; being upfront about not having had a formal engagement yet, while clearly understanding *why* the requirement exists, reads better than overclaiming.
- **The 2 open findings from the full YRT sweep are not mentioned in the resume** — a resume claims capability, not a live incident log. If a technical interviewer asks to see the actual tool or findings, that detail belongs in that conversation or a write-up link, not a bullet.
- **PEPPOOL review attribution:** earlier drafts of this doc claimed the PEPPOOL findings were personally read and reported by you. That's confirmed false — checked directly against the peepool-website repo's commit history (a `Co-Authored-By: Claude Sonnet 5` trailer on the findings doc) — and corrected throughout this document.
- **No company name was given in the job posting** — nothing here is addressed to one. Check the posting for its actual application channel before submitting.
