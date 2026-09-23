document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__menu');

  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      if (menu) menu.classList.toggle('active');
      document.body.classList.toggle('lock');
    });
  }

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
});
