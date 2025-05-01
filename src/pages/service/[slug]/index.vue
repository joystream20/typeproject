<script setup lang="ts">

import { useLinkClickHandler } from '@/composables/useLinkClickHandler';
const {locale,t} = useI18n()

const config = useRuntimeConfig()
const route = useRoute()
const _slug = route.params.slug;
let langApi = config.public.wpApiKey
let pageApi = config.public.siteUrl
const stClass = changeClass();


import Swiper from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
// import { SwiperOptions } from "swiper";
const modules = [Pagination, Autoplay, Navigation]//[Autoplay]

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  pageApi = config.public.siteUrl+'/en'
}
const _rest_url = `${langApi}/service?slug=${_slug}`
const _page_url = `${pageApi}/service/${_slug}`

type Post = {
  title:{
    rendered:string;
  },
  content: {
    rendered: string;
  },
  thumbnail: {
    url:string;
  }
  acf:{
    specimen:string;
    support:HTMLElement;
    useList?:{
      image:string;
      text:string;
      url:string;
      blank:boolean;
    }[];
    usagelist?:{
      ID:string;
    post_title:string;
    post_name:string;
    thumbnail:{url:string;url_f:string};
    post_type:string;
    tax_info:{
      slug:string;
      label:string;
      terms:{
        term_id:number;
        name:string;
        slug:string;
        taxonomy:string;
      }[]
    }[];
    category:{
      term_id:number;
      name:string;
      slug:string;
    }[];
    }[];
  }
}
const {data: _post, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }

  if(_post.value){
    const description = useSeoDescription(_post.value[0])
    const imgUrl = _post.value[0].thumbnail.url || `${config.public.siteUrl}/_nuxt/assets/images/img_def.png`
    useHead({
    title:`${_post.value[0].title.rendered} | ${config.public.siteTitle}`,
    meta: [
        { name: 'description',content: description},
        {property: 'og:description',content: description},
        {property: 'og:image',content:imgUrl },
        {property: 'og:url',content: _page_url},
        {property: 'og:title',content: _post.value[0].title.rendered},
        {property: 'og:type',content: 'article'},
        {property: 'twitter:title',content: _post.value[0].title.rendered},
        {property: 'twitter:description',content: description}
      ]
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
    // console.log(contentsContainer)
    // console.log(contentsList)
    // console.log(contentsWrap)
    // console.log(contentsListWrap)

    if(contentsContainer && contentsWrap){
      // console.log('wrap')
    contentsWrap.appendChild(contentsContainer)
    
    }else{
      // console.log('not found')
    }
    if(contentsList && contentsListWrap){
      // console.log('wrap')
    contentsListWrap.appendChild(contentsList)
    
    }else{
      // console.log('list not found')
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
            <div v-if="locale === 'en'" class="u_mx360">
              <h2 class="wp-block-heading has-large-font-size " style="font-style:normal;font-weight:400">Proper balance between <br>Japanese and Latin font by FitFont</h2>
              <p class="u_mt1_e">Maybe there’s no font on the market available in the weight you are looking for, or you want a font that’s different from what other companies are using. FitFont Service has been developed to respond to such needs. You can choose a font to be the voice of your company by adjusting the weight, width, contrast or space b/w strokes of AXIS Font, TP Mincho or TP Sky. By altering the alphabetic characters used in Japanese-language content situations and realizing a proper balance of Japanese and Latin font, you can completely transform the impression created by your company’s message. FitFont Service enables you to realize the best combination of characters by adjusting AXIS Font, TP Mincho or TP Sky to fit a given Latin font. For global-scale enterprises that specify the use of Latin corporate fonts, FitFont may be the perfect solution.</p>
            </div>
            <div v-else class="u_mx360">
              <h2 class="wp-block-heading has-large-font-size" style="font-style:normal;font-weight:400">フィットフォントで<br>和文と欧文の適正なバランス</h2>
              <p class="u_mt1_e">市販されているフォントに使いたいウエイトがみつからない、他社とは違うフォントを使いたい。フィットフォントサービスはそんな課題を解決します。和文フォントのウエイトや字幅、コントラストやフトコロ軸を調整することで、会社の声となるフォントをお選びいただけます。また、日本語の文中で使われるアルファベットを変えること、そして和文と欧文の適正なバランスを実現することで、メッセージの印象は一変します。欧文コーポレートフォントが指定されているグローバル企業にとって、フィットフォントは最適な選択と言えます。</p>
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
    <InterviewList taxonomy="interview_category" term="fitfont" max="6" />
    
    <DevelopmentStory taxonomy="story_category" term="fitfont" />
  </div>
  <div v-else-if="_slug === 'tpconnect'">
    <FontsAllList :specimen="_post[0].acf.specimen" />
    <FontInUseList />
  </div>
  <div v-html="_post[0].acf.support"></div>

  <!-- <section v-if="_post[0].acf.useList && _post[0].acf.useList.length > 0" class="usageList u_mx1300 has-global-padding sec">
    <div class="sec__inner">
      
      <ul class="postList">
        <li class="postList-item" v-for="(child, index) of _post[0].acf.useList" :key="index">
          <template v-if="child.blank"> 
            
              <div class="image">
                <a :href="`${child.url}`" target="_blank">
                <NuxtImg v-if="child.image" :src="child.image" :alt="child.text"  />
                <img v-else src="@/assets/images/img_def.png" alt="">
              </a>
              </div>
              <div class="txtContainer">
                <p class="ttl" v-html="child.text"></p>
              </div>
            
          </template>
          <template v-else>
           
              <div class="image">
                <NuxtLink :to="`${child.url}`">
                <NuxtImg v-if="child.image" :src="child.image" :alt="child.text.replace(/<br\s*\/?>/gi, '')" />
                <img v-else src="@/assets/images/img_def.png" alt="" />
              </NuxtLink>
              </div>
              <div class="txtContainer">
                <p class="ttl" v-html="child.text"></p>
              </div>
            
          </template>
          
        </li>
      </ul>
      
      
    </div>
  </section> -->
  <section v-if="_post[0].acf.usagelist && _post[0].acf.usagelist.length > 0" class="sec_usage u_mx1300 has-global-padding sec">
  <div class="sec__inner">
    <header class="sec__header _wbt">
          <h2 class="sec__header-ttl">{{ t('case') }}</h2>
        </header>
    <PostListAcf :posts="_post[0].acf.usagelist ?? []" />
  </div>
</section>
</div>
</template>

<style lang="scss" scoped>
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;

.sec{
  margin-top:5em;
}
</style>
