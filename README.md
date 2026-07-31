# F One on One — Website (v4)

Plain HTML/CSS/JS, no build step, mobile-first. Open `index.html` in a
browser to preview, or drag the folder into Vercel/Netlify/GitHub Pages.

## What changed from v3
- **Colour:** purple + white + warm yellow (replaces the sky-blue palette),
  chosen to contrast nicely against the blue car.
- **Real images, not placeholders:** `assets/fatema-avatar.png` and
  `assets/hatchback-car.png` are your actual uploaded images, copied into
  the project so nothing looks unfinished. Swap them for higher-res
  versions any time — same filenames, same folder.
- **One photo spot, not two:** the hero now only has a small round avatar
  icon next to the speech bubble; the single full-size photo lives in the
  "Meet Fatema" section.
- **New signature animation:** a small "traffic light" strip near the top
  where the actual car image drives across, stops on red, and continues on
  green (with a subtle blinking indicator). This replaces the earlier
  scroll-linked road-strip idea — it's now a standalone looping animation,
  not tied to scroll, and it's the only purely-decorative animation on the
  page.
- **Celebration on submit:** submitting the enquiry form now shows a
  confetti burst + "Hurray! Your journey begins." message instead of a
  plain alert (still needs a real backend wired in — see below).
- **No leftover placeholders in the copy:** the lesson-count, pick-up/
  drop-off, and rescheduling FAQ answers are now filled in with sensible
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
