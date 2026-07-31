// ============================================================
// F ONE ON ONE — SITE CONFIG
// Edit the values below. Nothing else in the codebase needs to
// change when you update the phone number or pricing — pricing
// cards are rendered from `packages` by script.js, not hardcoded
// in index.html.
// ============================================================

const SITE_CONFIG = {
  // WhatsApp number in international format, no spaces, no leading zero.
  // Example for an Australian mobile 04XX XXX XXX -> "614XXXXXXXX"
  whatsappNumber: "61417997208", // [PLACEHOLDER] replace with the real number

  // Optional pre-filled WhatsApp message
  whatsappMessage: "Hi, I'd like to book a driving lesson with F One on One.",

  // Pricing tiers — drop real numbers in once decided. The layout does
  // not need to change when `price` moves from null to a number.
  packages: [
    {
      id: "casual",
      name: "Casual lesson",
      price: null, // e.g. 89
      unit: "per hour",
      blurb: "One-on-one, book as you go. No package, no lock-in.",
      features: [
        "Dual-control vehicle",
        "Structured feedback after every lesson",
        "Book one lesson at a time"
      ]
    },
    {
      id: "structured",
      name: "Structured package",
      price: null, // e.g. 780
      unit: "per package (10 hrs)",
      blurb: "A planned run of lessons for test prep or logbook hours.",
      features: [
        "Everything in Casual",
        "Progress tracked lesson to lesson",
        "Priority scheduling",
        "Logbook hours recorded correctly"
      ]
    },
    {
      id: "fast-track",
      name: "Fast-track intensive",
      price: null, // e.g. 1450
      unit: "per package (compressed schedule)",
      blurb: "High-frequency lessons for a tight deadline — test booked, move overseas, licence expiring.",
      features: [
        "Everything in Structured",
        "Multiple sessions per week",
        "Mock test under real conditions",
        "Built around your timeline"
      ]
    }
  ]
};
