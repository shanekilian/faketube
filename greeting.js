const USERNAME_KEY = "faketube-username";
const FAKE_USERNAMES = [
  "Zane",
  "Alex",
  "Jamie",
  "Casey",
  "Riley",
  "Morgan",
  "Jordan",
  "Taylor",
  "Sam",
  "Quinn",
];

let viewerCountMillion = 0;

function getOrCreateUsername() {
  let username = localStorage.getItem(USERNAME_KEY);
  if (!username) {
    username =
      FAKE_USERNAMES[Math.floor(Math.random() * FAKE_USERNAMES.length)];
    localStorage.setItem(USERNAME_KEY, username);
  }
  return username;
}

function generateViewerCount() {
  return Math.floor(Math.random() * (142 - 95 + 1)) + 95;
}

function getGreetingKey() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "greeting.morning";
  if (hour >= 12 && hour < 17) return "greeting.afternoon";
  if (hour >= 17 && hour < 21) return "greeting.evening";
  return "greeting.night";
}

function formatGreetingString(template, name, count) {
  return template.replace("{name}", name).replace("{count}", count);
}

function updateGreetingContent() {
  const lang = localStorage.getItem("faketube-lang") || "en";
  const username = getOrCreateUsername();
  const greetingKey = getGreetingKey();
  const headingEl = document.getElementById("greetingHeading");
  const funFactEl = document.getElementById("greetingFunFact");

  if (!headingEl || !funFactEl || !translations[lang]) return;

  const greetingTemplate = translations[lang][greetingKey];
  const funFactTemplate = translations[lang]["greeting.funFact"];

  headingEl.textContent = formatGreetingString(
    greetingTemplate,
    username,
    viewerCountMillion,
  );
  funFactEl.textContent = formatGreetingString(
    funFactTemplate,
    username,
    viewerCountMillion,
  );
}

function showGreetingModal() {
  const overlay = document.getElementById("greetingOverlay");
  if (!overlay) return;

  overlay.classList.remove("greeting-overlay--hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("greeting-open");
}

function hideGreetingModal() {
  const overlay = document.getElementById("greetingOverlay");
  if (!overlay) return;

  overlay.classList.add("greeting-overlay--hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("greeting-open");
}

function initGreeting() {
  viewerCountMillion = generateViewerCount();
  updateGreetingContent();
  showGreetingModal();

  const closeBtn = document.getElementById("greetingClose");
  const langBtn = document.getElementById("greetingLangToggle");
  const overlay = document.getElementById("greetingOverlay");

  if (closeBtn) {
    closeBtn.addEventListener("click", hideGreetingModal);
  }

  if (langBtn) {
    langBtn.addEventListener("click", toggleLanguage);
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        hideGreetingModal();
      }
    });
  }

  document.addEventListener("faketube:langchange", updateGreetingContent);
}

document.addEventListener("DOMContentLoaded", initGreeting);
