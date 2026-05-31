/**
 * Lunovaré Printz — script.js
 * Premium Custom Sublimation Printing · Malaysia
 * ─────────────────────────────────────────────
 * Sections:
 *  1. Constants
 *  2. Navbar scroll behaviour
 *  3. Mobile menu toggle
 *  4. Scroll-reveal (IntersectionObserver)
 *  5. FAQ accordion
 *  6. Gallery lightbox
 *  7. Contact form → WhatsApp redirect
 *  8. Smooth anchor scroll
 *  9. Hero parallax (respects prefers-reduced-motion)
 */

'use strict';

/* ─── 1  CONSTANTS ───────────────────────────────────────────── */
const WA_NUMBER  = '60142479264';
const WA_DEFAULT = 'Hi Lunovaré Printz, I would like to get a quotation.';
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_DEFAULT)}`;

/* ─── 2  NAVBAR SCROLL ───────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── 3  MOBILE MENU ─────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Expose for inline onclick on menu links
  window.closeMobileMenu = function () {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };
})();

/* ─── 4  SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ─── 5  FAQ ACCORDION ───────────────────────────────────────── */
/**
 * Called via onclick="toggleFaq(this)" on each .faq-q element.
 * Only one item can be open at a time.
 */
window.toggleFaq = function (qEl) {
  const item   = qEl.parentElement;
  const isOpen = item.classList.contains('active');

  // Close all open items
  document.querySelectorAll('.faq-item.active').forEach((i) =>
    i.classList.remove('active')
  );

  // Toggle the clicked item
  if (!isOpen) item.classList.add('active');
};

/* ─── 6  GALLERY LIGHTBOX ────────────────────────────────────── */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const label    = document.getElementById('lightboxLabel');
  const closeBtn = document.querySelector('.lightbox-close');
  if (!lightbox) return;

  window.openLightbox = function (title) {
    if (label) label.textContent = title;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) window.closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);
})();

/* ─── 7  CONTACT FORM → WHATSAPP ────────────────────────────── */
/**
 * Reads form fields, composes a WhatsApp message pre-filled with
 * the customer's details, and opens wa.me in a new tab.
 */
window.submitForm = function () {
  const get = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  const name    = get('fname');
  const phone   = get('fphone');
  const email   = get('femail');
  const product = get('fproduct');
  const qty     = get('fqty');
  const msg     = get('fmsg');

  let text = 'Hi Lunovaré Printz, I would like to get a quotation.\n\n';
  if (name)    text += `Name: ${name}\n`;
  if (phone)   text += `Phone: ${phone}\n`;
  if (email)   text += `Email: ${email}\n`;
  if (product) text += `Product: ${product}\n`;
  if (qty)     text += `Quantity: ${qty}\n`;
  if (msg)     text += `\nRequirements:\n${msg}`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/* ─── 8  SMOOTH ANCHOR SCROLL ───────────────────────────────── */
(function initSmoothScroll() {
  const NAVBAR_HEIGHT = 72; // px — matches CSS navbar height

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ─── 9  HERO PARALLAX ───────────────────────────────────────── */
(function initParallax() {
  // Respect user's motion preference
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  window.addEventListener(
    'scroll',
    () => {
      const sy = window.scrollY;
      if (sy < window.innerHeight) {
        const slash = hero.querySelector('.hero-slash');
        if (slash) slash.style.transform = `translateY(${sy * 0.12}px)`;
      }
    },
    { passive: true }
  );
})();
