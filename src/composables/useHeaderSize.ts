
export function useHeaderSize(): {
  headerHeight: Ref<number>
  onResize:() => void
}{
  const headerHeight = ref<number>(0)
  const route = useRoute()

  const elm = ref<HTMLElement | null>(null)

  const onResize = ():void => {
    headerHeight.value = elm.value?.offsetHeight ?? 50
    // console.log(headerHeight.value)
  }

  onMounted(() => {
    elm.value = document.querySelector('.site-header')
    nextTick(() => {
      onResize()
      window.addEventListener('resize', onResize)
    })
  })

  watch(
    () => route.fullPath,
    () => {
      nextTick(() => {
        onResize()
      })
    }
  )

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return {
    headerHeight,
    onResize
  }
}
