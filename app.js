/* ============================================================
AutoRoy Cloud - Premium JS Engine
GSAP-like reveal, theme engine, smooth interactions
============================================================ */

/* ---------- Theme Engine ---------- */
const themeToggle = document.querySelector(".theme-toggle");

function applyTheme() {
const saved = localStorage.getItem("theme");
if (saved === "light") {
document.body.classList.add("light");
themeToggle.textContent = "☀️";
} else {
document.body.classList.remove("light");
themeToggle.textContent = "🌙";
}
}
applyTheme();

function toggleTheme() {
if (document.body.classList.contains("light")) {
document.body.classList.remove("light");
localStorage.setItem("theme", "dark");
themeToggle.textContent = "🌙";
} else {
document.body.classList.add("light");
localStorage.setItem("theme", "light");
themeToggle.textContent = "☀️";
}
}

/* ---------- Header shrink on scroll ---------- */
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
if (window.scrollY > 40) {
header.classList.add("scrolled");
} else {
header.classList.remove("scrolled");
}
});

/* ---------- Reveal Animations ---------- */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
const trigger = window.innerHeight * 0.92;

reveals.forEach((el) => {
const box = el.getBoundingClientRect().top;
if (box < trigger) {
el.classList.add("show");
}
});
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ---------- Smooth Scroll for internal links ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
const targetID = this.getAttribute("href");
if (targetID.length > 1) {
e.preventDefault();
document.querySelector(targetID).scrollIntoView({
behavior: "smooth",
});
}
});
});

/* ---------- Parallax Effect (Hero Image) ---------- */
const astronaut = document.querySelector(".astronaut");

document.addEventListener("mousemove", (e) => {
if (!astronaut) return;

const x = (window.innerWidth - e.pageX * 2) / 90;
const y = (window.innerHeight - e.pageY * 2) / 90;

astronaut.style.transform = `translate(${x}px, ${y}px)`;
});

/* ---------- Parallax Glow ---------- */
const glow = document.querySelector(".glow");

document.addEventListener("mousemove", (e) => {
if (!glow) return;

const x = (e.pageX / window.innerWidth) * 40 - 20;
const y = (e.pageY / window.innerHeight) * 40 - 20;

glow.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
});

/* ---------- Micro Hover Interactions ---------- */
document.querySelectorAll(".service-card").forEach((card) => {
card.addEventListener("mousemove", (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;

card.style.transform = `translateY(-6px) rotateX(${y / 25}deg) rotateY(${x / 25}deg)`;
});

card.addEventListener("mouseleave", () => {
card.style.transform = "translateY(0px) rotateX(0deg) rotateY(0deg)";
});
});
