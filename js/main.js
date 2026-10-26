/**
 * ЮрГарант — Профессиональные юридические услуги
 * Interactive Scripts & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =========================================================================
  // 1. Mobile Navigation & Header Scroll
  // =========================================================================
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__menu');
  const header = document.querySelector('.header');

  if (burger) {
    burger.addEventListener('click', function () {
      const isActive = burger.classList.toggle('active');
      if (menu) menu.classList.toggle('active', isActive);
      document.body.classList.toggle('lock', isActive);
      burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('.menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('active');
        if (menu) menu.classList.remove('active');
        document.body.classList.remove('lock');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('active')) {
        burger.classList.remove('active');
        if (menu) menu.classList.remove('active');
        document.body.classList.remove('lock');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Active navigation highlight based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__menu .menu__link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(function (section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('menu__link-active');
          } else {
            link.classList.remove('menu__link-active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // =========================================================================
  // 2. Hero Interactive Slides
  // =========================================================================
  const heroSubtitle = document.querySelector('.intro__subtitle');
  const heroTitle = document.querySelector('.intro__title');
  const heroText = document.querySelector('.intro__text');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');

  const heroSlides = [
    {
      subtitle: 'Надежная поддержка физических лиц и бизнеса',
      title: 'Правовой Компас',
      text: 'Профессиональная юридическая помощь по любым правовым вопросам. Наша команда опытных адвокатов обеспечивает качественное сопровождение, минимизирует риски и гарантирует надежную защиту ваших законных прав и активов в суде.'
    },
    {
      subtitle: 'Комплексная защита коммерческих интересов',
      title: 'Арбитраж и Бизнес',
      text: 'Юридический консалтинг, арбитражная практика, оспаривание необоснованных претензий ФНС и сопровождение крупных инвестиционных сделок. Надежный щит для собственников и топ-менеджеров.'
    },
    {
      subtitle: 'Списание долгов и защита имущества по 127-ФЗ',
      title: 'Свобода от Долгов',
      text: 'Официальное проведение процедуры банкротства граждан под ключ. Остановка звонков банков и коллекторов с первого дня, сохранение жилья и полное аннулирование кредитных обязательств.'
    }
  ];

  let currentHeroSlide = 0;

  function renderHeroSlide(index) {
    if (!heroTitle || !heroSubtitle || !heroText) return;
    const content = heroTitle.closest('.intro__content');
    if (content) content.style.opacity = '0.3';

    setTimeout(function () {
      const slide = heroSlides[index];
      heroSubtitle.textContent = slide.subtitle;
      heroTitle.textContent = slide.title;
      heroText.textContent = slide.text;
      if (content) content.style.opacity = '1';
    }, 180);
  }

  if (heroPrevBtn && heroNextBtn) {
    heroPrevBtn.addEventListener('click', function () {
      currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
      renderHeroSlide(currentHeroSlide);
    });

    heroNextBtn.addEventListener('click', function () {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      renderHeroSlide(currentHeroSlide);
    });
  }

  // =========================================================================
  // 3. Scroll Reveal & Animated Number Counters
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const statNumbers = document.querySelectorAll('.stat-card__number');
  let statsCounted = false;

  function animateCounters() {
    if (statsCounted) return;
    statsCounted = true;

    statNumbers.forEach(function (counter) {
      const originalText = counter.textContent.trim();
      const targetAttr = counter.getAttribute('data-target');
      if (!targetAttr) return;

      const target = parseFloat(targetAttr);
      const isDecimal = targetAttr.includes('.');
      const suffix = originalText.replace(/[0-9.]/g, '');
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = target * easeProgress;

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(1) + suffix;
        } else if (target >= 1000) {
          const rounded = Math.floor(currentVal);
          counter.textContent = rounded.toLocaleString('ru-RU') + suffix;
        } else {
          counter.textContent = Math.floor(currentVal) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = originalText;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
      const statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      statsObserver.observe(statsSection);
    }
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
    animateCounters();
  }

  // =========================================================================
  // 4. Service Category Filter Tabs
  // =========================================================================
  const serviceTabs = document.querySelectorAll('.service-tab');
  const serviceCards = document.querySelectorAll('.services__content-grid .services__card');

  serviceTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      serviceTabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      serviceCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category === 'citizens' && filter === 'citizens' || category === 'business' && filter === 'business') {
          card.style.display = 'flex';
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(function () {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // 5. FAQ Accordion Toggle
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const trigger = item.querySelector('.faq__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close other items for neat accordion behavior
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq__trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // =========================================================================
  // 6. Modals Management (Native <dialog>)
  // =========================================================================
  const toastNotice = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(function () {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  function setupDialogBackdropClose(dialog) {
    if (!dialog) return;
    dialog.addEventListener('click', function (e) {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
      }
    });
  }

  // --- Consultation Dialog ---
  const consultationDialog = document.getElementById('consultationDialog');
  const openHeaderBtn = document.getElementById('openConsultationHeader');
  const openFooterBtn = document.getElementById('openConsultationFooter');
  const heroConsultationBtn = document.getElementById('heroConsultationBtn');
  const servicesCustomBtn = document.getElementById('servicesCustomBtn');
  const closeConsultationBtn = document.getElementById('closeConsultationBtn');
  const consultationForm = document.getElementById('consultationForm');
  const clientServiceSelect = document.getElementById('clientService');

  function openConsultationModal(preselectedService) {
    if (!consultationDialog) return;
    if (preselectedService && clientServiceSelect) {
      // Look for matching option or select nearest
      for (let i = 0; i < clientServiceSelect.options.length; i++) {
        if (clientServiceSelect.options[i].text.includes(preselectedService) || clientServiceSelect.options[i].value.includes(preselectedService)) {
          clientServiceSelect.selectedIndex = i;
          break;
        }
      }
    }
    consultationDialog.showModal();
  }

  if (openHeaderBtn) openHeaderBtn.addEventListener('click', function () { openConsultationModal(); });
  if (openFooterBtn) openFooterBtn.addEventListener('click', function () { openConsultationModal(); });
  if (heroConsultationBtn) heroConsultationBtn.addEventListener('click', function () { openConsultationModal(); });
  if (servicesCustomBtn) servicesCustomBtn.addEventListener('click', function () { openConsultationModal('Общая консультация'); });
  if (closeConsultationBtn) closeConsultationBtn.addEventListener('click', function () { consultationDialog.close(); });
  setupDialogBackdropClose(consultationDialog);

  if (consultationForm) {
    consultationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('clientName');
      const nameVal = nameInput ? nameInput.value.trim() : '';
      consultationDialog.close();
      consultationForm.reset();
      showToast('Благодарим за заявку' + (nameVal ? ', ' + nameVal : '') + '! Дежурный адвокат перезвонит вам в течение 10 минут.');
    });
  }

  // --- Service Details Dialog ---
  const serviceDialog = document.getElementById('serviceDialog');
  const closeServiceBtn = document.getElementById('closeServiceBtn');
  const serviceModalTitle = document.getElementById('serviceModalTitle');
  const serviceModalDesc = document.getElementById('serviceModalDesc');
  const serviceModalCategory = document.getElementById('serviceModalCategory');
  const serviceModalPrice = document.getElementById('serviceModalPrice');
  const serviceModalTime = document.getElementById('serviceModalTime');
  const serviceModalList = document.getElementById('serviceModalList');
  const orderThisServiceBtn = document.getElementById('orderThisServiceBtn');

  let activeServiceName = '';

  function openServiceModal(card) {
    if (!serviceDialog) return;
    activeServiceName = card.getAttribute('data-title') || 'Юридическая услуга';
    const desc = card.getAttribute('data-desc') || '';
    const category = card.getAttribute('data-category') === 'citizens' ? 'Для граждан' : 'Для бизнеса';
    const price = card.getAttribute('data-price') || 'По согласованию';
    const time = card.getAttribute('data-time') || 'от 1 недели';
    const items = (card.getAttribute('data-items') || '').split(';').filter(Boolean);

    if (serviceModalTitle) serviceModalTitle.textContent = activeServiceName;
    if (serviceModalDesc) serviceModalDesc.textContent = desc;
    if (serviceModalCategory) serviceModalCategory.textContent = category;
    if (serviceModalPrice) serviceModalPrice.textContent = price;
    if (serviceModalTime) serviceModalTime.textContent = time;

    if (serviceModalList) {
      serviceModalList.innerHTML = '';
      items.forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = item;
        serviceModalList.appendChild(li);
      });
    }

    serviceDialog.showModal();
  }

  document.querySelectorAll('.services__card').forEach(function (card) {
    card.addEventListener('click', function () {
      openServiceModal(card);
    });
  });

  if (closeServiceBtn) closeServiceBtn.addEventListener('click', function () { serviceDialog.close(); });
  setupDialogBackdropClose(serviceDialog);

  if (orderThisServiceBtn) {
    orderThisServiceBtn.addEventListener('click', function () {
      serviceDialog.close();
      openConsultationModal(activeServiceName);
    });
  }

  // --- Leave Review Dialog ---
  const reviewDialog = document.getElementById('reviewDialog');
  const openReviewBtn = document.getElementById('openReviewBtn');
  const closeReviewBtn = document.getElementById('closeReviewBtn');
  const reviewForm = document.getElementById('reviewForm');
  const allReviewsTrigger = document.getElementById('allReviewsTrigger');
  const starsContainer = document.getElementById('ratingStars');

  if (openReviewBtn && reviewDialog) {
    openReviewBtn.addEventListener('click', function () {
      reviewDialog.showModal();
    });
  }
  if (closeReviewBtn && reviewDialog) {
    closeReviewBtn.addEventListener('click', function () {
      reviewDialog.close();
    });
  }
  setupDialogBackdropClose(reviewDialog);

  if (allReviewsTrigger) {
    allReviewsTrigger.addEventListener('click', function () {
      showToast('На данный момент все 48 отзывов проверены службой контроля качества «ЮрГарант».');
    });
  }

  // Interactive 5-Star picker
  if (starsContainer) {
    const stars = starsContainer.querySelectorAll('.star');
    stars.forEach(function (star, index) {
      star.addEventListener('click', function () {
        stars.forEach(function (s, i) {
          if (i <= index) {
            s.classList.add('selected');
          } else {
            s.classList.remove('selected');
          }
        });
      });
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const author = document.getElementById('reviewAuthor').value.trim();
      reviewDialog.close();
      reviewForm.reset();
      showToast('Спасибо за отзыв' + (author ? ', ' + author : '') + '! Он будет опубликован после проверки модератором.');
    });
  }

  // --- Lawyer Profile Dialog ---
  const lawyerDialog = document.getElementById('lawyerDialog');
  const closeLawyerBtn = document.getElementById('closeLawyerBtn');
  const lawyerProfileContent = document.getElementById('lawyerProfileContent');

  const lawyerProfiles = {
    goryunova: {
      name: 'Горюнова Полина Алексеевна',
      role: 'Управляющий партнер, международное и корпоративное право',
      photo: 'images/about/1.webp',
      exp: '14 лет успешной практики',
      edu: 'МГУ им. М.В. Ломоносова, Юридический факультет (с отличием)',
      cases: 'Более 340 выигранных арбитражных споров, сопровождение внешнеторговых контрактов на сумму свыше 120 млн $.'
    },
    mironov: {
      name: 'Миронов Александр Германович',
      role: 'Ведущий адвокат по банкротству и банковским спорам',
      photo: 'images/about/2.webp',
      exp: '12 лет практического стажа',
      edu: 'Московский государственный юридический университет им. О.Е. Кутафина (МГЮА)',
      cases: 'Свыше 210 успешно завершенных процедур банкротства физлиц и ИП. Списано более 620 млн рублей задолженностей.'
    },
    shestakova: {
      name: 'Шестакова Елизавета Егоровна',
      role: 'Старший юрисконсульт по недвижимости и градостроительству',
      photo: 'images/about/3.webp',
      exp: '10 лет юридического стажа',
      edu: 'Санкт-Петербургский государственный университет (СПбГУ)',
      cases: '280+ успешно закрытых сделок купли-продажи коммерческих объектов и судебных признаний прав собственности.'
    },
    vasiliev: {
      name: 'Васильев Дмитрий Николаевич',
      role: 'Адвокат по защите бизнеса и арбитражным процессам',
      photo: 'images/about/4.webp',
      exp: '15 лет судебной практики',
      edu: 'Российская академия правосудия (РАП при ВС РФ)',
      cases: 'Успешная защита собственников от субсидиарной ответственности и прекращение 45+ дел по экономическим спорам.'
    }
  };

  function openLawyerModal(lawyerId) {
    const profile = lawyerProfiles[lawyerId];
    if (!profile || !lawyerDialog || !lawyerProfileContent) return;

    lawyerProfileContent.innerHTML = `
      <div class="lawyer-profile-layout">
        <img class="lawyer-profile-photo" src="${profile.photo}" alt="${profile.name}" />
        <div class="lawyer-profile-details">
          <div class="lawyer-profile-header">
            <h3>${profile.name}</h3>
            <p>${profile.role}</p>
          </div>
          <div class="lawyer-profile-section">
            <h4>Стаж работы:</h4>
            <p>${profile.exp}</p>
          </div>
          <div class="lawyer-profile-section">
            <h4>Образование:</h4>
            <p>${profile.edu}</p>
          </div>
          <div class="lawyer-profile-section">
            <h4>Ключевые достижения:</h4>
            <p>${profile.cases}</p>
          </div>
          <div class="service-modal-actions" style="margin-top: 20px;">
            <button class="button" id="bookLawyerBtn" type="button">Записаться к этому юристу</button>
          </div>
        </div>
      </div>
    `;

    const bookBtn = document.getElementById('bookLawyerBtn');
    if (bookBtn) {
      bookBtn.addEventListener('click', function () {
        lawyerDialog.close();
        openConsultationModal(profile.name);
      });
    }

    lawyerDialog.showModal();
  }

  document.querySelectorAll('[data-lawyer-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const lawyerId = btn.getAttribute('data-lawyer-open');
      openLawyerModal(lawyerId);
    });
  });

  if (closeLawyerBtn && lawyerDialog) {
    closeLawyerBtn.addEventListener('click', function () { lawyerDialog.close(); });
  }
  setupDialogBackdropClose(lawyerDialog);

  // --- Certificates & Licenses Dialog ---
  const certificatesDialog = document.getElementById('certificatesDialog');
  const openCertificatesBtn = document.getElementById('openCertificatesBtn');
  const closeCertificatesBtn = document.getElementById('closeCertificatesBtn');
  const closeCertificatesActionBtn = document.getElementById('closeCertificatesActionBtn');

  if (openCertificatesBtn && certificatesDialog) {
    openCertificatesBtn.addEventListener('click', function () {
      certificatesDialog.showModal();
    });
  }
  if (closeCertificatesBtn && certificatesDialog) {
    closeCertificatesBtn.addEventListener('click', function () { certificatesDialog.close(); });
  }
  if (closeCertificatesActionBtn && certificatesDialog) {
    closeCertificatesActionBtn.addEventListener('click', function () { certificatesDialog.close(); });
  }
  setupDialogBackdropClose(certificatesDialog);

  // --- Article Preview Dialog ---
  const articleDialog = document.getElementById('articleDialog');
  const closeArticleBtn = document.getElementById('closeArticleBtn');
  const articleModalTitle = document.getElementById('articleModalTitle');
  const articleModalDate = document.getElementById('articleModalDate');
  const articleModalLead = document.getElementById('articleModalLead');
  const articleConsultBtn = document.getElementById('articleConsultBtn');

  let activeArticleTopic = '';

  document.querySelectorAll('.new__item').forEach(function (item) {
    item.addEventListener('click', function () {
      if (!articleDialog) return;
      activeArticleTopic = item.getAttribute('data-title') || 'Юридическая статья';
      const date = item.getAttribute('data-date') || '';
      const summary = item.getAttribute('data-summary') || '';

      if (articleModalTitle) articleModalTitle.textContent = activeArticleTopic;
      if (articleModalDate) articleModalDate.textContent = date;
      if (articleModalLead) articleModalLead.textContent = summary;

      articleDialog.showModal();
    });
  });

  if (closeArticleBtn && articleDialog) {
    closeArticleBtn.addEventListener('click', function () { articleDialog.close(); });
  }
  setupDialogBackdropClose(articleDialog);

  if (articleConsultBtn) {
    articleConsultBtn.addEventListener('click', function () {
      articleDialog.close();
      openConsultationModal(activeArticleTopic);
    });
  }

  // --- Privacy Policy trigger ---
  const privacyPolicyLink = document.getElementById('privacyPolicyLink');
  if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Компания «ЮрГарант» осуществляет обработку персональных данных строго по 152-ФЗ РФ и соглашению об адвокатской тайне.');
    });
  }

  // =========================================================================
  // 7. Back to Top Button
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 380) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 8. Swiper Sliders Initialization
  // =========================================================================
  if (typeof Swiper !== 'undefined') {
    new Swiper('.services__slider .swiper-container', {
      slidesPerView: 1.15,
      spaceBetween: 16,
      autoHeight: true,
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });

    new Swiper('.about__slider .swiper-container', {
      spaceBetween: 24,
      autoHeight: false,
      breakpoints: {
        310: {
          slidesPerView: 1.15,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 24
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      }
    });

    new Swiper('.reviews__slider .swiper-container', {
      spaceBetween: 24,
      autoHeight: false,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1.3,
          spaceBetween: 24
        },
        1100: {
          slidesPerView: 2,
          spaceBetween: 24
        }
      },
      navigation: {
        nextEl: '.reviews-button-next',
        prevEl: '.reviews-button-prev'
      }
    });

    new Swiper('.news__slider .swiper-container', {
      spaceBetween: 24,
      autoHeight: true,
      breakpoints: {
        320: {
          slidesPerView: 1.15,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 24
        },
        1100: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
  }
});
