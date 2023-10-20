
 $(document).ready(function(){
     $('.burger').click(function(event){
       $('.burger,.header__menu').toggleClass('active');
       $('.body').toggleClass('lock');
     });
   });

   
   
document.addEventListener("DOMContentLoaded", function () {

   const servicesSwiper = new Swiper('.services__slider .swiper-container', {
      slidesPerView: 2,
          spaceBetween: 24,
          autoHeight: true,
   });
 
   
   const aboutSlider = new Swiper('.about__slider .swiper-container', {
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
   
            }
      }
   });
   
   
   const reviewsSlider = new Swiper('.reviews__slider .swiper-container', {
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
         }
      },
      navigation: {
         nextEl: '.reviews-button-next',
         prevEl: '.reviews-button-prev',
      },
   });


const newsSlider = new Swiper('.news__slider .swiper-container', {
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
         }
   },
});


});

