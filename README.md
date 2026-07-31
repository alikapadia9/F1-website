# F One on One — Website (v4)

Plain HTML/CSS/JS, no build step, mobile-first. Open `index.html` in a
browser to preview, or drag the folder into Vercel/Netlify/GitHub Pages.

## What changed from v3
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
3. The enquiry form now forwards straight to WhatsApp — submitting it opens
   a wa.me chat (to the number in `config.js`) with the visitor's name,
   contact, suburb/postcode, and need pre-filled as the message text. If you
   also want enquiries to land in an inbox/CRM, wire it up additionally to
   Formspree, Getform, a small serverless function, or your booking tool's
   form embed.
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
