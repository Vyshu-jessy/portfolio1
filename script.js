/* ─────────────────────────────────────────────────────────
   Vyshnavi Portfolio — Premium JavaScript
   ───────────────────────────────────────────────────────── */

/* ─── CURSOR ─────────────────────────────────────────────── */
const glow = document.querySelector(".cursor-glow");
const dot  = document.querySelector(".cursor-dot");

let mouseX = 0, mouseY = 0;
let glowX  = 0, glowY  = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top  = mouseY + "px";
});

// Smooth glow follow
(function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + "px";
    glow.style.top  = glowY + "px";
    requestAnimationFrame(animateGlow);
})();

// Cursor scale on interactive elements
document.querySelectorAll("a, button, .glass-card, .chip, .proj-link").forEach(el => {
    el.addEventListener("mouseenter", () => {
        dot.style.transform = "translate(-50%,-50%) scale(2.5)";
        dot.style.opacity   = "0.5";
    });
    el.addEventListener("mouseleave", () => {
        dot.style.transform = "translate(-50%,-50%) scale(1)";
        dot.style.opacity   = "1";
    });
});


/* ─── PARTICLES ──────────────────────────────────────────── */
const particlesContainer = document.getElementById("particles");

function createParticle() {
    const p = document.createElement("div");
    p.classList.add("particle");
    const size = Math.random() * 4 + 2;
    p.style.width  = size + "px";
    p.style.height = size + "px";
    p.style.left   = Math.random() * 100 + "vw";
    const duration = Math.random() * 15 + 10;
    const delay    = Math.random() * 10;
    p.style.animationDuration = duration + "s";
    p.style.animationDelay   = delay + "s";
    p.style.opacity = Math.random() * 0.5 + 0.1;
    particlesContainer.appendChild(p);
    setTimeout(() => p.remove(), (duration + delay) * 1000);
}

// Spawn particles
for (let i = 0; i < 18; i++) createParticle();
setInterval(createParticle, 2000);


/* ─── NAVBAR SCROLL ──────────────────────────────────────── */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});


/* ─── MOBILE MENU ────────────────────────────────────────── */
const menuBtn  = document.getElementById("mobileMenuBtn");
const navUl    = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
    navUl.classList.toggle("open");
    const spans = menuBtn.querySelectorAll("span");
    if (navUl.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
        spans[1].style.opacity   = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
    } else {
        spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    }
});

// Close on nav link click
document.querySelectorAll("nav ul a").forEach(link => {
    link.addEventListener("click", () => {
        navUl.classList.remove("open");
        menuBtn.querySelectorAll("span").forEach(s => {
            s.style.transform = ""; s.style.opacity = "";
        });
    });
});


/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));
            const active = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
            if (active) active.classList.add("active");
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => navObserver.observe(s));


/* ─── TYPING EFFECT ──────────────────────────────────────── */
const roles = [
    "GRADUATE · JAVA DEVELOPER",
    "PROBLEM SOLVER",
    "REST API ENTHUSIAST",
    "CONTINUOUS LEARNER",
    "SOFTWARE ENGINEER"
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById("typed-role");

function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (!isDeleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeRole, 2200);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }
    setTimeout(typeRole, isDeleting ? 45 : 80);
}
setTimeout(typeRole, 800);


/* ─── INTERSECTION OBSERVER — REVEAL ────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-card, .skill-box"
).forEach(el => revealObserver.observe(el));


/* ─── TIMELINE PROGRESS LINE ─────────────────────────────── */
const timelineSection = document.querySelector("#journey");
const timelineProgress = document.querySelector(".timeline-progress");

if (timelineSection && timelineProgress) {
    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineProgress.style.height = "100%";
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    tlObserver.observe(timelineSection);
}


/* ─── PARALLAX ON BLOBS ──────────────────────────────────── */
const blobs = document.querySelectorAll(".bg-blob");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    blobs.forEach((blob, i) => {
        const speed = 0.06 + i * 0.02;
        blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, { passive: true });


/* ─── FLOATING ICONS MOUSE PARALLAX ─────────────────────── */
const floatingIcons = document.querySelectorAll(".floating-icon");

document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    floatingIcons.forEach((icon, i) => {
        const depth = 8 + i * 2;
        icon.style.transform =
            `translate(${dx * depth}px, ${dy * depth}px)`;
    });
});


