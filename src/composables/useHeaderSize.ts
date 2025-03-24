
export function useHeaderSize(): globalThis.Ref<number>{
  const headerHeight = ref<number>(0)

  const elm = ref<HTMLElement | null>(null)

  const onResize = ():void => {
    headerHeight.value = elm.value?.offsetHeight ?? 50
  }

  onMounted(() => {
    elm.value = document.querySelector('.site-header')
    onResize()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return headerHeight
}
