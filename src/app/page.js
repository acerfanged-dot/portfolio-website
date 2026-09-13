import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-14">
        <p className="max-w-2xl text-xl font-medium leading-snug sm:text-2xl">
          I build the half of a web application you never see — databases, access rules,
          payments — and verify it actually works before it ships.
        </p>
        <p className="mt-4 max-w-2xl text-base">
          Four live systems, three of them running real businesses, built over three months.
          Every one is linked below — open them.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          The tools I check my own work with are public too:{" "}
          <a
            href="https://github.com/acerfanged-dot/verification-artifacts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
          >
            three of them, three domains
          </a>
          , each documenting the silent defect that checking it found.
        </p>
        <p className="mt-5 max-w-2xl border-l-2 border-line pl-4 text-sm text-muted">
          One thing to be clear about up front: I don&apos;t write production code by hand —
          yet. An AI does the building; the deciding, and checking it against the real system,
          are mine.{" "}
          <Link
            href="/how-i-work"
            className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
          >
            How I actually work
          </Link>{" "}
          is specific, and worth reading before you assume what that means.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <ProjectCard
            title="PEPPOOL"
            hook="A live group-buy commerce platform, replacing a Google Sheet with a real, server-verified storefront."
            tags={["React", "Supabase", "Vercel"]}
            href="/case-studies/peppool"
            dates="Sep 2026"
            liveHref="https://peppool-website.vercel.app/"
          />
          <ProjectCard
            title="YRT"
            hook="A personalized peptide platform with real clinical oversight — the first project that proved this whole approach could work at all."
            tags={["Next.js", "Supabase", "Vercel"]}
            href="/case-studies/yrt"
            dates="Jul – Sep 2026"
            liveHref="https://www.theyrt.com/"
          />
          <ProjectCard
            title="Tios Bandidos"
            hook="A Fil-Tex-Mex cantina's ordering site, built in three days by reusing the working parts of YRT — the test of whether the approach carried to a second business."
            tags={["Next.js", "Supabase"]}
            href="/case-studies/tios-bandidos"
            dates="Aug 2026"
            liveHref="https://www.tiosbandidos.com/"
          />
          <ProjectCard
            title="The Windowsill Naturalist"
            hook="A gardening blog built entirely on my own — concept, content, and code — testing whether the same verification-first process holds up for writing, not just software."
            tags={["Next.js", "Static"]}
            href="/case-studies/gardening-blog"
            dates="Aug – Sep 2026"
            liveHref="https://gardening-blog-porfolio.vercel.app/"
          />
        </div>

        <section className="mt-14 rounded-lg border border-line p-6">
          <h2 className="text-lg font-semibold">Need this half of the app built?</h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed">
            Every project above is live, so the easiest way to judge the work is to open one.
            If it looks like what you need, email me and I&apos;ll tell you plainly whether
            it&apos;s something I can do — including when it isn&apos;t.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="mailto:acer.fanged@gmail.com"
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              acer.fanged@gmail.com
            </a>
            <Link
              href="/resume"
              className="text-sm text-muted underline decoration-line underline-offset-2 hover:text-foreground"
            >
              Or read the résumé
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
