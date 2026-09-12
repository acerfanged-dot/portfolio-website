import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PEPPOOL — Acer Carl Fanged",
  description:
    "A live group-buy commerce platform for my sister Kenny's business — server-enforced pricing, RLS-backed permissions, and a full verification chain before anything ships.",
};

export default function PeppoolCaseStudy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">PEPPOOL</h1>
          <a
            href="https://peppool-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            View live site ↗
          </a>
        </div>
        <p className="mt-2 text-sm text-muted">React · Vite · Supabase · Vercel</p>

        {/* Hero screenshot: a fast, non-technical "this is real" signal before any
            text. Placeholder path -- drop a real screenshot at this location once
            captured (blueprint §3c). */}
        <div className="mt-8 flex aspect-video items-center justify-center rounded-lg border border-dashed border-line bg-black/[.02] text-sm text-muted">
          [ hero screenshot — homepage or Shop, at 1280px ]
        </div>

        <section className="mt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Problem
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            My sister Kenny runs a private group-buy community — members pool orders to
            get better pricing on premium products. The business ran on manual
            tracking with no real system behind it: no real order, payment, or invoice
            flow, pricing logic that didn&apos;t match how she actually priced things,
            and no written spec to build against — decisions got made by building
            something, checking it against what she actually meant, and revising.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Build
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            A React/Vite/Supabase app with a real database-enforced permission model
            (Row Level Security), real invoice generation, a two-tier retail pricing
            system (Vial Only / Set) with server-side price enforcement so a price can
            never be manipulated client-side, admin tooling for managing pools, orders,
            and payments, and a full order lifecycle from checkout through payment
            confirmation to fulfillment.
          </p>
          <div className="mt-6 flex aspect-video items-center justify-center rounded-lg border border-dashed border-line bg-black/[.02] text-sm text-muted">
            [ inline screenshot — Set pricing UI, next to the pricing-trigger claim ]
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Verified
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            An automated RLS/SQL test suite (150+ assertions) wired into CI; every
            database change replay-tested against a fresh schema before being trusted
            live; a structured six-question design review that caught a real defect (an
            SEO feature that would have told search engines to index a temporary
            preview domain as canonical) before it shipped; and a real live
            click-through by Kenny herself confirming a real order, a real payment QR
            scan, and the correct invoice state.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Result
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Kenny went from running the business off a Google Sheet to having a real
            site people can visit and order from directly — replacing the recurring
            pain of manually tracking who ordered what and where it stands in
            fulfillment. The pool now runs on defined open/close windows instead of
            needing to be managed hourly, and it reads as a professional storefront
            rather than a spreadsheet. Still a work in progress — Kenny continues to
            request real features as the business&apos;s actual needs surface — and the
            site is currently being live-tested with real orders flowing through it,
            not yet a long-proven system.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
