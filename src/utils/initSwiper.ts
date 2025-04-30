import { nextTick } from "vue";

export const initSwiper = async () => {
  const { default: Swiper } = await import('swiper')
  await import('swiper/css')
  await import('swiper/css/pagination')
  await import('swiper/css/navigation')
  await import('swiper/css/effect-fade')

  const { Autoplay, Pagination, Navigation, EffectFade } = await import('swiper/modules')

  await nextTick() 

  const els = document.querySelectorAll('.swiper') as NodeListOf<HTMLElement>
  if (els) {
    els.forEach(
      el => {

        new Swiper(el, {
          modules: [Autoplay, Pagination, Navigation, EffectFade],
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          autoplay: {
            delay: 5000,
          },
          speed:1000,
          effect:'fade'
        })

      }
    )
    
  } else {
    console.warn('Swiper element not found')
  }
}
