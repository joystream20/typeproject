import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useLinkClickHandler = (): void => {
  const router = useRouter()

  // onMounted(() => {
    // console.log('useLinkClick onMounted')
    // ._nuxtLink クラスを持つすべてのリンクを取得
    const links = document.querySelectorAll<HTMLElement>('._nuxtLink')

    links.forEach(link => {
      // console.log(link)
      const href = link.getAttribute('href')
      if (href) {
        // リンククリック時のイベントリスナーを追加
        link.addEventListener('click', (event: MouseEvent) => {
          event.preventDefault() // デフォルトのリンク動作をキャンセル
          router.push(router.resolve(href).href) // Nuxt のルーターで遷移
        })
      }
    })
  // })
}
