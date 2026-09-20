/* ============================================
   Alpha-Energy — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Elements ----------
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const yearEl = document.getElementById('year');

  // ---------- Current Year ----------
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Mobile Navigation ----------
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');

      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (nav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ---------- Header scroll effect ----------
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  // ---------- Smooth active section highlighting ----------
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ---------- Back to top ----------
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Contact Form ----------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Basic validation
      if (!data.name || !data.phone || !data.service) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate successful submission (replace with real API / Formspree / etc.)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showFormMessage(
          'Thank you! Your enquiry has been received. We will contact you within 24 hours.',
          'success'
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1200);

      // For production, replace the setTimeout above with:
      // fetch('YOUR_ENDPOINT', { method: 'POST', body: formData })
      //   .then(...)
    });
  }

  function showFormMessage(message, type) {
    // Remove existing message
    const existing = contactForm.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `form-message form-message--${type}`;
    msg.textContent = message;
    msg.style.cssText = `
      margin-top: 1rem;
      padding: 0.85rem 1rem;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
      background: ${type === 'success' ? 'rgba(15, 118, 110, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
      color: ${type === 'success' ? '#0f766e' : '#dc2626'};
    `;
    contactForm.appendChild(msg);

    // Auto-remove after 6 seconds
    setTimeout(() => msg.remove(), 6000);
  }

  // ---------- Intersection Observer for fade-in animations ----------
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

    // Observe cards and key elements
  document.querySelectorAll(
    '.service-card, .solution-card, .why-card, .step, .fin-option, .hero-card'
  ).forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // ---------- Blog Read More toggles ----------
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.blog-card');
      const isExpanded = card.classList.toggle('is-expanded');
      btn.innerHTML = isExpanded
        ? 'Read less <i class="fas fa-chevron-up"></i>'
        : 'Read more <i class="fas fa-chevron-down"></i>';
    });
  });
});