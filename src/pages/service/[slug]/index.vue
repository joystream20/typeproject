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
    const contentsList = document.querySelector('.contentsList') as HTMLElement | null
    const contentsWrap = document.querySelector('.contentsWrap') as HTMLElement | null
    const contentsListWrap = document.querySelector('.contentsListWrap') as HTMLElement | null
    console.log(contentsContainer)
    console.log(contentsList)
    console.log(contentsWrap)
    console.log(contentsListWrap)

    if(contentsContainer && contentsWrap){
      console.log('wrap')
    contentsWrap.appendChild(contentsContainer)
    
    }else{
      console.log('not found')
    }
    if(contentsList && contentsListWrap){
      console.log('wrap')
    contentsListWrap.appendChild(contentsList)
    
    }else{
      console.log('list not found')
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
    <div class="contentsListWrapCover u_pd_lr_30">
      <div class="contentsListWrap u_mx1200"></div>
    </div>
      <div class="fitfontAnimationContainer u_pd_lr_30">
        <div class="u_mx1200 wp-block-columns are-vertically-aligned-center u_fl_jc_sb is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex" style="margin-top:var(--wp--preset--spacing--70);">
            <div class="wp-block-column is-vertically-aligned-center u_mx550 _rs is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:35%">
            <div class="u_mx360">
              <h2 class="wp-block-heading has-large-font-size" style="font-style:normal;font-weight:400">フィットフォントで<br>和文と欧文の適正なバランス</h2>
              <p>市販されているフォントに使いたいウエイトがみつからない、他社とは違うフォントを使いたい。フィットフォントサービスはそんな課題を解決します。和文フォントのウエイトや字幅、コントラストやフトコロ軸を調整することで、会社の声となるフォントをお選びいただけます。また、日本語の文中で使われるアルファベットを変えること、そして和文と欧文の適正なバランスを実現することで、メッセージの印象は一変します。欧文コーポレートフォントが指定されているグローバル企業にとって、フィットフォントは最適な選択と言えます。</p>
            </div>
            </div>
            <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:62%;">
              <div style="margin-left:clamp(-21px,-4.5cqw,-48px);">
                <FitfontAnimation />
              </div>
            </div>
            </div>
      </div>
    <div class="contentsWrap"></div>
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
