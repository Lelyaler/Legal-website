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
  // 2. Hero Interactive Slides with Background Transitions & Autoplay
  // =========================================================================
  const heroSection = document.getElementById('hero');
  const heroSubtitle = document.querySelector('.intro__subtitle');
  const heroTitle = document.querySelector('.intro__title');
  const heroText = document.querySelector('.intro__text');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  const heroBgSlides = document.querySelectorAll('.intro__bg-slide');
  const heroBullets = document.querySelectorAll('.intro__bullet');

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
  let heroAutoplayTimer = null;
  const HERO_AUTOPLAY_DELAY = 3000;

  function renderHeroSlide(index) {
    if (!heroTitle || !heroSubtitle || !heroText) return;
    const content = heroTitle.closest('.intro__content');
    if (content) content.style.opacity = '0.35';

    // Transition background slides
    if (heroBgSlides && heroBgSlides.length) {
      heroBgSlides.forEach(function (slide, i) {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }

    // Transition pagination bullets
    if (heroBullets && heroBullets.length) {
      heroBullets.forEach(function (bullet, i) {
        if (i === index) {
          bullet.classList.add('active');
        } else {
          bullet.classList.remove('active');
        }
      });
    }

    setTimeout(function () {
      const slide = heroSlides[index];
      heroSubtitle.textContent = slide.subtitle;
      heroTitle.textContent = slide.title;
      heroText.textContent = slide.text;
      if (content) content.style.opacity = '1';
    }, 180);
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroAutoplayTimer = setInterval(function () {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      renderHeroSlide(currentHeroSlide);
    }, HERO_AUTOPLAY_DELAY);
  }

  function stopHeroAutoplay() {
    if (heroAutoplayTimer) {
      clearInterval(heroAutoplayTimer);
      heroAutoplayTimer = null;
    }
  }

  function goToHeroSlide(index) {
    currentHeroSlide = index;
    renderHeroSlide(currentHeroSlide);
    startHeroAutoplay();
  }

  if (heroPrevBtn && heroNextBtn) {
    heroPrevBtn.addEventListener('click', function () {
      const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
      goToHeroSlide(prevIndex);
    });

    heroNextBtn.addEventListener('click', function () {
      const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
      goToHeroSlide(nextIndex);
    });
  }

  // Allow clicking on bullets directly
  if (heroBullets && heroBullets.length) {
    heroBullets.forEach(function (bullet, index) {
      bullet.addEventListener('click', function () {
        goToHeroSlide(index);
      });
    });
  }

  // Start autoplay initially
  startHeroAutoplay();

  // Pause on hover, resume on mouse leave
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopHeroAutoplay);
    heroSection.addEventListener('mouseleave', startHeroAutoplay);
  }

  // Pause when page is not visible
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopHeroAutoplay();
    } else {
      startHeroAutoplay();
    }
  });

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
  const burgerConsultationBtn = document.getElementById('burgerConsultationBtn');
  if (burgerConsultationBtn) {
    burgerConsultationBtn.addEventListener('click', function () {
      if (burger) burger.classList.remove('active');
      if (menu) menu.classList.remove('active');
      document.body.classList.remove('lock');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      openConsultationModal('Срочная консультация');
    });
  }
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

  // --- All Reviews Modal Dialog ---
  const allReviewsDialog = document.getElementById('allReviewsDialog');
  const closeAllReviewsBtn = document.getElementById('closeAllReviewsBtn');
  const writeReviewFromAllBtn = document.getElementById('writeReviewFromAllBtn');
  const allReviewsTabs = document.querySelectorAll('.all-reviews__tab');
  const allReviewsItems = document.querySelectorAll('.all-reviews__item');

  if (allReviewsTrigger && allReviewsDialog) {
    allReviewsTrigger.addEventListener('click', function () {
      allReviewsDialog.showModal();
    });
  }

  if (closeAllReviewsBtn && allReviewsDialog) {
    closeAllReviewsBtn.addEventListener('click', function () {
      allReviewsDialog.close();
    });
  }
  setupDialogBackdropClose(allReviewsDialog);

  if (writeReviewFromAllBtn && allReviewsDialog && reviewDialog) {
    writeReviewFromAllBtn.addEventListener('click', function () {
      allReviewsDialog.close();
      reviewDialog.showModal();
    });
  }

  if (allReviewsTabs && allReviewsTabs.length) {
    allReviewsTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        allReviewsTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter') || 'all';

        allReviewsItems.forEach(function (item) {
          const itemCat = item.getAttribute('data-category');
          if (filter === 'all' || itemCat === filter) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
          }
        });
      });
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
      <div class="lawyer-profile-card">
        <div class="lawyer-profile-top">
          <img class="lawyer-profile-avatar" src="${profile.photo}" alt="${profile.name}" />
          <h3 class="lawyer-profile-name">${profile.name}</h3>
          <p class="lawyer-profile-role">${profile.role}</p>
          <span class="lawyer-profile-exp">${profile.exp}</span>
        </div>
        <div class="lawyer-profile-body">
          <div class="lawyer-info-block">
            <div class="lawyer-info-label">Образование</div>
            <p class="lawyer-info-text">${profile.edu}</p>
          </div>
          <div class="lawyer-info-block">
            <div class="lawyer-info-label">Ключевые достижения</div>
            <p class="lawyer-info-text">${profile.cases}</p>
          </div>
        </div>
        <div class="lawyer-profile-footer">
          <button class="button button--submit" id="bookLawyerBtn" type="button">
            Записаться к этому юристу
          </button>
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
  const articleModalContent = document.getElementById('articleModalContent');
  const articleConsultBtn = document.getElementById('articleConsultBtn');

  const articleDetailsData = {
    'article-1': `
      <p>Корпоративные конфликты между учредителями и руководством требуют выверенных правовых шагов. Ошибки в оформлении протоколов собраний или поспешные изменения в ЕГРЮЛ влекут риски блокировок счетов и финансовой ответственности.</p>
      <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
        <li><strong>Правовой аудит Устава и соглашений:</strong> определение полномочий участников и порядка принятия ключевых решений.</li>
        <li><strong>Предотвращение вывода активов:</strong> оперативное наложение обеспечительных мер через арбитражный суд.</li>
        <li><strong>Оспаривание неправомерных сделок:</strong> признание недействительными договоров с заинтересованностью, причинивших вред обществу.</li>
      </ul>
      <p>Адвокаты компании сопровождают споры участников на любой стадии, стремясь к подписанию взаимовыгодного мирового соглашения.</p>
    `,
    'article-2': `
      <p>Налоговые проверки часто сопровождаются требованиями об истребовании огромного массива финансовой документации. Закон предоставляет налогоплательщику действенные механизмы защиты прав и законных интересов.</p>
      <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
        <li><strong>Анализ правомерности запросов ФНС:</strong> истребование документации вне рамок налоговой проверки без указания конкретной сделки неправомерно.</li>
        <li><strong>Правовая поддержка на допросах:</strong> присутствие налогового юриста исключает психологическое давление и искажение протокола.</li>
        <li><strong>Подача мотивированных возражений:</strong> отмена необоснованных доначислений на стадии рассмотрения материалов проверки в УФНС.</li>
      </ul>
      <p>Своевременный правовой анализ требований инспекции позволяет урегулировать претензии ещё на досудебном этапе.</p>
    `,
    'article-3': `
      <p>Покупка квартиры, земельного участка или коммерческого помещения сопряжена с рисками, которые невозможно выявить одной лишь стандартной выпиской из ЕГРН. Судебная практика показывает, что защита добросовестного приобретателя требует глубокого предварительного аудита.</p>
      <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
        <li><strong>Риск банкротства продавца по 127-ФЗ:</strong> продажа объекта по заниженной стоимости в преддверии банкротства может быть оспорена финансовым управляющим в течение 3 лет.</li>
        <li><strong>Лица с бессрочным правом пользования:</strong> граждане, отказавшиеся от приватизации в пользу родственников, сохраняют право пожизненного проживания в жилье.</li>
        <li><strong>Использование материнского капитала:</strong> невыделение долей несовершеннолетним детям в цепочке сделок делает договор оспоримым в силу закона.</li>
        <li><strong>Отсутствие нотариального согласия супруга:</strong> если объект приобретался в браке, отчуждение без согласия второго супруга оставляет право оспорить сделку.</li>
        <li><strong>Скрытые судебные притязания и аресты:</strong> проверка наличия открытых исполнительных производств и имущественных споров в судах общей юрисдикции.</li>
      </ul>
      <p>Комплексная юридическая проверка недвижимости в «ЮрГарант» обеспечивает 100% безопасность расчетов и защиту права собственности.</p>
    `
  };

  let activeArticleTopic = '';

  document.querySelectorAll('.new__item').forEach(function (item) {
    item.addEventListener('click', function () {
      if (!articleDialog) return;
      const articleId = item.getAttribute('data-article-id') || '';
      activeArticleTopic = item.getAttribute('data-title') || 'Юридическая консультация';
      const date = item.getAttribute('data-date') || '';
      const summary = item.getAttribute('data-summary') || '';

      if (articleModalTitle) articleModalTitle.textContent = activeArticleTopic;
      if (articleModalDate) articleModalDate.textContent = date;
      if (articleModalLead) articleModalLead.textContent = summary;
      if (articleModalContent && articleDetailsData[articleId]) {
        articleModalContent.innerHTML = articleDetailsData[articleId];
      }

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
