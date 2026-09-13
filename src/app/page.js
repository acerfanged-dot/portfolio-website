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
          I find the real problem, direct AI to build the fix, and verify it works
          before it ships.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Read{" "}
          <Link
            href="/how-i-work"
            className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
          >
            how I actually work
          </Link>{" "}
          before assuming what &ldquo;directs AI&rdquo; means here — it&apos;s specific, not a hedge.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Or skip to the evidence:{" "}
          <a
            href="https://github.com/acerfanged-dot/verification-artifacts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-line underline-offset-2 hover:text-accent"
          >
            three tools, three domains
          </a>
          , each documenting the silent defect that checking it found.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <ProjectCard
            title="PEPPOOL"
            hook="A live group-buy commerce platform, replacing a Google Sheet with a real, server-verified storefront."
            tags={["React", "Supabase", "Vercel"]}
            href="/case-studies/peppool"
            liveHref="https://peppool-website.vercel.app/"
          />
          <ProjectCard
            title="YRT"
            hook="A personalized peptide platform with real clinical oversight — the first project that proved this whole approach could work at all."
            tags={["Next.js", "Supabase", "Vercel"]}
            href="/case-studies/yrt"
            liveHref="https://www.theyrt.com/"
          />
          <ProjectCard
            title="Tios Bandidos"
            hook="A restaurant ordering platform — proof the approach generalizes past the first business it was built for."
            tags={["Next.js", "Supabase"]}
            liveHref="https://www.tiosbandidos.com/"
            comingSoon
          />
          <ProjectCard
            title="The Windowsill Naturalist"
            hook="A gardening blog built entirely on my own — concept, content, and code — testing whether the same verification-first process holds up for writing, not just software."
            tags={["Next.js", "Static"]}
            href="/case-studies/gardening-blog"
            liveHref="https://gardening-blog-porfolio.vercel.app/"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
