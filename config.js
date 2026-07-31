// ============================================================
// F ONE ON ONE — SITE CONFIG
// Edit the values below. Nothing else in the codebase needs to
// change when you update the phone number.
// ============================================================

const SITE_CONFIG = {
  // WhatsApp number in international format, no spaces, no leading zero, no +.
  whatsappNumber: "61430856620",

  // Optional pre-filled WhatsApp message
  whatsappMessage: "Hi Fatema! I'd like to enquire about driving lessons with F One on One.",

  // Rough postcode ranges used ONLY for the friendly "coverage check" widget.
  // This is a lightweight placeholder, not an authoritative service-area map —
  // replace with your real logic (or just remove the check) if you want
  // something more precise.
  coverageRanges: [
    { label: "Newcastle", min: 2280, max: 2323 },
    { label: "Central Coast", min: 2250, max: 2279 },
    { label: "Sydney", min: 2000, max: 2249 }
  ]
};
