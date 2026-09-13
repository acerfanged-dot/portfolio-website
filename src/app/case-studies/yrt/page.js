import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "YRT — Acer Carl Fanged",
  description:
    "A personalized wellness platform for my sister Kenny's business — the first project that proved directing AI to build a real backend could work at all.",
};

export default function YrtCaseStudy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">YRT</h1>
          <a
            href="https://www.theyrt.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            View live site ↗
          </a>
        </div>
        <p className="mt-2 text-sm text-muted">Next.js · Supabase · Vercel</p>

        <div className="mt-8 overflow-hidden rounded-lg border border-line">
          <Image
            src="/screenshots/yrt-home.png"
            alt="YRT homepage — 'Wellness, designed around you.'"
            width={1280}
            height={800}
            className="w-full"
          />
        </div>

        <section className="mt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Problem
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            My sister Kenny&apos;s second business: a wellness platform that sells
            peptides, but deliberately not just a storefront — it also has to educate
            customers on what they are and how to use them, and enforce real clinical
            safety rules (someone who indicates they&apos;re pregnant during the
            assessment is disqualified from ordering, per her requirement, for their own
            safety). She supplied HTML reference designs; none of the actual system —
            the part that makes any of it real — existed yet. This was also the first
            project attempted this way at all, before it was known whether directing AI
            to build a genuinely working backend was even possible.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Build
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Everything behind the reference designs: the Supabase connection and Vercel
            deployment, login, an admin dashboard, and an assessment engine that scores
            answers into product recommendations and enforces disqualification rules
            like the one above. A protocol page showing recommended products, admin
            tooling to manage the catalogue, payment integration, and a fix to the cart
            so it could handle multiple items correctly.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            On the admin side: a sales dashboard, a fulfillment tracker, and a
            deliberate manual review step in fulfillment — not a gap, a real decision,
            for three separate reasons: no card-processor integration existed to fully
            automate payment confirmation, manual/phone orders still needed to be
            tracked in the same system so nothing got lost, and it acts as a fail-safe
            for any order that got stuck in the automated pipeline.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            The article system was built so how content is entered directly controls
            how it displays — matching a design reference Kenny supplied — with
            SEO-friendly markup generated automatically and a preview button before
            publishing. Site speed, SEO, and optimizing for how Google&apos;s AI
            Overviews summarize the site were addressed directly, and a real
            desktop-first design had to be reworked for mobile — a genuine learning
            moment, not something caught before it mattered.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>A real mistake, caught in time:</strong> early on, Kenny&apos;s HTML
            references got treated as the final, permanent design. When she later
            redesigned part of the product page — a new display format the existing
            product descriptions weren&apos;t written for — the fact that the backend
            had been built with real logic layered onto (not fused into) the reference
            markup meant the new design could be <em>ported</em> rather than requiring a
            rebuild. The two formats ran in parallel — old products stayed on the
            original display, each one migrated to the new format as its description was
            rewritten to fit — until every product had moved over and the old display
            code was removed. A gradual migration, not a risky all-at-once cutover.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Verified
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Three real user roles with genuinely different, enforced access — not just a
            UI difference: a clinician sees only their assigned customers&apos; check-ins
            and feedback, never orders or fulfillment; an admin sees orders and
            fulfillment, not clinical notes; a customer sees only their own data and
            whatever their clinician tells them directly. Separately, a database-coupling
            audit of the whole codebase distinguished genuinely tangled shared state from
            state that was deliberately, safely shared by design (column-level write
            restrictions enforced by the database itself, not just application code) —
            correctly telling apart real design decisions from accidental coupling.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Security
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            A permission bug fixed months earlier came back — silently reintroduced by an
            unrelated migration eight days after the original fix, then live for roughly six
            weeks before anyone noticed. No customer was ever exposed: the platform hadn&apos;t
            onboarded one yet. It only resurfaced because a security review I&apos;d scoped for a
            different project got widened to include this one too. Fixed and confirmed against
            the live database directly, then followed by a tool built specifically to catch this
            bug <em>shape</em> automatically going forward. The interesting part isn&apos;t the
            bug — it&apos;s that a documented fix with a written root cause was undone by an
            unrelated change, and nothing mechanical noticed.{" "}
            <a
              href="https://github.com/acerfanged-dot/portfolio-website/blob/master/docs/security-qa-writeups.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Full write-up ↗
            </a>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Result
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Live, deployed, and working — with no real customers yet. Honestly not sure
            why: Google Search Console already shows a clean score, which rules out one
            whole category of explanation (this isn&apos;t a search-visibility problem).
            Two real, untested hypotheses remain — PayPal being the only payment option
            may be creating friction, or there&apos;s simply been no ad spend driving
            traffic to it yet, or both. The honest next step is testing which one is
            actually true instead of guessing between them.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
