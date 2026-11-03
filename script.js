const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

// Subtle reveal on scroll.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

// Featured project filters.
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

// Keep the footer year current.
document.querySelector('#year').textContent = new Date().getFullYear();


// Smart Sticky Header: hide on scroll down, show on scroll up
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const nav = document.querySelector(".nav");

    if (!header) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 8;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // At the top: always show header
        if (currentScrollY <= 50) {
            header.classList.remove("header-hidden");
            header.classList.remove("header-scrolled");
            lastScrollY = currentScrollY;
            return;
        }

        header.classList.add("header-scrolled");

        // Don't hide header while mobile menu is open
        const menuOpen = nav && nav.classList.contains("active");

        if (!menuOpen && Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                header.classList.add("header-hidden");
            } else {
                // Scrolling up
                header.classList.remove("header-hidden");
            }

            lastScrollY = currentScrollY;
        }
    }, { passive: true });
});
