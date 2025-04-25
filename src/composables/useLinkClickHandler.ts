import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useLinkClickHandler = (): void => {
  const router = useRouter()

  // onMounted(() => {
    // console.log('useLinkClick onMounted')
    const links = document.querySelectorAll<HTMLElement>('._nuxtLink')

    links.forEach(link => {
      
      const href = link.getAttribute('href')
      // console.log(router,href)
      if (href) {
        link.addEventListener('click', (event: MouseEvent) => {
          event.preventDefault() 
          // console.log(href)
          router.push(router.resolve(href).href) 
        })
      }
    })

    const links_a = document.querySelectorAll<HTMLElement>('._nuxtLink_a')

    links_a.forEach(link_a => {

      const _a = link_a.querySelector('a');
      
      if(_a){
        const href_a = _a.getAttribute('href')
        // console.log(router,href)
        if (href_a) {
         
          _a.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault() 
            // console.log(href)
            router.push(router.resolve(href_a).href) 
          })
        }
      }


    })
  // })
}
