/* ==========================================================================
   BOYAJIAN WHOLESALE — Prototype Interactions
   Vanilla JS — no dependencies. Each block is independent so the WP dev
   team can lift any individual pattern into the theme.
   ========================================================================== */

(function() {
  'use strict';

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('[data-nav-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded',
        siteNav.classList.contains('is-open') ? 'true' : 'false');
    });
  }

  // ---- Form intake tabs (CTA routing) ----
  const formTabs = document.querySelectorAll('[data-form-tab]');
  const intakeForm = document.querySelector('[data-intake-form]');
  formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const intent = tab.dataset.formTab;
      formTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (intakeForm) {
        intakeForm.dataset.intent = intent;
        // Update hidden intent field
        const intentInput = intakeForm.querySelector('input[name="intent"]');
        if (intentInput) intentInput.value = intent;
        // Toggle conditional field groups
        intakeForm.querySelectorAll('[data-intent-show]').forEach(el => {
          const showFor = el.dataset.intentShow.split(',');
          el.style.display = showFor.includes(intent) ? '' : 'none';
        });
        // Update submit label
        const submitBtn = intakeForm.querySelector('[data-submit-label]');
        if (submitBtn) {
          const labels = {
            sample: 'Request Sample Kit',
            conversation: 'Start a Conversation',
            custom: 'Submit Custom Inquiry'
          };
          submitBtn.textContent = labels[intent] || 'Submit';
        }
      }
    });
  });

  // ---- FAQ accordions ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  // ---- Anchor link smooth scroll with offset ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Video lightbox: handled by an inline <script> next to the lightbox markup
  // in index.html — see below the [data-video-lightbox] element. Kept inline so it
  // works even if this main.js file fails to load or is cached.

  // ---- Form submission stub (prototype — real WP form via Gravity/CF7) ----
  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(intakeForm);
      const intent = formData.get('intent') || 'sample';
      // In production: this is replaced with the WP form handler (Gravity Forms / CF7)
      alert(
        'Prototype: Form submitted with intent "' + intent + '".\n\n' +
        'In WordPress, this will route to Gravity Forms / Contact Form 7\n' +
        'with conditional logic based on the selected intent.'
      );
    });
  }

})();
