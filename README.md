# F One on One — Website (v3)

Plain HTML/CSS/JS, no build step. Open `index.html` in a browser to preview,
or drag the folder into Vercel/Netlify to deploy.

## What changed from earlier drafts
- **Colour:** bright sky blue + white + warm amber (not dark, not racing red,
  not the dark-green version). This matches Fatema's actual 2024 blue
  hatchback.
- **Audience:** copy now speaks to adults who already know how to drive
  (overseas licence conversions) *and* anyone who needs logged hours with a
  licensed instructor — not nervous beginner teens.
- **Signature animation:** a "road journey" — a small blue car travels down
  a dashed road strip on the left edge of the screen as you scroll (desktop
  only, hidden on mobile to stay uncluttered). It's original to this brief
  rather than borrowed from any reference site, and ties directly to
  Fatema's real car.
- **Automatic only** — every mention of manual transmission has been removed.
- **No pricing** — replaced with a plain-English explanation of effort-based
  quoting instead of a fixed hourly rate.
- **Real WhatsApp number** wired into `config.js` (+61 430 856 620).
- **Kept and strengthened**, per your notes: "you learn at your own pace,"
  the dual-control/extra-brake explanation, "lessons that fit where you're
  starting from," the learner's package, a rewritten pre-test section (no
  claim about knowing the exact test route — reframed as a confidence
  tune-up), the learner's-to-full-licence guide, the full 1:3 logbook
  explainer with the speedometer-style dial, and the areas-serviced map for
  Newcastle / Central Coast / Sydney — now with a "share your postcode"
  coverage checker.
- **FAQ:** removed the confusing Safer Drivers Course question; replaced
  with questions that actually matter for this audience (overseas drivers,
  pick-up, languages spoken, lesson count).
- **Three "Let's Get Started"-style CTAs** (worded differently each time,
  same destination: the enquiry form).

## Before you launch — edit these
1. **`config.js`** — the coverage-checker postcode ranges are a rough
   placeholder; tighten them up or remove the checker if you'd rather not
   promise anything automatically.
2. **`index.html`** — search for `[PLACEHOLDER]`:
   - Fatema's avatar/photo (two spots: hero + "Meet your instructor")
   - A photo of the actual blue 2024 hatchback (hero)
   - NSW instructor licence number
   - A few FAQ answers (lesson count estimate, pick-up/drop-off policy,
     rescheduling policy)
3. **Enquiry form** — currently shows an alert on submit. Wire it up to a
   form backend (Formspree, a serverless function) or your booking/CRM tool.

## Adding Fatema's avatar and the car photo
When you have the avatar image, drop it in an `assets/` folder and replace
the `.avatar-frame__placeholder` and `.car-frame__placeholder` `<span>`
elements in `index.html` with `<img>` tags pointing at the file. No other
changes needed — the frames are already sized and styled to take an image.

## Deploying
Static site — no `npm install`, no build step. Drag the folder into
Vercel/Netlify, or push to a GitHub repo and connect it for auto-deploys.
