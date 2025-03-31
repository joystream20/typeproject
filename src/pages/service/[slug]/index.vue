<script setup lang="ts">

import { useLinkClickHandler } from '@/composables/useLinkClickHandler';
const {locale,t} = useI18n()

const config = useRuntimeConfig()
const route = useRoute()
const _slug = route.params.slug;
let langApi = config.public.wpApiKey
const stClass = changeClass();


import Swiper from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
// import { SwiperOptions } from "swiper";
const modules = [Pagination, Autoplay, Navigation]//[Autoplay]

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}
const _rest_url = `${langApi}/service?slug=${_slug}`
type Post = {
  title:{
    rendered:string;
  },
  content: {
    rendered: string;
  },
  acf:{
    specimen:string;
    support:HTMLElement
  }
}
const {data: _post, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }

  if(_post.value){
  useHead({
  title:`${_post.value[0].title.rendered} | ${config.public.siteTitle}`
  })
  }
  


onMounted(() => {
  stClass.value = {type:"single",cls:"service",lng:locale.value}
  // console.log(_post)

  if(_slug === "goods"){
    const swiperContainers = document.querySelectorAll('.swiperContainer');
    // const sw_array = []
    
    
    let sw_cnt:number = 1
    swiperContainers.forEach(
      _swc => {
        const _sw = _swc.querySelector('.swiper') as HTMLElement;
        _sw?.classList.add(`swp${sw_cnt}`)
        if(_sw?.querySelectorAll('.swiper-slide').length > 1){
          let _swObj = {
            modules:modules,
            speed: 1000,
            loop:true,
            // spaceBetween: 40,
            allowTouchMove: true,
            slidesPerView:1,
            // autoplay:{
            //   delay:2000,disableOnInteraction:false
            // },
            pagination: {
              el: `.swp${sw_cnt} .swiper-pagination`,
              type: 'bullets',
              clickable: true
            } as const
          }
          const _swp = new Swiper(`.swp${sw_cnt}`,_swObj)
        }

        sw_cnt++
      }
    )
  }
  if(_slug === "fitfont"){
    const initFitfont = async () => {
      await nextTick()
      
    // const contentsWrap = ref<HTMLElement | null>(null)
    const contentsContainer = document.querySelector('.contentsContainer') as HTMLElement | null
    const contentsWrap = document.querySelector('.contentsWrap') as HTMLElement | null
    console.log(contentsContainer)
    console.log(contentsWrap)

    if(contentsContainer && contentsWrap){
      console.log('wrap')
    contentsWrap.appendChild(contentsContainer)
    
    }else{
      console.log('not found')
    }
  }

  initFitfont()

  }

  useLinkClickHandler()

})
</script>

<template>
<div v-if="_post && _post[0]">
  <div v-html="_post[0].content.rendered"></div>
  <div v-if="_slug === 'fitfont'">
    <FitfontSimulator />
    <div class="contentsWrap" ref="contentsWrap"></div>
    <InterviewList taxonomy="interview_category" term="fitfont" />
    <DevelopmentStory taxonomy="story_category" term="fitfont" />
  </div>
  <div v-else-if="_slug === 'tpconnect'">
    <FontsAllList :specimen="_post[0].acf.specimen" />
    <FontInUseList />
  </div>
  <div v-html="_post[0].acf.support"></div>
</div>
</template>

<style lang="scss" scoped>
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;


</style>
