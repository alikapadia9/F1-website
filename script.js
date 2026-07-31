// ============================================================
// F ONE ON ONE — INTERACTIONS (v4)
// Vanilla JS, no build step. Respects prefers-reduced-motion.
// ============================================================
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- WhatsApp links ------------------------------------------------------
  function buildWhatsAppLink() {
    var num = (window.SITE_CONFIG && SITE_CONFIG.whatsappNumber) || "";
    var msg = (window.SITE_CONFIG && SITE_CONFIG.whatsappMessage) || "";
    var url = "https://wa.me/" + num.replace(/\D/g, "");
    if (msg) url += "?text=" + encodeURIComponent(msg);
    return url;
  }
  var waUrl = buildWhatsAppLink();
  ["whatsappBtn", "whatsappFooter"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) { el.href = waUrl; el.target = "_blank"; el.rel = "noopener"; }
  });

  // ---- Scroll reveals --------------------------------------------------------
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

  // ---- Hero typewriter greeting ----------------------------------------------
  var typewriterEl = document.getElementById("typewriter");
  var greeting = "Hi, I'm Fatema \u2014 let's get you road-ready.";
  if (typewriterEl) {
    if (reduceMotion) {
      typewriterEl.textContent = greeting;
    } else {
      var i = 0;
      (function typeChar() {
        if (i <= greeting.length) {
          typewriterEl.textContent = greeting.slice(0, i);
          i++;
          setTimeout(typeChar, 32);
        }
      })();
    }
  }

  // ---- Logbook dial arc: animate when scrolled into view ---------------------
  var dialArc = document.getElementById("dialArc");
  var logbookSection = document.getElementById("logbook");
  if (dialArc && logbookSection && "IntersectionObserver" in window) {
    var dialObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          dialArc.style.transition = reduceMotion ? "none" : "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.3,1)";
          dialArc.style.strokeDashoffset = "40"; // visually represents the 1:3 ratio filling
          dialObserver.unobserve(logbookSection);
        }
      });
    }, { threshold: 0.4 });
    dialObserver.observe(logbookSection);
  }

  // ---- Track map path draw-on: animate when scrolled into view ---------------
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

  // ---- Postcode coverage checker (lightweight placeholder logic) ------------
  var postcodeForm = document.getElementById("postcodeForm");
  var postcodeResult = document.getElementById("postcodeResult");
  if (postcodeForm) {
    postcodeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = parseInt(document.getElementById("postcodeInput").value, 10);
      var ranges = (window.SITE_CONFIG && SITE_CONFIG.coverageRanges) || [];
      var match = ranges.find(function (r) { return val >= r.min && val <= r.max; });
      if (!val) {
        postcodeResult.textContent = "Enter a valid 4-digit postcode.";
      } else if (match) {
        postcodeResult.textContent = "Good news \u2014 " + match.label + " is already covered!";
      } else {
        postcodeResult.textContent = "Not listed yet, but coverage is growing \u2014 send an enquiry anyway.";
      }
    });
  }

  // ---- FAQ accordion ----------------------------------------------------------
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

  // ---- Confetti celebration on enquiry submit ---------------------------------
  var CONFETTI_COLORS = ["#7C5CFA", "#FFC94D", "#E8A400", "#FFFFFF", "#3E2A85"];

  function fireConfetti(host) {
    if (!host) return;
    host.innerHTML = "";
    if (reduceMotion) return; // keep the message, skip the falling pieces
    var count = 36;
    for (var n = 0; n < count; n++) {
      var piece = document.createElement("span");
      piece.className = "confetti-piece";
      var size = 6 + Math.random() * 6;
      piece.style.width = size + "px";
      piece.style.height = (size * 0.4) + "px";
      piece.style.left = (Math.random() * 100) + "%";
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDuration = (1.6 + Math.random() * 1.2) + "s";
      piece.style.animationDelay = (Math.random() * 0.4) + "s";
      host.appendChild(piece);
    }
  }

  var form = document.getElementById("enquiryForm");
  var celebration = document.getElementById("celebration");
  var confettiHost = document.getElementById("confettiHost");
  if (form && celebration) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // NOTE: this is where you wire up a real backend (Formspree, a
      // serverless function, your CRM, etc.) before launch. For now it
      // just shows the celebration so you can see/feel the intended flow.
      form.hidden = true;
      celebration.hidden = false;
      fireConfetti(confettiHost);
    });
  }
})();
