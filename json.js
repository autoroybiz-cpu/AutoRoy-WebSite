/* ============================================================
AutoRoy Cloud – app.js
Theme, mobile nav, smooth scroll, reveal, lead form, reviews
============================================================ */

// =============== THEME (LIGHT / DARK) ===============
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

function setTheme(isLight) {
if (isLight) {
body.classList.add("light");
themeToggle.innerHTML = "<span>☀️</span>";
localStorage.setItem("autoroy-theme", "light");
} else {
body.classList.remove("light");
themeToggle.innerHTML = "<span>🌙</span>";
localStorage.setItem("autoroy-theme", "dark");
}
}

// אתחול לפי מה שנשמר בדפדפן
const savedTheme = localStorage.getItem("autoroy-theme");
setTheme(savedTheme === "light");

if (themeToggle) {
themeToggle.addEventListener("click", () => {
setTheme(!body.classList.contains("light"));
});
}

// =============== MOBILE NAV ===============
const hamburger = document.getElementById("hamburger");
const navMobile = document.getElementById("navMobile");

if (hamburger && navMobile) {
hamburger.addEventListener("click", () => {
navMobile.classList.toggle("show");
});
}

function closeMobile() {
if (navMobile) navMobile.classList.remove("show");
}
window.closeMobile = closeMobile;

// =============== SMOOTH SCROLL ===============
function scrollToSection(selector) {
const el = document.querySelector(selector);
if (!el) return;
el.scrollIntoView({ behavior: "smooth", block: "start" });
}
window.scrollToSection = scrollToSection;

// =============== REVEAL ON SCROLL ===============
const revealEls = document.querySelectorAll(".reveal");

function handleReveal() {
const trigger = window.innerHeight * 0.88;
revealEls.forEach((el) => {
const top = el.getBoundingClientRect().top;
if (top < trigger) {
el.classList.add("show");
}
});
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

// =============== LEAD FORM → WHATSAPP ===============
function handleLeadSubmit(e) {
e.preventDefault();

const nameInput = document.getElementById("lead-name");
const businessInput = document.getElementById("lead-business");
const contactInput = document.getElementById("lead-contact");
const typeInput = document.getElementById("lead-type");
const messageInput = document.getElementById("lead-message");
const note = document.getElementById("lead-note");

const name = (nameInput?.value || "").trim() || "לקוח חדש";
const business = (businessInput?.value || "").trim();
const contact = (contactInput?.value || "").trim();
const type = (typeInput?.value || "").trim();
const extra = (messageInput?.value || "").trim();

let text = `היי, כאן ${name}.\n`;
if (business) text += `שם העסק / תחום: ${business}\n`;
if (type) text += `מה מעניין אותי: ${type}\n`;
if (contact) text += `טלפון / מייל לחזרה: ${contact}\n`;
if (extra) {
text += `\nאיך המצב נראה היום, ואיך הייתי רוצה שייראה:\n${extra}\n`;
}

text += `\nנשלח מהאתר AutoRoy Cloud.`;

// מספר שלך בוואטסאפ – בפורמט בינלאומי
const phone = "972547222023";
const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

// נפתח וואטסאפ בטאב חדש
window.open(waUrl, "_blank");

if (note) {
note.textContent = `${name}, יצרתי עבורך הודעה מסודרת בוואטסאפ. אפשר גם לפנות אליי במייל: autoroybiz@gmail.com`;
note.style.color = "#a5f3fc";
}

// אופציונלי: לנקות טופס אחרי שליחה
if (nameInput) nameInput.value = "";
if (businessInput) businessInput.value = "";
if (contactInput) contactInput.value = "";
if (typeInput) typeInput.value = "";
if (messageInput) messageInput.value = "";
}
window.handleLeadSubmit = handleLeadSubmit;

// =============== REVIEWS FORM (LOCAL LIST) ===============
function handleReviewSubmit(e) {
e.preventDefault();

const nameInput = document.getElementById("review-name");
const textInput = document.getElementById("review-text");
const note = document.getElementById("review-note");
const list = document.getElementById("reviewsList");

const text = (textInput?.value || "").trim();
if (!text) {
if (note) {
note.textContent = "כדי לשמור ביקורת צריך לפחות משפט אחד 🙂";
note.style.color = "#fecaca";
}
return;
}

const name = (nameInput?.value || "").trim() || "מבקר אנונימי";

if (list) {
const card = document.createElement("article");
card.className = "review-card";
card.innerHTML = `
<div class="review-head">
<span class="review-name">${name}</span>
<span class="review-tag">ביקורת מאתר AutoRoy</span>
</div>
<p class="review-text">${text}</p>
`;
// להוסיף למעלה
list.prepend(card);
}

if (textInput) textInput.value = "";
if (nameInput) nameInput.value = "";

if (note) {
note.textContent = "תודה על הפידבק! הביקורת נוספה לרשימה בעמוד.";
note.style.color = "#a5f3fc";
}
}
window.handleReviewSubmit = handleReviewSubmit;
