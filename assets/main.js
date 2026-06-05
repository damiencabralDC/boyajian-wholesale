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

  // ---- Progressive intake form ----
  const intakeForm = document.querySelector('[data-intake-form]');
  const stepTwo   = document.querySelector('[data-step-id="2"]');
  const ctxLabel  = document.querySelector('[data-step-context]');
  const leadTitle = document.querySelector('[data-lead-title]');
  const leadSub   = document.querySelector('[data-lead-sub]');
  const breadcrumbCurrent = document.querySelector('[data-breadcrumb-current]');

  const intentMeta = {
    sample: {
      submitLabel: 'Request Sample Kit',
      stepContext: 'Sample kit request',
      pageTitle:   'Tell us about your operation.',
      pageSub:     "Two quick steps. We'll match the right products and ship a sample kit within 48 hours. First reply within one business day.",
      breadcrumb:  'Request a Sample Kit'
    },
    conversation: {
      submitLabel: 'Start a Conversation',
      stepContext: 'Start a conversation',
      pageTitle:   "Let's start a conversation.",
      pageSub:     "Two quick steps. Tell us what you're working on and we'll respond within one business day.",
      breadcrumb:  'Start a Conversation'
    },
    custom: {
      submitLabel: 'Submit Custom Inquiry',
      stepContext: 'Custom / private label',
      pageTitle:   'Custom blends, co-packing, private label.',
      pageSub:     "Two quick steps. Tell us about your project and a senior team member will respond within one business day.",
      breadcrumb:  'Custom or Private Label'
    }
  };

  function setIntent(intent) {
    if (!intentMeta[intent]) intent = 'sample';

    document.querySelectorAll('[data-form-tab]').forEach(el => {
      el.classList.toggle('active', el.dataset.formTab === intent);
      el.setAttribute('aria-pressed', el.dataset.formTab === intent ? 'true' : 'false');
    });

    if (!intakeForm) return;

    intakeForm.dataset.intent = intent;
    const intentInput = intakeForm.querySelector('input[name="intent"]');
    if (intentInput) intentInput.value = intent;

    intakeForm.querySelectorAll('[data-intent-show]').forEach(el => {
      const showFor = el.dataset.intentShow.split(',');
      el.style.display = showFor.includes(intent) ? '' : 'none';
    });

    const submitBtn = intakeForm.querySelector('[data-submit-label]');
    if (submitBtn) submitBtn.textContent = intentMeta[intent].submitLabel;

    if (ctxLabel) ctxLabel.textContent = intentMeta[intent].stepContext;

    if (leadTitle) leadTitle.textContent = intentMeta[intent].pageTitle;
    if (leadSub)   leadSub.textContent   = intentMeta[intent].pageSub;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = intentMeta[intent].breadcrumb;
    if (document.body.classList.contains('page--lead-gen')) {
      document.title = intentMeta[intent].breadcrumb + ' | Boyajian Wholesale';
    }
  }

  function revealStepTwo(scrollIntoView) {
    if (!stepTwo) return;
    if (!stepTwo.hasAttribute('hidden')) return;
    stepTwo.removeAttribute('hidden');
    if (scrollIntoView) {
      setTimeout(() => {
        stepTwo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }

  document.querySelectorAll('[data-form-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const intent = btn.dataset.formTab;
      setIntent(intent);
      revealStepTwo(true);
    });
  });

  // ---- URL param prefill (lead-gen page) ----
  const segmentSelect = document.querySelector('[data-segment-select]');
  const params = new URLSearchParams(window.location.search);

  const industryParam = (params.get('industry') || '').toLowerCase();
  const industryMap = {
    pizza:         'pizza',
    foodservice:   'foodservice',
    bakery:        'bakery',
    bakeries:      'bakery',
    manufacturer:  'food-mfg',
    manufacturers: 'food-mfg',
    'food-mfg':    'food-mfg',
    snack:         'snack-mfg',
    snacks:        'snack-mfg',
    'snack-mfg':   'snack-mfg',
    retail:           'specialty-retail',
    specialty:        'specialty-retail',
    'specialty-retail':'specialty-retail',
    other:         'other'
  };
  if (segmentSelect && industryParam && industryMap[industryParam]) {
    segmentSelect.value = industryMap[industryParam];
  }

  const contactParam = (params.get('contact') || '').toLowerCase();
  if (contactParam && intentMeta[contactParam]) {
    setIntent(contactParam);
    revealStepTwo(false);
  }

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

  // ---- Form submission stub (prototype) ----
  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(intakeForm);
      const intent = formData.get('intent') || 'sample';
      alert(
        'Prototype: Form submitted with intent "' + intent + '".\n\n' +
        'In WordPress, this will route to Gravity Forms / Contact Form 7\n' +
        'with conditional logic based on the selected intent.'
      );
    });
  }

})();
