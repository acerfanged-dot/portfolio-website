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
            liveHref="https://www.theyrt.com/"
            comingSoon
          />
          <ProjectCard
            title="Tios Bandidos"
            hook="A restaurant ordering platform — proof the approach generalizes past the first business it was built for."
            tags={["Next.js", "Supabase"]}
            liveHref="https://www.tiosbandidos.com/"
            comingSoon
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
