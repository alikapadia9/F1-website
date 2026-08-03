# F One on One — Website (v4)

Plain HTML/CSS/JS, no build step, mobile-first. Open `index.html` in a
browser to preview, or drag the folder into Vercel/Netlify/GitHub Pages.

## What changed in v7 — bug fixes
Three real bugs, fixed at the root cause (these had actually been fixed
already in your live repo via Claude Code, then accidentally reverted when
v6's files replaced them — this restores and improves on those fixes):

1. **WhatsApp not opening the right chat:** removed `target="_blank"` from
   the WhatsApp links. On mobile, opening a new tab before handing off to
   the WhatsApp app is a common cause of it landing on the app's home
   screen instead of the intended chat — letting it navigate the current
   tab is more reliable.
2. **Enquiry form now actually does something:** since there's no backend
   yet, submitting the form builds a pre-filled WhatsApp message with
   whatever the visitor typed (name, contact, suburb, need) and hands off
   straight to Fatema's chat — instead of a dead placeholder alert.
3. **Postcode checker hardened:** input is now stripped of any non-digit
   characters before checking, so stray characters from mobile keyboards
   can't silently break it. (2287 was already inside the Newcastle range
   in the config, so this was almost certainly a knock-on failure — see
   point 4.)
4. **Mobile horizontal-overflow ("extra gap on the right") fixed:** grid
   and flex children (especially the enquiry form's `<select>`, which has
   long option text) were forcing their containers wider than the screen.
   Added `min-width:0` to grid/flex children and constrained all form
   inputs to `width:100%; max-width:100%`.
5. **Defensive rewrite of `script.js`:** every feature (WhatsApp links,
   scroll reveals, the dial, the track map, the postcode checker, the FAQ,
   the form) is now wrapped in its own try/catch. Previously, an error in
   one block could silently stop every block after it from running at all
   — which is the most likely explanation for several features breaking
   together. Now they're fully independent of each other.

## What changed in v6 (updated)
- **Real photo, finally in:** `assets/fatema-avatar.png` is now Fatema's
  actual photo (replacing the illustrated avatar), used once, in the
  "Meet Fatema" section.
- **Academy branding, honest framing:** the brand is "F-1 on 1 Driving
  Academy," and Fatema is shown as its owner and the instructor teaching
  every lesson right now — deliberately NOT "founder & principal
  instructor," since that implied other instructors already exist. If/when
  the academy actually grows to a team, that's the moment to add that
  language — not before.
- **The name is now actually showcased:** instead of sitting small in the
  nav corner, there's a proper brand mark (a badge-style "F" + "1 ON 1
  DRIVING ACADEMY" tag) prominently featured at the top of the hero, plus
  a matching small version in the nav and footer.
- Title/meta description, hero copy, and the "Meet Fatema" section all
  centre Fatema's real USPs — one-on-one attention, NSW licence, clean
  driving record, calm teaching style, and the five languages — without
  overclaiming anything about the size of the operation.

## What changed in v5
- **Brand story, finally used:** a dedicated statement right after the hero
  — "F is for Fatema. One-on-one is how she teaches." The name now explains
  itself instead of being a pun nobody decodes.
- **New palette:** warm cream background, charcoal-navy ink for headings,
  a single confident terracotta/burnt-amber accent. More contrast and
  presence than the pastel purple version, without going neon or back to
  racing red/black. The blue car stays blue — it still contrasts well
  against the new palette.
- **New typography:** Fraunces (a warm serif) for headings instead of the
  rounded display font, paired with Inter for body text. Several
  paragraphs now have bold, accent-coloured phrases pulled out instead of
  being a uniform grey wall of text.
- **Real pricing:** $75 per lesson is now shown plainly, with package
  discounts and experience-based tailoring mentioned in professional,
  polite language rather than spelling out "dynamic pricing."
- **Photo:** still using the placeholder avatar in `assets/fatema-avatar.png`
  — send over Fatema's real photo and I'll swap it into the one photo spot
  in "Meet Fatema" (same file name, same frame, no layout changes needed).

## What changed from v3 (carried over from v4)
- **Colour:** purple + white + warm yellow (replaces the sky-blue palette),
  chosen to contrast nicely against the blue car.
- **Real photo, one spot only:** Fatema's real photo
  (`assets/fatema-avatar.png`) appears exactly once, in the "Meet Fatema"
  section. No duplicate hero avatar.
- **Traffic-light car animation, fixed:** the car in the signature strip is
  now a simple flat SVG side-profile, drawn facing the direction it
  actually drives (left → right), instead of the front-on car photo (which
  looked wrong moving sideways). It still stops on red and goes on green,
  with a small blinking indicator light near the front. The uploaded car
  photo (`assets/hatchback-car.png`) is no longer used in this animation —
  it's still in `assets/` if you want it elsewhere (e.g. as a page/social
  preview image).
- **Enquiry form reverted:** back to the plain form + alert placeholder
  from earlier versions — no confetti/celebration overlay.
- **No leftover placeholders in the copy:** the lesson-count, pick-up/
  drop-off, and rescheduling FAQ answers are filled in with sensible
  defaults based on common driving-instructor practice — read them and
  adjust anything that isn't accurate for how Fatema actually wants to run
  things.
- **One placeholder was deliberately NOT invented:** Fatema's NSW
  instructor licence number. That's a real, specific, government-issued
  number — making one up isn't something I can safely do, since a wrong
  number on a live business site is a real problem, not a cosmetic one.
  Add it yourself wherever you'd like it shown (e.g. in the credential
  list in `index.html`, under "Meet Fatema").
- **Mobile-first rebuild:** base styles now target small screens first,
  with `min-width` media queries adding the multi-column desktop layout —
  this fixes the alignment issues from v3 and should look right on a phone
  browser first, tablet and desktop second.

## Before you launch
1. Add the real NSW instructor licence number (see note above).
2. Read through the FAQ answers I filled in (lesson count, pick-up/drop-off,
   rescheduling) and correct anything that doesn't match how Fatema
   actually wants to operate.
3. Wire the enquiry form up to a real backend — it currently shows the
   confetti celebration but doesn't send the data anywhere. Options:
   Formspree, Getform, a small serverless function, or your CRM/booking
   tool's form embed.
4. Double check the WhatsApp number in `config.js` and test the button
   from an actual phone browser once the site is live (not from a local
   file preview) — see the note on `wa.me` behaviour below.

## About the WhatsApp button
`wa.me` links open WhatsApp and, if the number isn't already saved in the
visitor's contacts, show WhatsApp's own "Continue to chat with +61 430 856
620?" screen first — that's normal WhatsApp behaviour on every `wa.me` link,
not something this site can skip. It should also work more reliably once
tested from the live `https://` GitHub Pages URL rather than a local file
preview, since some mobile browsers restrict how `file://` pages hand off
to other apps.

## Deploying
Static site — no `npm install`, no build step. Push the whole folder
(including `assets/`) to your GitHub repo and turn on GitHub Pages, or drag
it into Vercel/Netlify.
