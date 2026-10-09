document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Navigation ---
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__menu');

  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      if (menu) menu.classList.toggle('active');
      document.body.classList.toggle('lock');
    });

    document.querySelectorAll('.menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('active');
        if (menu) menu.classList.remove('active');
        document.body.classList.remove('lock');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('active')) {
        burger.classList.remove('active');
        if (menu) menu.classList.remove('active');
        document.body.classList.remove('lock');
      }
    });
  }

  // --- Sticky / Scrolled Header ---
  const header = document.querySelector('.header');
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

  // --- Active Nav Link on Scroll ---
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

  // --- Hero Slider Interactive Text ---
  const heroSubtitle = document.querySelector('.intro__subtitle');
  const heroTitle = document.querySelector('.intro__title');
  const heroText = document.querySelector('.intro__text');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');

  const heroSlides = [
    {
      subtitle: 'Мы предлагаем полный спектр юридических услуг',
      title: 'Правовой Компас',
      text: 'Профессиональная помощь по любым правовым вопросам. Наша команда опытных юристов готова поддержать вас на каждом этапе, обеспечивая качественное сопровождение и надежную защиту ваших интересов. Мы работаем, чтобы вы могли быть уверены в завтрашнем дне!'
    },
    {
      subtitle: 'Комплексная защита бизнеса и корпоративных интересов',
      title: 'Надежный Щит',
      text: 'Юридический консалтинг, арбитражная практика, защита интеллектуальной собственности и сопровождение сделок. Минимизируем риски и обеспечиваем безопасность ваших инвестиций.'
    },
    {
      subtitle: 'Правовая безопасность граждан и семейных споров',
      title: 'Честность и Опыт',
      text: 'Сделки с недвижимостью, защита прав потребителей, наследственные дела и процедура банкротства. Индивидуальный подход и абсолютная конфиденциальность для каждого доверителя.'
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

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Consultation Dialog & Toast Notice ---
  const consultationDialog = document.getElementById('consultationDialog');
  const openHeaderBtn = document.getElementById('openConsultationHeader');
  const openFooterBtn = document.getElementById('openConsultationFooter');
  const closeConsultationBtn = document.getElementById('closeConsultationBtn');
  const consultationForm = document.getElementById('consultationForm');
  const toastNotice = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(function () {
      toastNotice.classList.remove('show');
    }, 4000);
  }

  function openDialog() {
    if (!consultationDialog) return;
    consultationDialog.showModal();
  }

  function closeDialog() {
    if (!consultationDialog) return;
    consultationDialog.close();
  }

  if (openHeaderBtn) openHeaderBtn.addEventListener('click', openDialog);
  if (openFooterBtn) openFooterBtn.addEventListener('click', openDialog);
  if (closeConsultationBtn) closeConsultationBtn.addEventListener('click', closeDialog);

  if (consultationDialog) {
    consultationDialog.addEventListener('click', function (e) {
      const rect = consultationDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDialog();
      }
    });
  }

  if (consultationForm) {
    consultationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('clientName');
      const nameVal = nameInput ? nameInput.value.trim() : '';
      closeDialog();
      consultationForm.reset();
      showToast('Спасибо за заявку' + (nameVal ? ', ' + nameVal : '') + '! Дежурный юрист перезвонит вам в течение 10 минут.');
    });
  }

  // --- Swiper Sliders Initialization ---
  if (typeof Swiper !== 'undefined') {
    new Swiper('.services__slider .swiper-container', {
      slidesPerView: 1.15,
      spaceBetween: 16,
      autoHeight: true,
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });

    new Swiper('.about__slider .swiper-container', {
      spaceBetween: 24,
      autoHeight: true,
      breakpoints: {
        310: {
          slidesPerView: 1.15,
          spaceBetween: 24,
        },
        932: {
          slidesPerView: 2.5,
        },
        1289: {
          slidesPerView: 4,
        },
      },
    });

    new Swiper('.reviews__slider .swiper-container', {
      spaceBetween: 24,
      autoHeight: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        750: {
          slidesPerView: 1.3,
        },
        1289: {
          slidesPerView: 2,
        },
      },
      navigation: {
        nextEl: '.reviews-button-next',
        prevEl: '.reviews-button-prev',
      },
    });

    new Swiper('.news__slider .swiper-container', {
      spaceBetween: 24,
      autoHeight: true,
      breakpoints: {
        320: {
          slidesPerView: 1.2,
        },
        770: {
          slidesPerView: 2.2,
        },
        1295: {
          slidesPerView: 3,
        },
      },
    });
  }
});
