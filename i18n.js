const LANG_KEY = "faketube-lang";
let currentLang = localStorage.getItem(LANG_KEY) || "en";

function setLanguage(lang) {
  if (!translations[lang]) return;

  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = translations[lang][key];
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const value = translations[lang][key];
    if (value !== undefined) {
      el.placeholder = value;
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    const value = translations[lang][key];
    if (value !== undefined) {
      if (el.tagName === "IMG") {
        el.alt = value;
      } else {
        el.setAttribute("aria-label", value);
      }
    }
  });

  const titleKey = "page.title";
  if (translations[lang][titleKey]) {
    document.title = translations[lang][titleKey];
  }

  ["languageToggle", "greetingLangToggle"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn && translations[lang]["lang.toggleAria"]) {
      btn.setAttribute("aria-label", translations[lang]["lang.toggleAria"]);
    }
  });

  document.dispatchEvent(
    new CustomEvent("faketube:langchange", { detail: { lang } }),
  );
}

function toggleLanguage() {
  setLanguage(currentLang === "en" ? "af" : "en");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("languageToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleLanguage);
  }
  setLanguage(currentLang);
});
