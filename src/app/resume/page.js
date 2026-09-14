import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Résumé — Acer Carl Fanged",
  description:
    "Backend work on live systems — databases, access rules, payments — directed and verified rather than hand-written, with the limits stated.",
};

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed">{children}</div>
    </section>
  );
}

function Role({ title, org, dates, children }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p className="font-medium">
          {title} <span className="text-muted">· {org}</span>
        </p>
        <p className="font-mono text-xs text-muted">{dates}</p>
      </div>
      <div className="mt-2 space-y-2 text-base leading-relaxed">{children}</div>
    </div>
  );
}

export default function Resume() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">Acer Carl Fanged</h1>
        <p className="mt-2 text-sm text-muted">
          Baguio City, Philippines · Remote ·{" "}
          <a
            href="mailto:acer.fanged@gmail.com"
            className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
          >
            acer.fanged@gmail.com
          </a>
        </p>

        <Section title="Summary">
          <p>
            I build the half of a web application you never see — databases, access rules,
            payments — on live systems that real businesses run on. Three of them are
            deployed and taking orders.
          </p>
          <p>
            <strong>I don&apos;t write production code unassisted.</strong> An AI session
            does the building; the decisions, the scoping, and anything touching a live
            production database are mine, because an AI session structurally cannot hold
            production credentials. I state this up front on every version of this document.
            Independent coding is in progress and not yet claimed — see{" "}
            <Link
              href="/how-i-work"
              className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
            >
              How I Work with AI
            </Link>
            .
          </p>
          <p>
            Backend correctness is invisible, which is why the work is mostly checking. Every
            defect found across these systems failed silently — a permission check
            that never fired, a form that overwrote instead of saving, a total computed from
            the wrong table. None of them errored.
          </p>
        </Section>

        <Section title="Selected work">
          <Role title="Backend, live commerce platform" org="PEPPOOL" dates="2026">
            <p>
              Group-buy ordering platform, live and taking real customer orders. Server-side
              price verification for a two-tier product model, after identifying that a
              client-only toggle would let a price be manipulated before checkout. Every
              database change replay-tested against a fresh schema before being trusted live.{" "}
              <Link
                href="/case-studies/peppool"
                className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
              >
                Case study
              </Link>
              .
            </p>
          </Role>
          <Role title="Backend, wellness platform" org="YRT" dates="2026">
            <p>
              Three enforced roles — customer, clinician, admin — with genuinely different
              database-level access, not just different screens. Assessment engine with real
              disqualification rules. A deliberate manual review step in fulfilment, kept for
              three named reasons rather than left as a gap.{" "}
              <Link
                href="/case-studies/yrt"
                className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
              >
                Case study
              </Link>
              .
            </p>
          </Role>
          <Role title="Backend, restaurant ordering" org="Tios Bandidos" dates="2026">
            <p>
              Built in three days by reusing an earlier system — where the work was deletion,
              not copying: accounts, assessments, protocols and their triggers all removed,
              and the orders table&apos;s user reference dropped entirely rather than made
              optional. Guest checkout with no customer accounts at all.{" "}
              <Link
                href="/case-studies/tios-bandidos"
                className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
              >
                Case study
              </Link>
              .
            </p>
          </Role>
        </Section>

        <Section title="Security and QA">
          <p>
            <strong>Directed a database access-control review</strong> that found three real
            gaps in a live commerce platform, then made the call to widen the same review to
            an older project — which is where the more serious finding turned up: a
            permission bug fixed months earlier, silently reintroduced by an unrelated
            migration, live for roughly six weeks. Reviewed and approved both fixes, and
            applied and confirmed them against the live production database myself.
          </p>
          <p>
            <strong>Decided a mechanical check was worth building</strong> rather than
            trusting documentation, since a documented fix with a written root cause had
            already failed to prevent recurrence once. The question I asked — &ldquo;so this
            only checks one type of bug?&rdquo; — took it from one check to three. It threw
            11 false positives on its first real run; those were fixed before its output was
            trusted.{" "}
            <a
              href="https://github.com/acerfanged-dot/verification-artifacts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
            >
              Public repo
            </a>
            .
          </p>
          <p>
            <strong>Required a test suite to prove itself.</strong> A codebase had CI —
            type-checking, lint, build — and zero behavioural tests, which proves code
            compiles and never that it does the right thing. I had a known-fixed bug
            deliberately reintroduced and confirmed exactly the relevant test failed before
            trusting the suite. I also declined to weaken a real login check to force an
            end-to-end test through a blocker, and said so rather than quietly lowering the
            bar.
          </p>
        </Section>

        <Section title="Operations">
          <Role
            title="Freelance Data Operations"
            org="Remote, multiple clients"
            dates="2015 – present"
          >
            <p>
              Distinct engagements fitted around other work — not a continuous decade of
              specialisation, and I keep the real per-engagement durations rather than a
              rounded-up headline. A recurring monthly sales-compensation pipeline across
              five source files where cleaning accuracy determined whether compensation
              calculated correctly. Roughly two years of real-estate market reporting, ~30
              geographic files monthly on fixed deadlines, with manual accuracy-checking
              workflows built where no tooling existed. Operational lead on a 300,000+ item
              catalogue standardisation — zero-failure ingestion on delivery.
            </p>
          </Role>
          <Role title="Production Operations" org="Valley Bread" dates="2025 – 2026">
            <p>
              Sole-responsibility production runs, 100% daily inventory accuracy, front-line
              technical resource for customer product questions.
            </p>
          </Role>
          <Role
            title="Content and Operations Specialist"
            org="Adventure tourism platform, remote"
            dates="2023 – 2024"
          >
            <p>
              Content entry and formatting across a proprietary CMS; early adoption of AI
              image generation for production marketing assets at scale.
            </p>
          </Role>
        </Section>

        <Section title="Tools">
          <p>
            Split by what I can do alone versus what I direct, because a flat list of
            technologies would claim something the summary above disclaims.
          </p>
          <p>
            <strong>Independent, no AI assistance required:</strong> Git and GitHub workflows;
            reading and reasoning about system architecture and data flow; designing test cases
            and verification checklists; running automated checks on every change before merge
            and automatic deploys once they pass; setting the standard a change must clear
            before it is trusted live — migration replay-testing, behavioural coverage,
            structured pre-merge review — and holding it; Excel to an advanced level; data
            validation and reconciliation.
          </p>
          <p>
            <strong>AI-directed, personally verified:</strong> Postgres and Supabase, SQL, Row
            Level Security policy design, database triggers, schema migrations, access-control
            review, migration replay-testing, Next.js, React, JavaScript, TypeScript, Tailwind,
            Vercel, Vitest. This means directing the build
            and verifying the result against the checks above — not authoring it from a blank
            file.
          </p>
          <p>
            <strong>Currently learning:</strong> programming fundamentals, and SQL beyond basic
            queries — toward writing, querying and debugging this class of code independently
            rather than only directing and verifying it.
          </p>
        </Section>

        <Section title="Education">
          <p>
            BS Psychology — University of the Cordilleras, 2006–2012. CSC Professional
            Eligibility (83.71%, 2012). Computer Systems Servicing NC II — TESDA, 2023.
          </p>
          <p className="text-sm text-muted">
            No formal certification in security or software engineering. The work above is
            offered as the evidence instead, and every claim on this page is checkable
            against a live system, a public repository, or a case study that says what
            wasn&apos;t verified.
          </p>
        </Section>

      </main>
      <Footer />
    </>
  );
}
