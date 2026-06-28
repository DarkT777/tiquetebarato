document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ===== DROPDOWNS (Header) =====
  document.querySelectorAll('[data-dropdown-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var targetId = this.getAttribute('data-dropdown-toggle');
      var dropdown = document.getElementById(targetId);
      if (!dropdown) return;
      var isOpen = dropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.header__dropdown').forEach(function (d) {
      d.classList.remove('open');
    });
  }
  document.addEventListener('click', closeAllDropdowns);

  // ===== MODALS =====
  // Show modal by id
  window.showModal = function (modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  // Hide modal
  window.hideModal = function (modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close modal on backdrop click
  document.querySelectorAll('.modal, .modal-call').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close with close buttons
  document.querySelectorAll('[data-dismiss="modal"], .close, .navbar__close, .modal-call__close, .confirmation__dismiss').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = this.closest('.modal, .modal-call');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ===== NAV DROPDOWN (Ofertas) =====
  var ofertasToggle = document.getElementById('dropdownOfertas');
  var ofertasMenu = document.querySelector('.cs-menu-ofertas');
  if (ofertasToggle && ofertasMenu) {
    ofertasToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      ofertasMenu.classList.toggle('show');
    });
    document.addEventListener('click', function () {
      ofertasMenu.classList.remove('show');
    });
    ofertasMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // ===== MOBILE MENU TOGGLES =====
  // Language settings back button opens language modal
  document.querySelectorAll('[ng-click*="modal_settings"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hideModal('modal_navbar');
      setTimeout(function () { showModal('modal_settings'); }, 300);
    });
  });

  // Phone back button
  document.querySelectorAll('[ng-click*="modal_phones"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hideModal('modal_navbar');
      setTimeout(function () { showModal('modal_phones'); }, 300);
    });
  });

  // Help back button
  document.querySelectorAll('[ng-click*="modal_help"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hideModal('modal_navbar');
      setTimeout(function () { showModal('modal_help'); }, 300);
    });
  });

  // Offer back button
  document.querySelectorAll('[ng-click*="modal_offer"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hideModal('modal_navbar');
      setTimeout(function () { showModal('modal_offer'); }, 300);
    });
  });

  // ===== CALL MODAL =====
  document.querySelectorAll('[ng-click*="modal-call"], [ng-click*="showModalHeader"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showModal('modal-call-global');
    });
  });

  // ===== CONTACT MODAL =====
  document.querySelectorAll('[ng-click*="modal-contact"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showModal('modal-contact');
    });
  });

  // ===== RAPD MODAL =====
  document.querySelectorAll('[ng-click*="modal-rapd"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showModal('modal-rapd');
    });
  });

  // ===== LANGUAGE/CURRENCY MODAL STEPS =====
  // Back from settings to navbar
  document.querySelectorAll('.settings__back').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hideModal('modal_settings');
      setTimeout(function () { showModal('modal_navbar'); }, 300);
    });
  });

  // Back from phones to navbar
  document.querySelectorAll('.phone-reservation__back').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hideModal('modal_phones');
      setTimeout(function () { showModal('modal_navbar'); }, 300);
    });
  });

  // ===== LANGUAGE CURRENCY SELECTION =====
  var langRadios = document.querySelectorAll('input[name="choose-language"]');
  langRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.querySelectorAll('.settings__item--language').forEach(function (item) {
        item.classList.remove('settings__item--active');
      });
      var parent = this.closest('.settings__item');
      if (parent) parent.classList.add('settings__item--active');
    });
  });

  var currRadios = document.querySelectorAll('input[name="choose-currency"]');
  currRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.querySelectorAll('.settings__item--currency').forEach(function (item) {
        item.classList.remove('settings__item--active');
      });
      var parent = this.closest('.settings__item');
      if (parent) parent.classList.add('settings__item--active');
    });
  });

  // ===== CALL FORM HANDLING =====
  var callForm = document.getElementById('formllamadatos');
  if (callForm) {
    callForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('nombrecall');
      var phone = document.getElementById('telefonocall');
      var valid = true;

      if (!name.value.trim()) {
        showError(name, 'nombrecall_invalid');
        valid = false;
      } else {
        hideError('nombrecall_invalid');
      }

      if (!phone.value.trim() || phone.value.replace(/\D/g, '').length !== 10) {
        showError(phone, 'telefonocall_invalid');
        valid = false;
      } else {
        hideError('telefonocall_invalid');
      }

      if (valid) {
        hideModal('modal-call-global');
        showConfirmation();
        callForm.reset();
      }
    });
  }

  function showError(input, errorId) {
    var error = document.getElementById(errorId);
    if (error) error.style.display = 'block';
    if (input) input.setAttribute('aria-invalid', 'true');
  }

  function hideError(errorId) {
    var error = document.getElementById(errorId);
    if (error) error.style.display = 'none';
  }

  function showConfirmation() {
    var modal = document.getElementById('modal-confirmation');
    if (modal) {
      modal.classList.add('open');
    }
  }

  window.hiddeModalConfirmation = function () {
    var modal = document.getElementById('modal-confirmation');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // ===== NEWSLETTER =====
  var newsletterBtn = document.querySelector('[ng-click*="sendEmailNewsletter"]');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function () {
      var emailInput = document.querySelector('.form-email input');
      var errorEl = document.querySelector('.form-email small');
      if (emailInput) {
        var email = emailInput.value.trim();
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
          if (errorEl) errorEl.style.display = 'block';
        } else {
          if (errorEl) errorEl.style.display = 'none';
          alert('¡Gracias por suscribirte!');
          emailInput.value = '';
        }
      }
    });
  }

  // ===== FOOTER ACCORDION (MOBILE) =====
  if (window.innerWidth < 768) {
    document.querySelectorAll('.c-footer .accordion-item .h6').forEach(function (heading) {
      heading.style.cursor = 'pointer';
      heading.addEventListener('click', function () {
        var list = this.nextElementSibling;
        if (list) {
          list.classList.toggle('open');
        }
      });
    });
  }

  // ===== CAROUSEL SCROLL HELPERS =====
  // Make carousels scrollable with mouse drag
  document.querySelectorAll('.carousele__track').forEach(function (track) {
    var isDown = false;
    var startX;
    var scrollLeft;

    track.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });

    track.addEventListener('mouseleave', function () {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', function () {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - track.offsetLeft;
      var walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    var touchStartX = 0;
    var touchScrollLeft = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = track.scrollLeft;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      var x = e.touches[0].pageX;
      var walk = (x - touchStartX) * 1.5;
      track.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });
  });

  // ===== DOWNLOAD APP BANNER CLOSE =====
  var closeAppBanner = document.querySelector('#DownloadAppBanner .closeBtn');
  if (closeAppBanner) {
    closeAppBanner.addEventListener('click', function () {
      var banner = document.getElementById('DownloadAppBanner');
      if (banner) banner.style.display = 'none';
    });
  }

  // ===== COUPON BANNER CLOSE =====
  var closeCouponBanner = document.querySelector('#banner-wd .icons-close');
  if (closeCouponBanner) {
    closeCouponBanner.addEventListener('click', function () {
      var banner = document.getElementById('banner-wd');
      if (banner) banner.style.display = 'none';
    });
  }

  // ===== LAZY LOAD IMAGES =====
  if ('IntersectionObserver' in window) {
    var lazyImages = document.querySelectorAll('[data-lazy]');
    var imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-lazy');
          if (img.getAttribute('data-srcset')) {
            img.srcset = img.getAttribute('data-srcset');
          }
          img.removeAttribute('data-lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback: load all immediately
    document.querySelectorAll('[data-lazy]').forEach(function (img) {
      img.src = img.getAttribute('data-lazy');
    });
  }

  // ===== PLACEHOLDER IMAGE ERROR HANDLING =====
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (!this.src.includes('placeholder_img_co.png')) {
        this.src = 'https://via.placeholder.com/400x300/f0f0f0/ccc?text=No+Image';
      }
    });
  });

  // ===== TOGGLE EXPAND MAP (placeholder) =====
  window.toggleExpand = function () {
    // Placeholder for map expand
  };

  console.log('Tiquetes Baratos - Réplica iniciada correctamente');
});
