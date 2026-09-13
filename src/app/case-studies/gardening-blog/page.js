import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Windowsill Naturalist — Acer Carl Fanged",
  description:
    "A gardening blog built entirely on my own — concept, content, and code — testing whether the same verification-first process holds up for writing, not just software.",
};

export default function GardeningBlogCaseStudy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">The Windowsill Naturalist</h1>
          <a
            href="https://gardening-blog-porfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            View live site ↗
          </a>
        </div>
        <p className="mt-2 text-sm text-muted">Next.js · Static · No backend · Aug – Sep 2026</p>

        <div className="mt-8 overflow-hidden rounded-lg border border-line">
          <Image
            src="/screenshots/gardening-home.png"
            alt="The Windowsill Naturalist homepage — 'Why does that actually work?'"
            width={1280}
            height={900}
            className="w-full"
          />
        </div>

        <section className="mt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Problem
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            No client, no external ask — this one exists to test something specific
            about my own process rather than solve someone else&apos;s stated problem.
            Everything else in this portfolio is a case of directing AI to build
            software correctly. The real question here: does the same
            verification-first discipline hold up for <em>written content</em>, not just
            code — or does it quietly stop applying the moment the output is prose
            instead of a database migration? Most gardening advice online also has its
            own version of this problem: it tells you what to do without explaining why
            it works, and rarely says where a claim actually comes from.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Build
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            A fully static Next.js site with no backend — nothing here needs a login or
            stored state, so there&apos;s nothing to protect and nothing to maintain
            beyond the content itself. Organized around mechanism, not chore lists:
            Plants, Spaces, and Problems, plus a dedicated &ldquo;How Gardening
            Works&rdquo; section, so a reader searching for a specific symptom lands on
            an explanation of the underlying cause, not another repeated care sheet.
            Every article carries a verification tier and a list of real cited sources
            in its own data model — the same evidence-based habit used throughout this
            whole portfolio&apos;s actual code changes, applied here to written claims
            instead of SQL.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Verified
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Deployed and checked directly, not just assumed working from a clean build:
            confirmed live, zero console errors on both the homepage and the one
            published article, real content rendering correctly rather than a
            placeholder. What hasn&apos;t happened yet, stated plainly rather than
            implied: the site&apos;s own citation/verification-tier system hasn&apos;t
            been stress-tested against a second or third article yet — one real article
            isn&apos;t enough evidence that the structure holds up at scale.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Result
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Live under my own Vercel account and my own GitHub account — the first
            project in this portfolio that isn&apos;t someone else&apos;s business, top
            to bottom. Honestly early: one real, published article, with most of the
            site&apos;s structure built ahead of the content that will eventually fill
            it. Not padded to look further along than it is.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
