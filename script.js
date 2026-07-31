// ============================================================
// F ONE ON ONE — INTERACTIONS
// Vanilla JS, no build step required. Respects prefers-reduced-motion.
// ============================================================
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- WhatsApp links ----------------------------------------------------
  // Note: config.js declares SITE_CONFIG with `const`, so it does not
  // attach to `window` — check via typeof, not `window.SITE_CONFIG`.
  var hasConfig = typeof SITE_CONFIG !== "undefined";
  function buildWhatsAppLink() {
    var num = (hasConfig && SITE_CONFIG.whatsappNumber) || "";
    var msg = (hasConfig && SITE_CONFIG.whatsappMessage) || "";
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

  // ---- Pricing cards, rendered from config so numbers never live in markup
  var pricingGrid = document.getElementById("pricingGrid");
  if (pricingGrid && hasConfig && Array.isArray(SITE_CONFIG.packages)) {
    var checkIcon = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    pricingGrid.innerHTML = SITE_CONFIG.packages.map(function (pkg) {
      var amount = pkg.price === null || pkg.price === undefined
        ? "[PLACEHOLDER]"
        : "$" + pkg.price;
      var features = (pkg.features || []).map(function (f) {
        return '<li>' + checkIcon + '<span>' + f + '</span></li>';
      }).join("");
      return (
        '<div class="pricing-card" data-reveal>' +
          '<p class="pricing-card__name">' + pkg.name + '</p>' +
          '<p class="pricing-card__blurb">' + pkg.blurb + '</p>' +
          '<div class="pricing-card__price">' +
            '<span class="pricing-card__amount">' + amount + '</span>' +
            '<span class="pricing-card__unit">' + pkg.unit + '</span>' +
          '</div>' +
          '<ul class="pricing-card__features">' + features + '</ul>' +
          '<a href="#contact" class="btn btn--ghost btn--block">Enquire</a>' +
        '</div>'
      );
    }).join("");
  }

  // ---- Nav: subtle background once the page has scrolled past the hero ----
  var nav = document.getElementById("nav");
  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }

  // ---- Thin top scroll-progress line --------------------------------------
  var scrollFill = document.getElementById("scrollFill");
  function updateScrollProgress() {
    if (!scrollFill) return;
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var scrollHeight = doc.scrollHeight - doc.clientHeight;
    var pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
    scrollFill.style.width = pct + "%";
  }

  function onScroll() {
    updateNav();
    updateScrollProgress();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Text generate effect: wrap words, reveal on load (hero only) -------
  function wrapWords(el) {
    var text = el.textContent;
    var words = text.split(/\s+/).filter(Boolean);
    el.textContent = "";
    words.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return el.querySelectorAll(".word");
  }

  var textRevealHosts = document.querySelectorAll("[data-text-reveal]");
  var allWords = [];
  textRevealHosts.forEach(function (host) {
    var words = wrapWords(host);
    allWords = allWords.concat(Array.prototype.slice.call(words));
  });
  if (reduceMotion) {
    allWords.forEach(function (w) { w.classList.add("in-view"); });
  } else {
    allWords.forEach(function (w, i) {
      w.style.transitionDelay = (i * 45) + "ms";
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        allWords.forEach(function (w) { w.classList.add("in-view"); });
      });
    });
  }

  // ---- Generic scroll reveals ---------------------------------------------
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

  // ---- Readiness Panel: animate metric bars/numbers as each step scrolls in
  function easeOutBack(t) {
    var c1 = 1.70158;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function animateMetric(metricEl) {
    if (metricEl.dataset.animated === "true") return;
    metricEl.dataset.animated = "true";
    var fill = metricEl.querySelector("[data-fill]");
    var valueEl = metricEl.querySelector("[data-value]");
    if (!fill || !valueEl) return;
    var target = parseFloat(fill.dataset.target) || 0;

    if (reduceMotion) {
      fill.style.width = target + "%";
      valueEl.textContent = Math.round(target) + "%";
      return;
    }

    var duration = 900;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      var eased = easeOutBack(t);
      var val = Math.max(0, target * eased);
      fill.style.width = val + "%";
      valueEl.textContent = Math.round(val) + "%";
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        fill.style.width = target + "%";
        valueEl.textContent = Math.round(target) + "%";
      }
    }
    requestAnimationFrame(tick);
  }

  var readinessMetrics = {};
  document.querySelectorAll(".readiness-metric[data-metric]").forEach(function (el) {
    readinessMetrics[el.dataset.metric] = el;
  });
  var readinessSteps = document.querySelectorAll(".readiness-step[data-metric-trigger]");
  if (readinessSteps.length && "IntersectionObserver" in window) {
    var activeMetric = null;
    var readinessObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var key = entry.target.dataset.metricTrigger;
          var metricEl = readinessMetrics[key];
          if (!metricEl) return;
          if (entry.isIntersecting) {
            animateMetric(metricEl);
            if (activeMetric && activeMetric !== metricEl) activeMetric.classList.remove("is-active");
            metricEl.classList.add("is-active");
            activeMetric = metricEl;
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );
    readinessSteps.forEach(function (el) { readinessObserver.observe(el); });
  } else {
    Object.keys(readinessMetrics).forEach(function (key) { animateMetric(readinessMetrics[key]); });
  }

  // ---- Fast-Track Loop: tracing beam that draws in step by step -----------
  var loopFill = document.getElementById("loopFill");
  var loopSteps = document.querySelectorAll(".loop__step[data-loop-step]");
  var isDesktopLoop = window.matchMedia("(min-width:821px)").matches;
  window.addEventListener("resize", function () {
    isDesktopLoop = window.matchMedia("(min-width:821px)").matches;
  });
  if (loopFill && loopSteps.length && "IntersectionObserver" in window) {
    var loopObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var step = parseInt(entry.target.dataset.loopStep, 10);
            var pct = (step / loopSteps.length) * 100;
            if (isDesktopLoop) loopFill.style.width = pct + "%";
            else loopFill.style.height = pct + "%";
            entry.target.classList.add("is-checked");
          }
        });
      },
      { threshold: 0.6 }
    );
    loopSteps.forEach(function (el) { loopObserver.observe(el); });
  } else if (loopFill) {
    loopFill.style.width = "100%";
    loopFill.style.height = "100%";
    loopSteps.forEach(function (el) { el.classList.add("is-checked"); });
  }

  // ---- Comparison table: rows animate in one by one -----------------------
  var compareRows = document.querySelectorAll(".compare__table tbody tr");
  if (reduceMotion) {
    compareRows.forEach(function (row) { row.classList.add("in-view"); });
  } else if ("IntersectionObserver" in window && compareRows.length) {
    var compareObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            compareObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    compareRows.forEach(function (row, i) {
      row.style.transitionDelay = (i * 80) + "ms";
      compareObserver.observe(row);
    });
  } else {
    compareRows.forEach(function (row) { row.classList.add("in-view"); });
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
        "This form isn't wired up to anything yet — connect it to your " +
        "email service, CRM, or a form backend (e.g. Formspree, a serverless " +
        "function, or your booking tool) before launch."
      );
    });
  }
})();
