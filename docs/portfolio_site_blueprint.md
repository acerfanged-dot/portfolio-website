# Portfolio Site — Build Blueprint (fill in by hand, then hand to Claude Code)

Fill every section yourself before this goes to Claude Code. Where you don't know the
answer yet, write "TBD — decide before build" rather than leaving it blank — a blank
field and a deliberately-deferred field look identical to Claude Code, and only one of
them is safe to skip.

---

## 1. Outcome (what "done" looks like)

State in 1-2 sentences what exists when this is finished. Be specific enough that you
could check the box yes/no when it's done.

>

## 2. Site map (every page/route that will exist)

List every route. Don't describe what's on them yet — just the list, e.g.:
- `/` — landing
- `/case-studies/yrt`
- `/case-studies/tios-bandidos`
- `/case-studies/scoring-engine`
- (gardening site added later, once deployed — not in v1)

>

## 3. Per-page content spec

Don't try to answer "what goes on this page" as one open question. Answer the bounded
questions below, in order — each one fixes a variable the next one depends on. By the
end, "what done looks like" for the page should already be implied by your answers, not
something you have to separately author.

### 3a. Whole-site feel (answer once, applies everywhere — answer this FIRST)

These are pure taste calls, no dependency on anything else. Get these out of the way
before anything content-specific.

- Tone: does this read as understated/technical, or warm/personable? Pick one lane.
- Visual density: minimal (lots of white space, one idea per screen) or information-dense
  (more on screen at once, like a technical doc)?
- Who is the primary reader in your head when you picture someone landing on this —
  the RocketAMS-shaped reader, the N1-shaped reader, or genuinely both equally?
  (This doesn't mean excluding either — it means which one you're picturing when a
  tone/density call is ambiguous.)

>

### 3b. Landing page (answer after 3a — each depends on it)

- One-line positioning: given the tone you picked above, is this a claim ("I turn messy
  data into decisions") or a description ("Data operations specialist — Philippines")?
- Card contents: title + hook line — yes/no on tech badges — yes/no on a live-link icon
  directly on the card (vs. only inside the case study page)?
- Anything above/below the cards, or is the card grid the entire page?

>

### 3c. Case study page shape (answer once — applies to both yrt. and Tios, since the
shape should be identical; only the content differs)

- Given the Problem→Build→Verified→Result shape is already fixed (from your own
  session-2 spec) — does each section get its own heading, or does it read as continuous
  prose with the shape implicit?
- Screenshot placement: top of page before any text, or inline next to the "Build"
  section specifically?
- Live-link placement: a button at the top, or a text link inline where the project is
  first mentioned?

>

### 3d. Per-project content (answer separately for yrt. and Tios — this is where they
actually differ; everything above this point should already be decided)

For each project:
- Problem — one sentence, in your own words, no drafting yet: what was the actual
  problem, stated plainly?
- Result — one number or one concrete outcome, if one exists (if none exists yet, say
  so — don't invent one)
- Verified/Caught — leave as "pending curation pass" per the separate conversation;
  don't fill from memory here

>

### 3e. Scoring engine page — the part most likely to cause rework if left vague

Answer these in order; each constrains the next.

1. Is the demo meant to *prove capability* (look impressive, minimal interaction) or
   *teach the mechanism* (a reader should understand normalization/weighting after
   using it)? This single answer determines almost everything below.
2. Editable fields — pick exactly which, don't leave open: weights only? weights +
   tier thresholds? weights + thresholds + sample SKU data?
3. What recalculates live vs. what requires a "recalculate" click? (Live-everything is
   more impressive; click-to-recalculate is easier to build correctly and easier to
   reason about for a non-technical viewer.)
4. Sample data: how many SKUs (recommend keeping it small — 5-8, matching your real
   file), which fields are visible per SKU?
5. Tier boundary behavior: at exactly the threshold value (e.g. score = 60), which tier
   does it fall into — the one above or below? (Pull this from your actual hand-rebuilt
   sheet once you've rebuilt it — don't guess, check what your real formula does.)
6. Formula explanation section: written after your hand-rebuild, not before — leave as
   "pending" here
7. SOP/usage section: same — "pending," written after hand-rebuild

## 4. Hard limits

- Stack: [Next.js? confirm — matches yrt./Tios stack per your own Website Production
  Module tool picks]
- Must never do: [e.g. "no backend/database — this site is static"]
- Budget/scope: [explicit v1 boundary — e.g. "2 case studies + scoring engine page only,
  no gardening site, no blog"]
- Design tokens: [reuse yrt.'s Style Tokens table? pick new ones? — decide, don't leave
  implicit]

## 5. Stop point

Where does this build stop and get reviewed before going further? (e.g. "stop after
landing + 1 case study page, review before building the rest")

>

## 6. Known open items (deliberately deferred, not oversights)

- Formula explanation + SOP content — blocked on hand-rebuilding the scoring engine first
- Gardening site case study — blocked on deploying it
- [anything else you know is unresolved]

