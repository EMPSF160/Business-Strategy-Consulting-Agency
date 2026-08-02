/* ==========================================================================
   Stanton Strategy Partners - Master Interactive Script
   Executive Advisory & Management Consulting Agency
   ========================================================================== */

$(document).ready(function () {
  'use strict';

  // 1. Sticky Nav Shrink & Shadow on Scroll
  const $header = $('#site-header');
  const $backToTop = $('#back-to-top');

  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop();

    if (scrollPos > 40) {
      $header.addClass('is-scrolled');
    } else {
      $header.removeClass('is-scrolled');
    }

    // Back to top button visibility
    if (scrollPos > 300) {
      $backToTop.addClass('visible');
    } else {
      $backToTop.removeClass('visible');
    }
  });

  // Back to top click handler
  $backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // 2. Active Nav Link Highlighting based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-link').each(function () {
    const href = $(this).attr('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  // 3. Mobile Hamburger Menu Toggle
  const $hamburger = $('#hamburger-toggle');
  const $navMenu = $('#nav-menu');

  $hamburger.on('click', function () {
    const isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !isExpanded);
    $(this).toggleClass('open');
    $navMenu.toggleClass('active');
  });

  // Close mobile menu when clicking outside or clicking a nav link
  $('.nav-link').on('click', function () {
    $hamburger.removeClass('open').attr('aria-expanded', 'false');
    $navMenu.removeClass('active');
  });

  // 4. Scroll-Triggered Fade-In Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    document.documentElement.classList.add('js-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    $('.reveal').addClass('active');
  }

  // 5. Accenture-Inspired Interactive Enterprise ROI & Value Calculator
  function calculateEnterpriseROI() {
    const revenue = parseFloat($('#roi-revenue-select').val() || 500); // $ millions
    const focus = $('#roi-focus-select').val() || 'ma-synergy';
    
    let multiplier = 0.18; // Default 18% ROI impact
    let ebitdaUplift = "3.5% - 5.2%";
    let payback = "6 - 9 Months";

    if (focus === 'ma-synergy') {
      multiplier = 0.22;
      ebitdaUplift = "+4.2% to +6.8%";
      payback = "4 - 8 Months";
    } else if (focus === 'digital-ai') {
      multiplier = 0.28;
      ebitdaUplift = "+5.5% to +8.4%";
      payback = "6 - 12 Months";
    } else if (focus === 'margin-expansion') {
      multiplier = 0.15;
      ebitdaUplift = "+3.0% to +4.5%";
      payback = "3 - 6 Months";
    } else if (focus === 'turnaround') {
      multiplier = 0.35;
      ebitdaUplift = "+7.0% to +12.0%";
      payback = "9 - 14 Months";
    }

    const estimatedValue = (revenue * multiplier).toFixed(1);
    $('#roi-value-display').text('$' + estimatedValue + 'M+');
    $('#roi-ebitda-display').text(ebitdaUplift);
    $('#roi-payback-display').text(payback);
  }

  $('#roi-revenue-select, #roi-focus-select, #roi-industry-select').on('change input', function () {
    calculateEnterpriseROI();
  });

  // Run initial calculation
  if ($('#roi-value-display').length) {
    calculateEnterpriseROI();
  }

  // 6. Strategy&-Inspired Interactive Workflow Tabs
  $('.workflow-tab-btn').on('click', function () {
    const targetStep = $(this).data('step');
    $('.workflow-tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.workflow-card').removeClass('active').hide();
    $('#workflow-step-' + targetStep).addClass('active').fadeIn(400);
  });

  // 7. BCG-Inspired Thought Leadership Hub Filter & Quick Summary Modal
  $('.filter-btn').on('click', function () {
    const category = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (category === 'all') {
      $('.insight-card-item').hide().fadeIn(400);
    } else {
      $('.insight-card-item').each(function () {
        if ($(this).data('category') === category) {
          $(this).hide().fadeIn(400);
        } else {
          $(this).hide();
        }
      });
    }
  });

  // Insight Summary Modal Triggers
  $('.open-insight-modal').on('click', function (e) {
    e.preventDefault();
    const title = $(this).closest('.insight-card').find('h3').text();
    const teaser = $(this).closest('.insight-card').find('.insight-teaser').text();
    const category = $(this).closest('.insight-card').find('.insight-category-tag').text();

    $('#modal-insight-title').text(title);
    $('#modal-insight-category').text(category);
    $('#modal-insight-summary').text(teaser);
    $('#insight-modal-overlay').addClass('active');
  });

  $('.modal-close-trigger, #insight-modal-overlay').on('click', function (e) {
    if (e.target === this || $(e.target).hasClass('modal-close-trigger') || $(e.target).parent().hasClass('modal-close-trigger')) {
      $('#insight-modal-overlay').removeClass('active');
      $('#video-modal-overlay').removeClass('active');
      const $video = $('#modal-video-element')[0];
      if ($video) $video.pause();
    }
  });

  // 8. Executive Video Briefing Modal Trigger
  $('.play-video-trigger').on('click', function (e) {
    e.preventDefault();
    $('#video-modal-overlay').addClass('active');
    const $video = $('#modal-video-element')[0];
    if ($video) {
      $video.currentTime = 0;
      $video.play();
    }
  });

  // 9. Deloitte-Inspired Live Timezone Clocks for Global Hubs
  function updateGlobalClocks() {
    const timezones = {
      'ny-clock': { timeZone: 'America/New_York' },
      'london-clock': { timeZone: 'Europe/London' },
      'zurich-clock': { timeZone: 'Europe/Zurich' },
      'singapore-clock': { timeZone: 'Asia/Singapore' },
      'tokyo-clock': { timeZone: 'Asia/Tokyo' }
    };

    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    for (const [id, tz] of Object.entries(timezones)) {
      const $el = $('#' + id);
      if ($el.length) {
        const timeStr = new Date().toLocaleTimeString('en-US', { ...options, timeZone: tz.timeZone });
        $el.text(timeStr);
      }
    }
  }

  if ($('.hub-clock').length) {
    updateGlobalClocks();
    setInterval(updateGlobalClocks, 1000);
  }

  // 10. Toast Notification System
  const $toast = $('#toast-message');

  function showToast(message) {
    if (!$toast.length) return;
    $toast.find('.toast-text').text(message);
    $toast.addClass('show');
    setTimeout(function () {
      $toast.removeClass('show');
    }, 4500);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Contact Form
  const $contactForm = $('#contact-form');
  if ($contactForm.length) {
    $contactForm.on('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const $name = $('#contact-name');
      const $email = $('#contact-email');
      const $interest = $('#contact-interest');
      const $message = $('#contact-message');

      if ($.trim($name.val()) === '') {
        $name.addClass('is-invalid');
        isValid = false;
      }
      if (!validateEmail($.trim($email.val()))) {
        $email.addClass('is-invalid');
        isValid = false;
      }
      if (!$interest.val()) {
        $interest.addClass('is-invalid');
        isValid = false;
      }
      if ($.trim($message.val()).length < 10) {
        $message.addClass('is-invalid');
        isValid = false;
      }

      if (isValid) {
        showToast('Thank you! Your strategic consultation request has been submitted.');
        $contactForm[0].reset();
        $('.form-control').removeClass('is-invalid');
      }
    });

    $('.form-control').on('input change', function () {
      $(this).removeClass('is-invalid');
    });
  }

});
