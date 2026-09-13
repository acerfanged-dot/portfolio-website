# ACER CARL FANGED

acer.fanged@gmail.com | +63 927 422 2851 | Philippines | Remote
Live build: https://peppool-website.vercel.app/ (React, Supabase, Vercel — real orders in production)
Portfolio: https://portfolio-website-dusky-gamma-96.vercel.app/
GitHub: github.com/acerfanged-dot

*Draft — factually checked against project history, not yet voice-rewritten. Standard section
headers and consistent Title | Organization | Dates ordering throughout, deliberately, for ATS
parsing — this is not written in the narrative style of my other resume, on purpose.*

## SUMMARY

Self-taught, AI-directed developer with real, live production systems and one concrete,
verified security finding to show for it — not a CTF or coursework background, a live bug on a
system I already owned and shipped, which I directed the review that found, decided the fix
for, and personally applied and confirmed against the real database myself. Comfortable in both
modes this role asks for: directing an adversarial review (deciding scope, asking the question
that corrects it) and methodical QA (requiring a test prove itself before I'll trust it). Daily,
structured user of Claude and GPT-class models — specify, direct, verify, document — not a
casual user claiming AI fluency without evidence.

## SECURITY & QA PROJECTS

*Attribution below is deliberately specific about what I did myself versus what an AI session
did under my direction — the honest version needs to survive being asked about directly.*

**Directed Security Review, Regression Fix & Detection Tool — Personal Projects (PEPPOOL, YRT)**
| 2026
- Directed an AI-run review of a database's Row-Level-Security policies (Supabase/Postgres) on
  PEPPOOL, which found three real access-control gaps (a suspension flag not enforced on four
  write paths; an unenforced "submit once" rule; an undocumented ownership assumption).
- Made the call to extend the same kind of review to YRT, an older, already-live project; an AI
  session ran that review under my direction and found a previously-fixed permission bug had
  been silently reintroduced by an unrelated later migration — live in production.
- Decided the fix and applied it against the live production database myself, since an AI
  session cannot hold live production credentials — anything touching the real system runs
  through me. Had the session re-verify the corrected function was the one actually deployed.
- Same review surfaced a second, independent bug: a write-permission check on one table wasn't
  inherited by a related table. Reviewed and approved the fix; applied and confirmed it live
  myself, same as above.
- Decided a static-analysis tool was worth building to catch this bug *shape* automatically in
  future SQL changes; an AI session wrote it. Asked the scoping question ("does this only check
  one type of bug?") that took it from one check to three. The tool had real precision bugs
  (11 false positives) on its first run — found and fixed before I trusted its output.
- Directed a full sweep of the finished tool across both projects' codebases (96 files combined)
  and made it a standing check before trusting any new schema change going forward.

**Regression-Test Suite Direction — Personal Project (YRT)** | 2026
- Identified a codebase with CI (type-checking, lint, build) but zero behavioral tests — a
  green pipeline that proved the code compiled, never that it did the right thing. Directed an
  AI session to add a test framework and write tests, prioritized by risk (security boundaries
  and business logic first).
- Required the suite to prove itself before I'd trust it: had a known-fixed bug deliberately
  reintroduced, confirmed exactly the relevant test failed, then reverted.
- Made the call not to weaken a real login/security check just to force an end-to-end test
  through a technical blocker (an auth layer my test stub couldn't reach) — named the tradeoff
  and kept the unit coverage already in hand instead.

## AI-DIRECTED DEVELOPMENT

**Full-Stack E-Commerce Platform — Personal Project (PEPPOOL)** | 2026
- Directed the AI-assisted build of a live group-buy ordering platform: database schema,
  access-control rules, server-verified pricing logic, and automated tests.
- Personally verify every AI-assisted change against the live system before trusting it —
  the security finding above came directly out of that verification habit, not a separate
  security-specific effort.
- Deployed on Vercel with a Supabase backend; currently taking real customer orders.

**Verification-First Working Method** | ongoing
- Maintain a written, dated decision record for AI-directed work — what was built, what was
  verified and how, and what's still open — rather than trusting a task as "done" because an
  AI reported it so.
- Directed the build of a small personal toolset of mechanical checks (documentation integrity,
  version-consistency, the SQL security checks above) specifically because a documented rule
  and a single fix did not, on their own, prevent the same bug from recurring.

## PROFESSIONAL EXPERIENCE

**Freelance Data Operations** | Remote — Multiple Clients | 2015 – Present
- Recurring monthly sales-compensation pipeline (Amazon + Shopify, 5 source files) where
  cleaning accuracy directly determined whether compensation calculated correctly.
- Real-estate market reporting for two clients, ~30 geographic files monthly, fixed deadlines,
  manual accuracy-checking workflow built in the absence of automated tooling.
- Standardized a 300,000+ item product catalog for automated upload — zero-failure ingestion
  on delivery.

**Production Operations, Baker** | Valley Bread | 2025 – 2026
- Sole-responsibility production runs, 100% daily inventory accuracy, front-line technical
  resource for customer inquiries.

**Content and Operations Specialist** | Adventure Tourism Platform — Remote | 2023 – 2024
- Content entry/formatting across a proprietary CMS; early adoption of AI image-generation
  tools for production marketing assets at scale.

## SKILLS & TOOLS

**AI tooling:** Claude (daily, structured — agentic workflows, code review, verification),
GPT-class models, prompt-driven development and debugging.
**Security/QA:** Row-Level Security (Postgres/Supabase) review and remediation, static
pattern-based vulnerability detection, Vitest, regression testing, TypeScript type-checking.
**Stack:** React, Next.js, Supabase, Postgres/SQL, Vercel, Git/GitHub.
**Operations:** Excel (advanced formulas, pipelines), SQL (DuckDB), Amazon Seller Central,
Shopify.

## EDUCATION

BS Psychology — University of the Cordilleras (2006–2012)
CSC Professional Eligibility (83.71%, 2012) · Computer Systems Servicing NC II (TESDA, 2023)

*No formal certification in security or software engineering — the security finding above is
offered as the actual evidence, per this role's own stated preference for demonstrated work
over certification.*

---

## Notes for the operator, not part of the resume

- **Honesty check on scope, stated so you can decide how to frame it in an interview:** this
  is real, verified work on systems you own — not a third-party engagement with a formal scope
  document. If asked directly, say that plainly rather than implying more than it is; the
  posting is explicit that authorization/scope discipline matters, and being upfront about not
  having had a formal engagement yet, while clearly understanding *why* the requirement exists,
  reads better than overclaiming.
- **The 2 open findings from the full YRT sweep (masked-test-failure pattern, still unfixed)
  are not mentioned here** — a resume claims capability, not a live incident log. If a
  technical interviewer asks to see the actual tool or findings, that detail belongs in that
  conversation or the write-up link, not buried in a bullet point here.
- **Links above assume `portfolio-website` and its `docs/` write-ups are pushed to GitHub.**
  As of this draft, the two write-up files exist locally but are not yet committed/pushed —
  confirm that before relying on a GitHub link in an application.
- **No company name was given in the job posting you pasted**, so nothing here is tailored to
  a specific employer name or addressed to one — add that once you have it, and check the
  posting for its actual application channel before submitting, the same way the Hobbyland
  resume names its own portal explicitly.
