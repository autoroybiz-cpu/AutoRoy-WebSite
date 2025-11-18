// ========================================================
// AutoRoy Cloud — app.js
// Made for the full upgraded version (light mode default)
// ========================================================

// -----------------------------
// 1) THEME TOGGLE
// -----------------------------
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

(function initTheme() {
  const saved = localStorage.getItem("autoroy-theme");
  if (saved === "dark") body.classList.add("dark");
  updateThemeIcon();
})();

function updateThemeIcon() {
  if (!themeToggle) return;
  themeToggle.textContent = body.classList.contains("dark") ? "🌙" : "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem(
      "autoroy-theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
    updateThemeIcon();
  });
}

// -----------------------------
// 2) MOBILE NAV
// -----------------------------
const hamburger = document.getElementById("hamburger");
const navMobile = document.getElementById("navMobile");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    const show = navMobile.classList.toggle("show");
    navMobile.setAttribute("aria-hidden", show ? "false" : "true");
    hamburger.setAttribute("aria-expanded", show ? "true" : "false");
  });
}

// סגירת תפריט כשנלחץ בחוץ
document.addEventListener("click", (e) => {
  if (!navMobile || !hamburger) return;
  if (
    navMobile.classList.contains("show") &&
    !navMobile.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navMobile.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// -----------------------------
// 3) SMOOTH SCROLL
// -----------------------------
function scrollToSection(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const scrollButtons = [
  "btnContact",
  "btnContactHeader",
  "ctaTalk",
  "startTalk",
  "startNow",
  "heroCTA"
];

scrollButtons.forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", () => scrollToSection("#contact"));
});

// -----------------------------
// 4) REVEAL ON SCROLL
// -----------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        revealObserver.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// -----------------------------
// 5) HERO PARALLAX + FLOATING NODES
// -----------------------------
(function heroParallax() {
  const hero = document.querySelector(".hero-visual");
  const nodes = document.querySelectorAll(".hero-node");

  if (!hero || nodes.length === 0) return;

  let rect = hero.getBoundingClientRect();
  window.addEventListener("resize", () => {
    rect = hero.getBoundingClientRect();
  });

  hero.addEventListener("pointermove", (ev) => {
    const x = (ev.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (ev.clientY - (rect.top + rect.height / 2)) / rect.height;

    nodes.forEach((n, i) => {
      const d = (i + 1) / nodes.length;
      const tx = x * 22 * d;
      const ty = y * 16 * d;

      n.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });

  // idle float motion
  let t = 0;
  function idle() {
    t += 0.003;
    nodes.forEach((n, i) => {
      const dx = Math.sin(t + i * 0.8) * 6;
      const dy = Math.cos(t + i * 0.6) * 4;
      n.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    requestAnimationFrame(idle);
  }
  idle();
})();

// -----------------------------
// 6) TILT EFFECT ON CARDS
// -----------------------------
(function cardTilt() {
  const cards = document.querySelectorAll(".card, .project-card");

  if (!cards.length) return;

  cards.forEach((card) => {
    let rect = null;

    card.addEventListener("pointerenter", () => {
      rect = card.getBoundingClientRect();
      card.style.transition = "transform 0.18s ease, box-shadow 0.18s ease";
    });

    card.addEventListener("pointermove", (ev) => {
      const x = (ev.clientX - rect.left) / rect.width;
      const y = (ev.clientY - rect.top) / rect.height;

      const rx = (0.5 - y) * 8;
      const ry = (x - 0.5) * 10;

      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.boxShadow = "0 20px 60px rgba(37,99,235,0.16)";
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "none";
      card.style.boxShadow = "var(--shadow-card)";
    });
  });
})();

// -----------------------------
// 7) CONTACT FORM — SEND TO EMAIL
// -----------------------------
const leadForm = document.getElementById("leadForm");

if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("lead-name").value.trim();
    const business = document.getElementById("lead-business").value.trim();
    const contact = document.getElementById("lead-contact").value.trim();
    const type = document.getElementById("lead-type").value;
    const message = document.getElementById("lead-message").value.trim();

    if (!contact) {
      alert("נא להזין טלפון או מייל ליצירת קשר");
      return;
    }

    const subject = encodeURIComponent(`פנייה חדשה מאתר AutoRoy Cloud — ${name}`);
    const body = encodeURIComponent(`
שם מלא: ${name}
עסק: ${business}
יצירת קשר: ${contact}
תחום: ${type}

הודעה:
${message}
`);

    window.location.href = `mailto:autoroybiz@gmail.com?subject=${subject}&body=${body}`;

    leadForm.reset();
  });
}

// -----------------------------
// 8) REVIEWS — LOCAL ADD ONLY
// -----------------------------
const reviewsForm = document.querySelector(".reviews-form");
const reviewsList = document.getElementById("reviewsList");

if (reviewsForm) {
  reviewsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("review-name").value.trim() || "אנונימי";
    const text = document.getElementById("review-text").value.trim();

    if (!text) {
      alert("נא למלא תוכן ביקורת");
      return;
    }

    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-head">
        <span class="review-name">${name}</span>
        <span class="review-tag">ביקורת מאתר AutoRoy</span>
      </div>
      <p class="review-text">${text}</p>
    `;

    reviewsList.prepend(card);
    reviewsForm.reset();
  });
}

// -----------------------------
// 9) ESC = סגירת תפריט
// -----------------------------
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMobile.classList.contains("show")) {
    navMobile.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

