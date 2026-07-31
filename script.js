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

  // ---- Enquiry form: forward straight to WhatsApp -----------------------------
  var form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = form.elements["name"].value.trim();
      var contact = form.elements["contact"].value.trim();
      var suburb = form.elements["suburb"].value.trim();
      var need = form.elements["need"].value;
      var lines = [
        "New enquiry from the website:",
        "Name: " + name,
        "Phone/email: " + contact
      ];
      if (suburb) lines.push("Suburb/postcode: " + suburb);
      lines.push("Need: " + need);

      var num = (window.SITE_CONFIG && SITE_CONFIG.whatsappNumber) || "";
      var url = "https://wa.me/" + num.replace(/\D/g, "") + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      form.reset();
    });
  }
})();
