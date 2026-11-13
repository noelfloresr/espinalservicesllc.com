(function () {
  "use strict";

  var STORAGE_KEY = "espinal-lang";
  var html = document.documentElement;

  /* ---------- Language toggle ---------- */
  function applyLang(lang) {
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var pressed = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", String(pressed));
    });
    document.querySelectorAll(".lang-en, .lang-es").forEach(function (el) {
      var isMatch = el.classList.contains("lang-" + lang);
      if (isMatch) {
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", "");
      }
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    var lang = saved === "es" || saved === "en" ? saved : "en";
    applyLang(lang);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------- Contact form (honeypot check; submission handled by form action) ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        e.preventDefault();
        return;
      }
      var requiredFields = form.querySelectorAll("[required]");
      var firstInvalid = null;
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.setAttribute("aria-invalid", "true");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute("aria-invalid");
        }
      });
      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
      }
    });
  }

  function initPrint() {
    document.querySelectorAll("[data-print]").forEach(function (btn) {
      btn.addEventListener("click", function () { window.print(); });
    });
  }

  function initCopyLink() {
    var status = document.querySelector("[data-copy-status]");
    document.querySelectorAll("[data-copy-link]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var canonical = document.querySelector('link[rel="canonical"]');
        var url = canonical ? canonical.href : window.location.href;
        var es = document.documentElement.getAttribute("data-lang") === "es";
        function show(msg) { if (status) status.textContent = msg; }
        // Show the URL immediately so the visitor always has it, even if the
        // clipboard API is unavailable, blocked, or never settles.
        show((es ? "Copie este enlace: " : "Copy this link: ") + url);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            show((es ? "Enlace copiado: " : "Link copied: ") + url);
          }, function () { /* keep the visible URL */ });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initPrint();
    initCopyLink();
    initNav();
    initYear();
    initForm();
  });
})();
