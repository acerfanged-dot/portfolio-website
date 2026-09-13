import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tios Bandidos — Acer Carl Fanged",
  description:
    "A Fil-Tex-Mex cantina's ordering site, built in three days by reusing the working parts of an earlier project — and the harder question of whether it needed to exist.",
};

export default function TiosBandidosCaseStudy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← Back
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">Tios Bandidos</h1>
          <a
            href="https://www.tiosbandidos.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            View live site ↗
          </a>
        </div>
        <p className="mt-2 text-sm text-muted">Next.js · Supabase · Vercel · Aug 2026</p>

        <div className="mt-8 overflow-hidden rounded-lg border border-line">
          <Image
            src="/screenshots/tios-home.png"
            alt="Tíos Bandidos homepage — a Fil-Tex-Mex cantina in Baguio City"
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
            A Fil-Tex-Mex cantina in Baguio City wanted a website. A separate business
            and a separate legal entity from the other projects here — its own GitHub
            repo, its own Vercel project, its own Supabase project, deliberately sharing
            no tables, no access rules, and no service key with anything else.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            The real question this one answered wasn&apos;t the restaurant&apos;s. It was
            mine: <strong>does any of the previous work actually transfer?</strong> A
            wellness platform and a taco joint have nothing in common as businesses. If the
            approach only worked once, on one project, it wasn&apos;t an approach — it was a
            single lucky build.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Build
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Three days. 81 commits. That number is only interesting because of what it
            reused: the build started from a route-by-route audit of the earlier project,
            marking every page and every table as <em>adapt</em>, <em>rework</em>, or{" "}
            <em>drop</em> before writing anything.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>The harder half of reuse was deletion.</strong> Out went customer
            accounts, the assessment engine, protocols, weight logs, the waitlist, the
            knowledge base, the clinician role, and every database trigger that existed only
            to support them. The orders table lost its <code>user_id</code> entirely — not
            made optional, removed, because there was no accounts table left for it to point
            at. Guest contact details went directly on the order row instead. Copying the
            parts that fit is easy; the work is being willing to throw away most of a system
            that already works.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>What carried over was the discipline, not just the code.</strong> Order
            prices are still resolved server-side at insert time rather than trusted from the
            browser&apos;s cart. Test-data separation columns were in the schema from the
            first day, not retrofitted. And the access rules ended up{" "}
            <em>simpler</em> than the original: anonymous visitors get no database policy at
            all on orders or reservations — not read, not write. Every guest order goes
            through a rate-limited server action instead. Fewer moving parts to get wrong
            than the per-user rules the earlier project needed.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>Three decisions worth naming</strong>, because each one started as a
            simpler wrong answer. Online ordering runs <em>alongside</em> GrabFood, FoodPanda
            and a phone number rather than replacing them — the site meets customers where
            they already order. That call came from the business side, not from me.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            The other two were mine. <strong>Iced tea became a per-item modifier with its own
            quantity</strong> rather than a menu item of its own. Listing it as a product was
            the obvious version and it was wrong: the actual requirement is two people on one
            order wanting different drinks — and possibly one of them wanting two — which a
            standalone product cannot express, and a simple checkbox tied to the parent
            dish&apos;s quantity gets wrong in a subtler way.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            And <strong>events with no confirmed date got their own &ldquo;by inquiry&rdquo;
            section</strong> rather than a placeholder date. Filing them under
            &ldquo;Upcoming&rdquo; would have implied a date that doesn&apos;t exist, and
            inventing one would have been worse. The cost was real and I took it knowingly:
            a date column can&apos;t order a list where some rows have no date, so an
            explicit sort order had to become the ordering key everywhere.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Verified
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Seven near-misses were logged during this build rather than quietly fixed. Two
            are worth repeating because neither one failed loudly.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>The admin panel silently turned saves into overwrites.</strong> The
            client reported that three events they were sure they&apos;d saved had become
            one. The cause: on a successful create, the form adopted the new record&apos;s ID and
            switched itself from create-mode to edit-mode in place, marked only by a small
            italic line. Every subsequent save was an update to that same row. Nothing
            errored, and the interface looked like it was working. The same pattern was
            present in all four &ldquo;add new&rdquo; forms, not just the one that got
            reported. Fixed with a banner that can&apos;t be missed.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>Confirmation emails under-charged.</strong> The email total was summed in
            application code from the order items — and missed the add-ons table entirely
            once add-ons existed. The database was already computing the correct total by
            trigger. The fix was to stop re-deriving a number that something authoritative
            already knew, and read it back instead.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            The rest were process, not product: a pull request merged into a base branch that
            had already been merged elsewhere, so it never reached production at all — caught
            by checking ancestry rather than assuming; a CSS comment containing a literal{" "}
            <code>*/</code> inside its own text, closing itself early and corrupting the
            entire design-token block; and a duplicate middleware file added because a search
            for existing auth wiring had excluded the one file that contained it, renamed in a
            newer framework version.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            Result
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            Live on its real domain, taking guest orders, with the menu and events managed by
            staff through the admin panel. The approach transferred — that question got a
            real answer, and the answer was yes.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>What I&apos;d say if asked whether it should exist.</strong> They wanted
            a website; I needed to know whether the approach generalised. Both of those got
            satisfied, and I&apos;d rather say that plainly than dress it up as solving a
            burning operational problem. Nobody actively manages or updates the site now. A
            restaurant taking most of its orders by phone and Messenger might have been
            served just as well by a brochure page and a phone number — the ordering system
            is the part I&apos;d actually interrogate if I were building it again today.
            What a spreadsheet <em>couldn&apos;t</em> have done is let a customer place the
            order themselves without handing them everyone else&apos;s: guest checkout,
            server-locked prices, and payment-proof uploads are real constraints, not
            decoration. Whether this business needed that is a different question from
            whether it was built correctly, and only the second one has a clean answer.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            <strong>Not done, stated plainly:</strong> the cross-role access testing that the
            other projects here went through never ran against this one. The security model
            is simpler by design and reviewed on paper — but &ldquo;the policy looks
            right&rdquo; and &ldquo;an anonymous visitor genuinely cannot read this table&rdquo;
            are two different claims, and only the first is true here so far.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
