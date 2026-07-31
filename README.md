# F One on One — Website

A single-page, no-build-step website (plain HTML/CSS/JS). Open `index.html`
directly in a browser to preview, or deploy it as-is to any static host.

The name is a naming curiosity only — there is no racing/F1 visual theme.
The site is designed for adults who already know how to drive and need to
convert overseas experience into a local licence, or who need a fixed
number of instructor hours logged efficiently. Tone: competent, direct,
respectful of the reader's time.

## What's inside
```
index.html    → all page content and section structure
styles.css    → the whole design system (colours, type, layout, animation)
script.js     → text-generate hero reveal, scroll reveals, the Readiness
                Panel bar animation, the fast-track loop tracing beam,
                comparison table row reveal, FAQ accordion, pricing card
                rendering, WhatsApp links
config.js     → the ONLY file you should need to edit for numbers/pricing
```

## Before you launch — edit these
1. **`config.js`**
   - `whatsappNumber` — replace with the real number in international
     format (e.g. an Australian mobile `04XX XXX XXX` becomes
     `"61XXXXXXXXX"`, no leading zero, no spaces, no `+`).
   - `packages` — the three pricing tiers (casual lesson / structured
     package / fast-track intensive). Pricing cards on the page are
     rendered from this array by `script.js` — nothing in `index.html`
     needs to change once real numbers are filled in.
2. **`index.html`** — search for `[PLACEHOLDER]` and replace:
   - Instructor name, bio, photo, licence number
   - Manual/automatic offering
   - FAQ answers (first-lesson checklist, hour-crediting rules,
     overseas-licence conversion, cancellation policy, language support)
   - The instructor photo: swap the `.photo-frame__placeholder` div for
     an `<img>` tag pointing at a real photo.
3. **Enquiry form** (`#enquiryForm` in `index.html` / bottom of `script.js`)
   — currently just shows an alert on submit. Wire it up to:
   - A form backend like Formspree/Getform, or
   - A serverless function that emails you, or
   - Your booking/CRM tool of choice.

## Design notes
- **Signature element:** the Readiness Panel (`#readiness`) — a sticky
  panel of animated metrics ("Hazard Perception," "Road Rules," "Test
  Confidence," "Logbook Hours Logged") that stays pinned while related
  content scrolls past it, with each bar/number animating in
  (overshoot-and-settle easing) as its matching step scrolls into view.
  The numbers shown are an illustrative example, not a real, personalised
  claim — the copy says so explicitly.
- Palette: warm graphite base (`#14161A`/`#1B1E24`) with a single
  green-teal accent (`#34D6A6`) that reads as "cleared," not "danger."
  No racing red.
- Type: Inter only, for both display and body — no condensed/sporty
  display face.
- Hero entrance uses a word-by-word "text generate" reveal plus a slow
  drifting spotlight and a faint grid — no motion-line/racing-stripe sweep.
- The 3-step process (Assess → Correct → Certify) draws itself in as a
  tracing beam as each step scrolls into view.
- The comparison table (self-practice / family-supervised / licensed
  instructor) reveals row by row, with the instructor column subtly
  highlighted.
- Animations respect `prefers-reduced-motion` — anyone with that setting
  enabled sees the finished state immediately, no motion.
- Fonts load from Google Fonts (Inter) via the `<link>` tags in
  `index.html`. No API keys or build tools needed.

## Deploying
This is a static site — drag the whole folder into Vercel, Netlify, or any
static host, or push it to a GitHub repo and connect it to Vercel/Netlify
for automatic deploys. No `npm install` or build step required.

## Handing this to an AI coding agent for further work
If you want an agent (Claude Code, Cursor, etc.) to keep building on this —
add real content, wire up the form, convert it to Next.js/React, etc. —
just point it at this folder and the placeholders marked `[PLACEHOLDER]`
above are exactly what it should ask you for or fill in.
