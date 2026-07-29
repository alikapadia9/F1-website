// ============================================================
// F ONE ON ONE — SITE CONFIG
// Edit the values below. Nothing else in the codebase needs to
// change when you update the phone number or pricing.
// ============================================================

const SITE_CONFIG = {
  // WhatsApp number in international format, no spaces, no leading zero.
  // Example for an Australian mobile 04XX XXX XXX -> "614XXXXXXXX"
  whatsappNumber: "61417997208", // [PLACEHOLDER] replace with the real number

  // Optional pre-filled WhatsApp message
  whatsappMessage: "Hi! I'd like to book a driving lesson with F One on One.",

  // Pricing / packages — drop real data in here once decided.
  // The layout does not need to change when these are filled in.
  packages: [
    {
      id: "casual",
      name: "One-on-one lessons",
      price: null, // e.g. 85
      unit: "per hour",
      blurb: "Casual, no lock-in bookings."
    },
    {
      id: "learner-package",
      name: "Learner's licence package",
      price: null,
      unit: "per package",
      blurb: "Structured multi-lesson plan, 3-for-1 logbook eligible."
    },
    {
      id: "pre-test",
      name: "Pre-test prep",
      price: null,
      unit: "per session",
      blurb: "Mock test + honest feedback."
    },
    {
      id: "upgrade",
      name: "Learner's \u2192 full licence upgrade",
      price: null,
      unit: "per package",
      blurb: "Targeted higher-speed and independent driving skills."
    }
  ]
};
