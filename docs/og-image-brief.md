# OG image — design brief

The social card that renders when this site's link is pasted into Slack, email, WhatsApp,
LinkedIn or X. Before it existed the link previewed as a blank grey box.

**Currently generated in code**, not designed: `src/app/opengraph-image.js` builds it with
Next's `ImageResponse` at build time. That means it is version-controlled, costs nothing, and
changes automatically when the headline changes. If you replace it with a designed image,
delete that file and drop a PNG at `src/app/opengraph-image.png` instead — Next picks it up by
filename.

**Read this first if you're planning to use an AI image generator.** They cannot render text
reliably. Words come out misspelled, warped, or invented, and this card is almost entirely
text. Use one only for a background or abstract element, and set the type in a real tool over
the top. For the whole card, a design tool (Figma, Canva) or a person will beat any prompt.

---

## Hard requirements

- **1200 × 630 px**, PNG. Non-negotiable — it's the format every platform crops to.
- **Legible at ~360 px wide.** Slack and most previews render it small. If the headline can't
  be read at a third of full size, the card has failed.
- **Light background.** The site is light-only; a dark card would read as a different site.
- Safe margins of roughly 60–80 px. Some platforms crop the edges.

## Palette, from the site's own tokens

| | |
|---|---|
| Background | `#ffffff` |
| Primary text | `#17181a` |
| Secondary text | `#5b6169` |
| Accent | `#2b5cff` — used sparingly, one small element only |
| Hairlines | `#e4e6ea` |

## The copy

Small uppercase label, wide letter-spacing:

> ACER CARL FANGED

Headline, the largest thing on the card:

> I build the half of a web application you never see — databases, access rules, payments.

Supporting line, with a short accent rule to its left:

> Four live systems. Three real businesses.

Sub-line, muted:

> And verified it actually works before it shipped.

## Tone

Restrained and typographic. No stock photography, no laptop-on-a-desk, no glowing circuitry,
no abstract "AI" imagery, no gradients, no drop shadows. The card should look like a
well-set page rather than a graphic — the site's whole argument is that the substance is real,
and a decorated card undercuts it.

Think technical documentation or a good editorial masthead. Generous whitespace. One accent
element at most.

---

## Prompt, if you're using a design tool or handing this to someone

> A 1200×630 social preview card, minimal and typographic, on a pure white background. Top
> left: a small uppercase label in wide-tracked grey, reading ACER CARL FANGED. Below it, a
> large dark headline set in a clean geometric sans at roughly 60px, three or four lines,
> reading "I build the half of a web application you never see — databases, access rules,
> payments." Toward the lower left, a short horizontal blue rule about 45px wide followed by
> the line "Four live systems. Three real businesses." in dark text, and beneath it "And
> verified it actually works before it shipped." in muted grey. Generous margins, strong left
> alignment, no imagery, no gradients, no decoration. It should read as editorial typography,
> not as a graphic.

## After replacing it

`metadataBase` in `src/app/layout.js` must match the live deployment URL or the card will
point at localhost and every preview will break. It currently points at the Vercel
deployment — **update it if the domain changes.** Test with any OG preview validator before
trusting it.
