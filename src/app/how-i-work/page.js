import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How I Work — Acer Carl Fanged",
  description:
    "I don't write production code by hand yet. I direct AI-assisted development and personally verify the result before it ships — here's exactly what that means.",
};

export default function HowIWork() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">How I Work</h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed">
          <p>
            I don&apos;t write production code by hand — yet. What I do is direct
            AI-assisted development and personally verify the result before it ships.
            That&apos;s a real, deliberate way of working, not a placeholder for one, so
            here&apos;s exactly what it means.
          </p>

          <h2 className="pt-4 text-lg font-semibold">
            The loop, as it actually runs — not a generic description of one
          </h2>
          <p>
            I don&apos;t originate most technical diagnoses myself. What actually
            happens: a risk or a bug usually surfaces from investigation — the
            AI&apos;s, or a real-world check — and gets put into technical terms by
            whichever side found it. My part is asking questions until I actually
            understand <em>why</em> it&apos;s a problem, not accepting the framing on
            faith. Then I make the call: fix it, don&apos;t, do it differently,
            prioritize something else. That decision, and the reason for it, gets
            written down — not as a formality, but because six months from now I need
            to know why a choice was made, not just that it was.
          </p>
          <p>Two things stay mine specifically, and I want to be precise about which:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>The decision.</strong> Every real call — merge this, don&apos;t,
              build this feature, cut that one — is made by me, after I understand the
              tradeoff well enough to actually own it.
            </li>
            <li>
              <strong>Real-world verification.</strong> Automated checks (test suites, a
              database change replayed against a fresh schema before it&apos;s trusted
              live) run on the AI&apos;s side. But whether the thing actually works when
              a real person uses it — placing a real order, scanning a real QR code — I
              check myself, on the live system, because &ldquo;the tests passed&rdquo;
              and &ldquo;it works&rdquo; are two different claims.
            </li>
          </ul>
          <p>
            Sometimes it runs the other way: I notice something looks wrong myself — a
            stretched logo, a page that feels slow — and ask the AI to find out why,
            rather than the AI surfacing it first. Both directions are real; neither is
            the whole story on its own.
          </p>
          <p>
            The honest version of what this buys: prose-and-AI gets to a working,
            explained shape <em>faster</em>. It doesn&apos;t remove the need to actually
            understand what&apos;s wrong before deciding what to do about it — it just
            changes who&apos;s doing the initial diagnosis while I build toward being
            able to do that part myself too.
          </p>

          <h2 className="pt-4 text-lg font-semibold">Client work vs. my own projects</h2>
          <p>These aren&apos;t the same kind of contribution, and I&apos;d rather say so than blur it:</p>
          <p>
            <strong>YRT and PEPPOOL</strong> are my sister Kenny&apos;s two businesses.
            She supplied the design — real HTML reference mockups of what the site
            should look like. My job was turning that reference into a working system:
            the database, the business logic, the security rules, the actual backend
            that makes the front end true. My sister works in a &ldquo;figure it
            out&rdquo; way — there&apos;s rarely a written spec — so a lot of this was
            proposing an interpretation, building it, checking it against what she
            actually meant, and revising when I got it wrong. That loop, not a
            handed-down spec, is the real shape of this work.
          </p>
          <p>
            <strong>Tios Bandidos</strong> is a friend&apos;s restaurant — my sister did
            the frontend reference again, I built the backend again. Less a solved
            business problem than a proof of concept: could the same approach work a
            second time, on a different kind of business? It&apos;s live, but honestly,
            nobody actively manages or updates it — the result here is that the
            approach generalized, not a business outcome.
          </p>
          <p>
            <strong>The gardening blog, this site, and Atlas</strong> (the governance
            system I use to structure this whole way of working) are mine end to end —
            concept and execution both — built the same AI-directed, verification-first
            way.
          </p>

          <h2 className="pt-4 text-lg font-semibold">
            What I can&apos;t do yet, named as such
          </h2>
          <p>
            I can&apos;t currently sit down and write this class of code from a blank
            file, unassisted. That&apos;s real, and I&apos;d rather state it here than
            have it surface as a surprise later. It&apos;s also not where I&apos;m
            stopping — I&apos;m actively building that skill, and I keep a running,
            dated record of what moves from &ldquo;I can direct and verify this&rdquo;
            to &ldquo;I can do this independently.&rdquo; If that record ever justifies
            it, it&apos;ll show up here and on my resume directly — not before.
          </p>
          <p>
            If the way software gets built keeps moving toward this model, the
            verification discipline is the part that was worth building first. The
            independent coding is still coming.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
