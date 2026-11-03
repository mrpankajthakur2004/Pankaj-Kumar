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
