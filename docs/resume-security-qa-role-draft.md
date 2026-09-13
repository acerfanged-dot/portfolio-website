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
verified security finding to show for it — not a CTF or coursework background, a live bug
found on a system I already owned and shipped, fixed and confirmed against the real database,
then generalized into a reusable check. Comfortable in both modes this role asks for:
adversarial review (finding what's actually wrong) and methodical QA (proving a test would
have caught it before trusting it). Daily, structured user of Claude and GPT-class models —
specify, build, verify, document — not a casual user claiming AI fluency without evidence.

## SECURITY & QA PROJECTS

**Row-Level-Security Regression Finding & Detection Tool — Personal Projects (PEPPOOL, YRT)**
| 2026
- While reviewing a new project's Supabase/Postgres access-control policies, expanded the
  review to an older, already-live project and found a previously-fixed permission bug had
  been silently reintroduced by an unrelated later migration — live in production, allowing an
  authenticated user to bypass a permission check that should have blocked them.
- Confirmed the bug directly against the live database (not just the migration files), wrote
  and applied a fix, then re-verified the corrected function was the one actually deployed.
- Found and fixed a second, independent bug in the same review: a write-permission check on
  one table wasn't inherited by a related table, allowing a state-based restriction to be
  bypassed through a side door.
- Built a static-analysis tool (Python + browser port) to catch this bug *shape* automatically
  in future SQL changes, without needing live database credentials. The tool itself had real
  precision bugs (11 false positives) on its first run against live code — found and fixed
  before trusting its output.
- Ran the finished tool as a full sweep across both projects' entire codebases (96 files
  combined) and adopted it as a standing check before trusting any new schema change going
  forward, not a one-time audit.

**Regression-Test Suite & Verification Methodology — Personal Project (YRT)** | 2026
- Identified a codebase with CI (type-checking, lint, build) but zero behavioral tests — a
  green pipeline that proved the code compiled, never that it did the right thing.
- Added a test framework, prioritized coverage by risk (security boundaries and business logic
  first, wiring/rendering code last), and wrote regression tests anchored to real, verified
  output from the live feature rather than invented example data.
- Proved the suite actually catches bugs, not just that it passes: deliberately reintroduced a
  known-fixed bug, confirmed exactly the relevant test failed, then reverted.
- Identified a real technical blocker to end-to-end testing (an auth layer with its own direct
  database dependency my test stub couldn't reach) and made the deliberate call not to weaken
  a real security check just to make a test technically possible.

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
- Built and use a small personal toolset of mechanical checks (documentation integrity,
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
