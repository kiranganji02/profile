/* ═══════════════════════════════════════════════════════════
   SRIJANI PORTFOLIO — script.js
════════════════════════════════════════════════════════════ */

// ─── NAVBAR SCROLL ────────────────────────────────────────
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Add scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ─── HAMBURGER / MOBILE MENU ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ─── INTERSECTION OBSERVER — FADE IN ─────────────────────
const fadeEls = document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .timeline-item, .edu-card, .contact-grid, .section-title, .section-tag'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Stagger child cards
const staggerGroups = [
  '.skills-grid .skill-category',
  '.projects-grid .project-card',
  '.edu-grid .edu-card',
];
staggerGroups.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});

// ─── CONTACT FORM ─────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i>&nbsp; Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.style.boxShadow = '0 4px 20px rgba(16,185,129,0.3)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

// ─── SMOOTH SCROLL FOR NAV LINKS ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── TYPING EFFECT IN HERO ROLE ──────────────────────────
const roles = [
  'Full Stack Developer',
  'React Enthusiast',
  'Node.js Developer',
  'UI Craftsperson',
  'Open Source Lover',
];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const roleEl = document.querySelector('.hero-role');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    roleEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 60 : 90);
}

// Start after a short delay
setTimeout(typeRole, 1000);