/* ─── MAGNETIC BUTTONS ───────────────────────────────────── */
document.querySelectorAll(".magnetic-btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect   = btn.getBoundingClientRect();
        const btnCx  = rect.left + rect.width  / 2;
        const btnCy  = rect.top  + rect.height / 2;
        const distX  = e.clientX - btnCx;
        const distY  = e.clientY - btnCy;
        btn.style.transform = `translate(${distX * 0.22}px, ${distY * 0.22}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
    });
});


/* ─── TILT ON CARDS ──────────────────────────────────────── */
document.querySelectorAll(".glass-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotX =  ((y - cy) / cy) * 4;
        const rotY = -((x - cx) / cx) * 4;
        card.style.transform =
            `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});


/* ─── STAGGERED SECTION ENTRY ────────────────────────────── */
// Apply stagger to child cards within grid containers
const staggerSelectors = [
    ".skills-grid .skill-box",
    ".cert-grid .cert-card",
    ".project-grid .project-card",
    ".why-grid .why-card",
    ".about-grid .card"
];

staggerSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
        if (!el.style.getPropertyValue("--delay")) {
            el.style.setProperty("--delay", `${i * 0.1}s`);
        }
    });
});


/* ─── SEND BUTTON ────────────────────────────────────────── */
const sendBtn = document.getElementById("sendBtn");

if (sendBtn) {
    sendBtn.addEventListener("click", () => {
        const nameInput  = document.querySelector(".contact-form input[type=text]");
        const emailInput = document.querySelector(".contact-form input[type=email]");
        const msgInput   = document.querySelector(".contact-form textarea");

        const name  = nameInput  ? nameInput.value.trim()  : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const msg   = msgInput   ? msgInput.value.trim()   : "";

        if (!name || !email || !msg) {
            showToast("⚠️  Please fill in all fields.", true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast("⚠️  Please enter a valid email.", true);
            return;
        }

        // Simulate sending
        sendBtn.disabled = true;
        sendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending…</span>`;

        setTimeout(() => {
            if (nameInput)  nameInput.value  = "";
            if (emailInput) emailInput.value = "";
            if (msgInput)   msgInput.value   = "";

            sendBtn.disabled = false;
            sendBtn.innerHTML = `<i class="fa-regular fa-paper-plane"></i> <span>Send Message</span>`;
            showToast("✓  Message sent! I'll be in touch soon.");
        }, 1600);
    });
}

function showToast(message, isError = false) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.classList.add("toast");
    if (isError) toast.style.background = "linear-gradient(135deg, #f43f5e, #e11d48)";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add("show"));
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}


/* ─── SKILL BARS ANIMATE ON REVEAL ──────────────────────── */
const skillBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            skillBoxObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll(".skill-box").forEach(el => skillBoxObserver.observe(el));


/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});


/* ─── COUNTER ANIMATION FOR HERO STATS ──────────────────── */
function animateCounter(el, target, suffix, duration = 1500) {
    const isFloat = target % 1 !== 0;
    let startTime = null;
    const start   = 0;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = start + (target - start) * ease;
        el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll(".stat-num");
            nums.forEach(num => {
                const raw  = num.textContent.trim();
                const isPlus = raw.includes("+");
                const isPct  = raw.includes("%");
                const val    = parseFloat(raw.replace(/[^0-9.]/g, ""));
                const suffix = isPlus ? "+" : isPct ? "%" : "";
                animateCounter(num, val, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);


/* ─── TOOLTIP ON FLOATING ICONS ─────────────────────────── */
document.querySelectorAll(".floating-icon[data-tooltip]").forEach(icon => {
    const tip = document.createElement("span");
    tip.textContent = icon.dataset.tooltip;
    tip.style.cssText = `
        position:absolute; bottom:calc(100% + 8px); left:50%;
        transform:translateX(-50%); background:rgba(15,23,42,.85);
        color:white; padding:5px 10px; border-radius:8px;
        font-size:12px; font-weight:600; white-space:nowrap;
        pointer-events:none; opacity:0; transition:opacity .2s;
        z-index:10;
    `;
    icon.appendChild(tip);

    icon.addEventListener("mouseenter", () => tip.style.opacity = "1");
    icon.addEventListener("mouseleave", () => tip.style.opacity = "0");
});
