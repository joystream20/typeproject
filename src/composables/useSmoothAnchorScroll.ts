export const useSmoothAnchorScroll = (rootSelector = '') => {
  const { headerHeight } = useHeaderSize()
  const handleSmoothScroll = async (e:Event) => {
    // console.log(e.target)
    await nextTick();
    const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement
    if(!target) return

    const id = target.getAttribute('href')?.slice(1)

    if(!id) return

    const el = document.getElementById(id)
    // console.log(el)

    if(el){
      e.preventDefault()
      // el.scrollIntoView({behavior:'smooth'})
      const _y = el.getBoundingClientRect().top + window.scrollY - headerHeight.value
      // window.scrollTo({top:_y, behavior:'instant'})
      window.scrollTo({top:_y, behavior:'smooth'})
      // setTimeout(() => {
      //   window.scrollTo({top:_y, behavior:'smooth'})
      // },50)
     
    }
  }

  const bindSmoothScroll = () => {
    const root = rootSelector ? document.querySelector(rootSelector) : document
    root?.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click',handleSmoothScroll)
    })
  }

  return {
    bindSmoothScroll
  }
}

