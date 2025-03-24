
interface WindowSize {
  width:number;
  height:number;
}

export function useWindowSize(): globalThis.Ref<WindowSize>{
  const windowSize = ref<WindowSize>({
    width:0,
    height:0
  })

  const onResize = ():void => {
    windowSize.value = {
      width:window.innerWidth,
      height:window.innerHeight
    }
    // console.log(windowSize)
  }

  onMounted(() => {
    onResize()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return windowSize


}

