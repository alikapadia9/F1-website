# F One on One — Website (v4)

Plain HTML/CSS/JS, no build step, mobile-first. Open `index.html` in a
browser to preview, or drag the folder into Vercel/Netlify/GitHub Pages.

## What changed in v13 — the real deployment fix
- **Added `CNAME` file** (repo root, no file extension) containing
  `foneononedrivingacademy.com.au`. This is the file GitHub Pages actually
  reads to know which custom domain to issue an SSL certificate for. No
  previous zip included this, since your domain wasn't known until now —
  if you've been fully replacing repo contents each time, this file (if
  it ever existed) may have been getting wiped out on every replace,
  which would explain both the shaky HTTPS and the stale WhatsApp link.
- **`robots.txt` and `sitemap.xml`** now point at the real domain instead
  of a placeholder.
- **Added a canonical URL tag** (`<link rel="canonical">`) pointing at
  `https://foneononedrivingacademy.com.au/` — since you have multiple
  domains, this tells Google which one is the "real" one to index, once
  you're ready to also point `.com` somewhere.

### Deployment checklist (do these in order)
1. Replace your repo contents with this zip's files **including the new
   `CNAME` file** — don't skip it, it has no file extension so it's easy
   to miss.
2. `git add . && git commit -m "Add CNAME, fix domain config" && git push`
   — confirm this actually succeeds (watch for that credential error from
   before; if it reappears, you'll need to re-authenticate again).
3. On GitHub: repo → **Settings → Pages**. Check the "Custom domain"
   field shows `foneononedrivingacademy.com.au`. If it's blank, type it
   in and save — this is what actually triggers GitHub to request the SSL
   certificate.
4. Wait — GitHub usually provisions the certificate within 15–60 minutes
   after it can see both the correct DNS and the CNAME file, but it can
   occasionally take up to 24 hours. The "Enforce HTTPS" checkbox will
   go from greyed-out to available once it's ready — check that box.
5. **Only use/share `https://foneononedrivingacademy.com.au`** for now.
   `.com` is a separate, unconfigured domain (still parked at VentraIP) —
   either leave it alone, or set up VentraIP's domain forwarding feature
   to redirect it to `.com.au` later. `.au` alone was never your domain at
   all — nothing to fix there.
6. Once `.com.au` loads with a padlock and no warnings, re-test the
   WhatsApp button on mobile, and re-do the "copy link address" test —
   it should now show the full `https://wa.me/61430856620?text=...` link,
   not a blank one.

## What changed in v12
- **Added `sitemap.xml` and `robots.txt`** — these tell Google (and other
  search engines) that the site exists and is safe to crawl. Both have a
  placeholder `REPLACE-WITH-YOUR-DOMAIN` — swap that for your actual
  domain (e.g. `foneononeacademy.com.au`) in both files before pushing.
- **Not a fix, an explanation:** Google not showing your site yet is
  normal for a brand-new domain — it isn't broken. The fastest way to
  speed it up:
  1. Go to [Google Search Console](https://search.google.com/search-console),
     add your domain as a property, verify ownership (usually a DNS TXT
     record your domain registrar can add for you).
  2. Once verified, submit `sitemap.xml` under "Sitemaps" in the left menu.
  3. Use "URL Inspection" and click "Request Indexing" for your homepage —
     this is the single fastest way to get Google to look at it.
  4. Once your Google Business Profile is live, that itself creates a
     strong signal pointing back at your domain.

## What changed in v11
- **Color, redesigned again:** moved from the orange/terracotta palette
  back to a blue-violet/indigo + warm gold combination, per your sister's
  request — but with real saturation this time (rich indigo `#5A4FE0`,
  deep indigo headings, a visibly lavender-tinted section background)
  instead of the earlier washed-out pale purple that got the "dull,
  blend" feedback. Every hardcoded color reference (SVG strokes, the road
  strip gradient) was updated too, not just the CSS variables.
- **WhatsApp hardened further:** added a hardcoded fallback number/message
  directly in `script.js`, so even if `config.js` fails to load on the
  live site for any reason (stale deploy, wrong branch, browser cache),
  the WhatsApp links can never silently degrade to a numberless link
  again — which is the most likely real explanation for "opens WhatsApp
  but no contact," if the live site wasn't actually serving the latest
  files. A console warning now also fires if `config.js` doesn't load, so
  this is easy to confirm via browser dev tools going forward.
- **Still pending:** please share the exact live URL (the full
  `https://...github.io/...` address, not just the domain) so it can be
  checked directly — I wasn't able to find/fetch it via search, and it's
  the fastest way to confirm the live site is actually serving these
  latest files rather than a stale deploy.

## What changed in v10
- **Package rates no longer published** — removed the Starter Pack /
  Pro Pack cards and specific dollar figures for 5- and 10-lesson bundles.
  Replaced with a plain "packages available at a discount, get in touch"
  note, matching the dynamic-quote approach used elsewhere.
- **New $140 / 2-hour session**, highlighted as "Great Value" — correctly
  described as 2 real hours = 6 logbook hours under the 3-for-1 rule.
  (Important: this is NOT the same as the 20-bonus-hour Safer Drivers
  Course, and doesn't grant 20 or 50 hours — that confusion is worth
  keeping cleared up for both the site and for conversations with
  students, since it's a compliance detail, not just marketing copy.)
- **New FAQ entry**: "Would I get a better price if I book a package
  deal?" — answered honestly (yes, discount available) without publishing
  specific numbers.
- **Student logbook tracker dropped** — not needed per your last message;
  the SEO/rank tracker spreadsheet from v9 is unaffected and unrelated to
  this.

## What changed in v9
- **Brand name fully consistent:** every "F-1 on 1" instance (hero badge,
  footer, title tag, meta description, bio text, alt text) now reads "F One
  on One" / "F One on One Driving Academy" — matching the nav fix, for real
  NAP consistency once the Google Business Profile goes up.
- **Real pricing, market-researched:** Single lesson $75/hr (unchanged),
  2-hour session $150, 5-lesson Starter Pack $350, 10-lesson Pro Pack $680
  (maxes the 3-for-1 logbook bonus — called out as "Most Popular"). Based
  on Newcastle-area market rates (~$40–120/hr range, $75–90/hr common
  mid-market) and proportionate discounting in line with what other local
  schools offer. Test Ready Pack pricing is deliberately left as "get in
  touch" since car-hire-for-test-day pricing depends on insurance — a real
  decision only Fatema can make, not something to invent.
- **Two new services added:** Overseas licence conversion and Refresher &
  confidence lessons now have their own cards in the "Ways to work with
  Fatema" grid (now 6 cards instead of 4).
- **Safer Drivers Course FAQ, corrected:** the course is accurately
  described as a separate 5-hour, externally-run program (not something
  F One on One delivers), requiring 50 real hours already logged, granting
  20 bonus hours. (Note: an earlier prompt claimed "10 instructor hours +
  the course = 50 hours from just 15 real hours" — that's incorrect, since
  the course requires 50 real hours logged *before* you're even eligible;
  the site now states it correctly.)

## Separate deliverables (not part of the website)
- **`F-One-on-One-SEO-Tracker.xlsx`** — Google ranking tracker + keyword
  list + Google Business Profile checklist, for your own use, not linked
  from the site.
- **`Student-Logbook-Tracker-TEMPLATE.xlsx`** — a duplicate-per-student
  spreadsheet for Fatema to log each lesson's real hours and see the
  3-for-1 conversion calculate automatically, entirely separate from the
  website.

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
