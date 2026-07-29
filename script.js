// ============================================================
// F ONE ON ONE — INTERACTIONS
// Vanilla JS, no build step required. Respects prefers-reduced-motion.
// ============================================================
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- WhatsApp links ----------------------------------------------------
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
    if (el) {
      el.href = waUrl;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  // ---- Scroll reveals ------------------------------------------------------
  var revealTargets = document.querySelectorAll("[data-reveal]");
  if (reduceMotion) {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  // ---- Confidence gauge (scroll progress through main content) -----------
  var gaugeFill = document.getElementById("gaugeFill");
  var isDesktop = window.matchMedia("(min-width:1000px)").matches;

  function updateGauge() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var scrollHeight = doc.scrollHeight - doc.clientHeight;
    var pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
    if (!gaugeFill) return;
    if (isDesktop) {
      gaugeFill.style.height = pct + "%";
    } else {
      gaugeFill.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", updateGauge, { passive: true });
  window.addEventListener("resize", function () {
    isDesktop = window.matchMedia("(min-width:1000px)").matches;
    updateGauge();
  });
  updateGauge();

  // ---- Logbook dial arc: animate when scrolled into view ------------------
  var dialArc = document.getElementById("dialArc");
  var logbookSection = document.getElementById("logbook");
  if (dialArc && logbookSection && "IntersectionObserver" in window) {
    var dialObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            dialArc.style.transition = reduceMotion ? "none" : "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.3,1)";
            dialArc.style.strokeDashoffset = "40"; // ~87% filled, matches 1hr->3hr ratio visually
            dialObserver.unobserve(logbookSection);
          }
        });
      },
      { threshold: 0.4 }
    );
    dialObserver.observe(logbookSection);
  }

  // ---- Track map path draw-on: animate when scrolled into view ------------
  var trackPathAnim = document.getElementById("trackPathAnim");
  var areasSection = document.getElementById("areas");
  if (trackPathAnim && areasSection && "IntersectionObserver" in window) {
    var trackObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            trackPathAnim.style.transition = reduceMotion ? "none" : "stroke-dashoffset 1.8s cubic-bezier(.2,.7,.3,1)";
            trackPathAnim.style.strokeDashoffset = "0";
            trackObserver.unobserve(areasSection);
          }
        });
      },
      { threshold: 0.3 }
    );
    trackObserver.observe(areasSection);
  }

  // ---- FAQ accordion --------------------------------------------------------
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

  // ---- Enquiry form: placeholder submit handler ----------------------------
  var form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "This form isn't wired up to anything yet \u2014 connect it to your " +
        "email service, CRM, or a form backend (e.g. Formspree, a serverless " +
        "function, or your booking tool) before launch."
      );
    });
  }
})();
