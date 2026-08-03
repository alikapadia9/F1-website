// ============================================================
// F ONE ON ONE — INTERACTIONS (v7)
// Vanilla JS, no build step. Respects prefers-reduced-motion.
// Each feature is wrapped in its own try/catch so a problem in
// one block (e.g. a missing element) can never silently break
// the others (this is what caused WhatsApp/postcode/etc. to
// stop working together in earlier versions).
// ============================================================
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(label, fn) {
    try { fn(); } catch (err) { console.error("[site]", label, err); }
  }

  // ---- WhatsApp links ---------------------------------------------------
  // NOTE: no target="_blank" on purpose — on mobile, letting wa.me links
  // navigate the current tab hands off to the native WhatsApp app far more
  // reliably than opening a new tab first (a common cause of "it opens
  // WhatsApp but not the right chat").
  function buildWhatsAppUrl(prefilledText) {
    var num = ((window.SITE_CONFIG && SITE_CONFIG.whatsappNumber) || "").replace(/\D/g, "");
    var msg = prefilledText || (window.SITE_CONFIG && SITE_CONFIG.whatsappMessage) || "";
    var url = "https://wa.me/" + num;
    if (msg) url += "?text=" + encodeURIComponent(msg);
    return url;
  }

  safe("whatsapp static links", function () {
    var waUrl = buildWhatsAppUrl();
    ["whatsappBtn", "whatsappFooter"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waUrl; el.rel = "noopener"; }
    });
  });

  // ---- Scroll reveals -----------------------------------------------------
  safe("scroll reveals", function () {
    var revealTargets = document.querySelectorAll("[data-reveal]");
    if (reduceMotion) {
      revealTargets.forEach(function (el) { el.classList.add("in-view"); });
    } else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add("in-view"); });
    }
  });

  // ---- Logbook dial arc: animate when scrolled into view -------------------
  safe("logbook dial", function () {
    var dialArc = document.getElementById("dialArc");
    var logbookSection = document.getElementById("logbook");
    if (dialArc && logbookSection && "IntersectionObserver" in window) {
      var dialObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            dialArc.style.transition = reduceMotion ? "none" : "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.3,1)";
            dialArc.style.strokeDashoffset = "40";
            dialObserver.unobserve(logbookSection);
          }
        });
      }, { threshold: 0.4 });
      dialObserver.observe(logbookSection);
    }
  });

  // ---- Track map path draw-on: animate when scrolled into view -------------
  safe("track map", function () {
    var trackPathAnim = document.getElementById("trackPathAnim");
    var areasSection = document.getElementById("areas");
    if (trackPathAnim && areasSection && "IntersectionObserver" in window) {
      var trackObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            trackPathAnim.style.transition = reduceMotion ? "none" : "stroke-dashoffset 1.8s cubic-bezier(.2,.7,.3,1)";
            trackPathAnim.style.strokeDashoffset = "0";
            trackObserver.unobserve(areasSection);
          }
        });
      }, { threshold: 0.3 });
      trackObserver.observe(areasSection);
    }
  });

  // ---- Postcode coverage checker -------------------------------------------
  safe("postcode checker", function () {
    var postcodeForm = document.getElementById("postcodeForm");
    var postcodeResult = document.getElementById("postcodeResult");
    if (!postcodeForm) return;
    postcodeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("postcodeInput");
      // Strip anything that isn't a digit first — guards against stray
      // spaces/characters some mobile keyboards can slip in, which was
      // silently breaking parseInt before.
      var digitsOnly = (input.value || "").replace(/\D/g, "");
      var val = digitsOnly ? parseInt(digitsOnly, 10) : NaN;
      var ranges = (window.SITE_CONFIG && SITE_CONFIG.coverageRanges) || [];
      var match = ranges.find(function (r) { return val >= r.min && val <= r.max; });
      if (!digitsOnly || isNaN(val)) {
        postcodeResult.textContent = "Enter a valid 4-digit postcode.";
      } else if (match) {
        postcodeResult.textContent = "Good news \u2014 " + match.label + " is already covered!";
      } else {
        postcodeResult.textContent = "Not listed yet, but coverage is growing \u2014 send an enquiry anyway.";
      }
    });
  });

  // ---- FAQ accordion --------------------------------------------------------
  safe("faq accordion", function () {
    document.querySelectorAll(".accordion__trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".accordion__item");
        var wasOpen = item.classList.contains("open");
        document.querySelectorAll(".accordion__item.open").forEach(function (openItem) {
          openItem.classList.remove("open");
        });
        if (!wasOpen) item.classList.add("open");
      });
    });
  });

  // ---- Enquiry form: forwards straight to WhatsApp -------------------------
  // There's no backend yet, so instead of a dead-end alert, submitting the
  // form builds a pre-filled WhatsApp message with everything the visitor
  // entered and hands off straight to Fatema's chat.
  safe("enquiry form", function () {
    var form = document.getElementById("enquiryForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var contact = (data.get("contact") || "").toString().trim();
      var suburb = (data.get("suburb") || "").toString().trim();
      var need = (data.get("need") || "").toString().trim();

      var lines = ["Hi Fatema! I'd like to enquire about driving lessons."];
      if (name) lines.push("Name: " + name);
      if (contact) lines.push("Contact: " + contact);
      if (suburb) lines.push("Suburb/postcode: " + suburb);
      if (need) lines.push("What I need: " + need);

      window.location.href = buildWhatsAppUrl(lines.join("\n"));
    });
  });
})();
