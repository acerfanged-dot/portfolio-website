import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How I Work with AI — Acer Carl Fanged",
  description:
    "I'm usually not the primary mover. In most of this work AI does the building; my job is asking are you sure, how are you sure, and how can I check that myself — before I decide and take responsibility for what ships.",
};

export default function HowIWork() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">How I Work with AI</h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed">
          <p>
            I don&apos;t write production code by hand — yet. And I want to be precise about
            what that means, rather than let &ldquo;AI-assisted&rdquo; do the work of
            explaining it. In most of what&apos;s on this site, an AI is the one actually
            building, tracing the bug, or drafting the fix. My default role is closer to
            <strong> assistant than co-author</strong>: I ask questions until I actually
            understand what&apos;s being proposed and why, then I make the call and I&apos;m
            accountable for it.
          </p>

          <h2 className="pt-4 text-lg font-semibold">
            The default posture: three questions, not a build credit
          </h2>
          <p>
            In domains where I have less technical background, AI is the primary mover and I
            know it. Most of what I actually contribute in the moment is three questions,
            asked in order: <strong>are you sure, how are you sure, and how can I check what
            you&apos;re telling me myself</strong> — not accepting a claim because it&apos;s
            stated confidently, and not stopping until I have a way to verify it that
            doesn&apos;t just mean trusting the same source again.
          </p>
          <p>
            The honest part: I do roughly the same thing in domains where I know more,
            not a different one. More background changes how sharp the questions can get and
            how fast I can tell when an answer is dodging one — it doesn&apos;t change the
            posture. I don&apos;t think of expertise as a point where I switch from asking to
            building. It&apos;s a point where the asking gets better.
          </p>

          <h2 className="pt-4 text-lg font-semibold">
            Why attribution specifically — not just fairness
          </h2>
          <p>
            I care about naming who actually did what, and it&apos;s not a credit-sharing
            exercise. It&apos;s diagnostic. When something goes wrong, the question I need
            answered isn&apos;t just <em>&ldquo;is the output correct&rdquo;</em> — it&apos;s
            <em> &ldquo;which layer failed.&rdquo;</em> Did an AI make a real judgment call on
            my own vague or underspecified prompt, acting reasonably on bad input? Or did I
            give clear direction and the wrong thing still shipped? Those are different
            failures with different fixes, and you can&apos;t tell them apart by staring at
            the final result — you have to check at the level of who actually made the call,
            not just whether what came out looks right. That&apos;s the real reason this page
            distinguishes an AI session&apos;s work from mine specifically, project by
            project, rather than describing the whole thing as one undifferentiated
            &ldquo;we.&rdquo;
          </p>
          <p>Two things stay mine specifically, and I want to be precise about which:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>The decision.</strong> Every real call — merge this, don&apos;t,
              build this feature, cut that one — is made by me, after I understand the
              tradeoff well enough to actually own it.
            </li>
            <li>
              <strong>Real-world verification, especially anything touching a live system.</strong>{" "}
              Automated checks (test suites, a database change replayed against a fresh
              schema before it&apos;s trusted live) run on the AI&apos;s side. But an AI
              session structurally can&apos;t hold live production credentials — so whether a
              fix actually works when applied to the real, live system, and applying it in the
              first place, is mine, not delegated. &ldquo;The tests passed&rdquo; and
              &ldquo;it works on the real thing&rdquo; are two different claims, and I only
              trust the second once I&apos;ve checked it myself.
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
            should look like. My job was directing the AI work that turned that reference into
            a working system: the database, the business logic, the security rules, the actual
            backend that makes the front end true. My sister works in a &ldquo;figure it
            out&rdquo; way — there&apos;s rarely a written spec — so a lot of this was
            proposing an interpretation, having it built, checking it against what she
            actually meant, and revising when I got it wrong. That loop, not a
            handed-down spec, is the real shape of this work.
          </p>
          <p>
            <strong>Tios Bandidos</strong> is a friend&apos;s restaurant — my sister did
            the frontend reference again, the backend was built again the same way. Less a
            solved business problem than a proof of concept: could the same approach work a
            second time, on a different kind of business? It&apos;s live, but honestly,
            nobody actively manages or updates it — the result here is that the
            approach generalized, not a business outcome.
          </p>
          <p>
            <strong>The gardening blog, this site, and Atlas</strong> (a personal system I
            direct, described below) are mine end to end — concept and direction both — built
            the same AI-directed, verification-first way.
          </p>
          <p>
            <strong>What Atlas is for, specifically:</strong> when the same kind of mistake
            survives being fixed once, that&apos;s the signal I treat differently — not
            &ldquo;write it down better,&rdquo; but &ldquo;build something that checks for it
            automatically, because documentation and memory already proved insufficient.&rdquo;
            A real example: a permission bug in one of my projects was found, fixed, and
            documented with its root cause spelled out directly in the code — and it still came
            back, silently, from an unrelated change eight days later, because nothing mechanical
            was rechecking it. That&apos;s what I direct AI sessions to build for: not efficiency
            for its own sake, but a check that doesn&apos;t depend on anyone — me or an AI —
            remembering correctly next time.
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
