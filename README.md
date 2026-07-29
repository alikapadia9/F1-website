# F One on One — Website

A single-page, no-build-step website (plain HTML/CSS/JS). Open `index.html`
directly in a browser to preview, or deploy it as-is to any static host.

## What's inside
```
index.html    → all page content and section structure
styles.css    → the whole design system (colours, type, layout, animation)
script.js     → scroll reveals, the "confidence meter" gauge, FAQ accordion,
                logbook dial animation, track-map animation, WhatsApp links
config.js     → the ONLY file you should need to edit for numbers/pricing
```

## Before you launch — edit these
1. **`config.js`**
   - `whatsappNumber` — replace with your sister's real number in
     international format (e.g. an Australian mobile `04XX XXX XXX`
     becomes `"61XXXXXXXXX"`, no leading zero, no spaces, no `+`).
   - `packages` — pricing, once decided.
2. **`index.html`** — search for `[PLACEHOLDER]` and replace:
   - Instructor name, bio, photo, NSW instructor licence number
   - Manual/automatic offering
   - FAQ answers (first-lesson checklist, Safer Drivers Course policy,
     cancellation policy)
   - The instructor photo: swap the `.photo-frame__placeholder` div for
     an `<img>` tag pointing at a real photo.
3. **Enquiry form** (`#enquiryForm` in `index.html` / bottom of `script.js`)
   — currently just shows an alert on submit. Wire it up to:
   - A form backend like Formspree/Getform, or
   - A serverless function that emails you, or
   - Your booking/CRM tool of choice.

## Design notes
- **Signature element:** the red/amber "confidence" gauge that fills as the
  visitor scrolls — a top strip on mobile, a slim vertical gauge on the left
  edge on desktop. It ties the racing/speedometer motif to the emotional
  goal of the site (building visitor confidence) rather than being pure
  decoration.
- Animations respect `prefers-reduced-motion` — anyone with that setting
  enabled sees the finished state immediately, no motion.
- Fonts load from Google Fonts (Oswald, Inter, JetBrains Mono) via the
  `<link>` tags in `index.html`. No API keys or build tools needed.

## Deploying
This is a static site — drag the whole folder into Vercel, Netlify, or any
static host, or push it to a GitHub repo and connect it to Vercel/Netlify
for automatic deploys. No `npm install` or build step required.

## Handing this to an AI coding agent for further work
If you want an agent (Claude Code, Cursor, etc.) to keep building on this —
add real content, wire up the form, convert it to Next.js/React, etc. —
just point it at this folder and the placeholders marked `[PLACEHOLDER]`
above are exactly what it should ask you for or fill in.
# F1-website
