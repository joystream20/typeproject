import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useLinkClickHandler = (): void => {
  const router = useRouter()

  // onMounted(() => {
    // console.log('useLinkClick onMounted')
    // ._nuxtLink クラスを持つすべてのリンクを取得
    const links = document.querySelectorAll<HTMLElement>('._nuxtLink')

    links.forEach(link => {
      
      const href = link.getAttribute('href')
      // console.log(router,href)
      if (href) {
        // リンククリック時のイベントリスナーを追加
        link.addEventListener('click', (event: MouseEvent) => {
          event.preventDefault() // デフォルトのリンク動作をキャンセル
          // console.log(href)
          router.push(router.resolve(href).href) // Nuxt のルーターで遷移
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
          // リンククリック時のイベントリスナーを追加
          _a.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault() // デフォルトのリンク動作をキャンセル
            // console.log(href)
            router.push(router.resolve(href_a).href) // Nuxt のルーターで遷移
          })
        }
      }


    })
  // })
}
