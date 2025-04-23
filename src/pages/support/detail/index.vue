<script setup lang="ts">
import { useLinkClickHandler } from '@/composables/useLinkClickHandler';
import { useRoute } from 'vue-router'
import { useHeaderSize } from '../../../composables/useHeaderSize';

const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const stClass = changeClass();

const router = useRoute()

const {headerHeight} = useHeaderSize()

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

type Post = {
  title:{
    rendered:string
  }
  content:{
    rendered:string
  }
  acf:{
    detaillist:{
      param:string;
      header_ttl:string;
      header_txt:string;
      content:string;
    }[]
  }
}

const {data:_page, status: _status, error:_error} = await useFetch<Post[]>(`${langApi}/pages/?slug=support_detail`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
  

const matchDetail = computed(() => {
  const details = _page.value?.[0].acf.detaillist || []
  return details.find(detail => detail.param === router.query.page)
})

useHead({
  title:matchDetail.value ? `${matchDetail.value.header_ttl} | ${config.public.siteTitle}` : `${t('support')} | ${config.public.siteTitle}`
})

onMounted(async () => {
  if(router.hash){
    await nextTick()
    const el = document.querySelector(router.hash)
    if(el){
      const rect = el.getBoundingClientRect()
      // console.log(headerHeight.value)
      const scrollTarget = rect.top + window.scrollY - headerHeight.value
      window.scrollTo({top:scrollTarget, behavior:'smooth'})
      // el.scrollIntoView({behavior:'smooth'})
    }
  }
  stClass.value = {type:"page",cls:"support_detail",lng:locale.value}
  if(router.query.page && _page.value){
    // console.log(router.query.page)
    // console.log(_page.value[0].acf.detaillist)
    const dlList = document.querySelectorAll('.dlList-box')
    dlList.forEach(
      _box => {
        const box = _box as HTMLElement
        const dt = box.querySelector('dt')
        const dd = box.querySelector('dd')
        
        if(dd){
        dt?.addEventListener('click', (e) => {
          if(box.classList.contains('on')){
            box.classList.remove('on')
            dd.style.maxHeight = "0"
          }else{
            box.classList.add('on')
            const inner = dd?.querySelector('.inner') as HTMLElement
            if(inner){
              const innerHeight = inner.offsetHeight
              dd.style.maxHeight = `${innerHeight}px`
            }
            
          }
        })
      }

      }
    )
  }
  

  useLinkClickHandler()
})
</script>

<template>
<div v-if="_page && _page[0]">
  <!-- <div class="alignfull">
    <h1 class="page-ttl u_f_bd u_tl_ct">{{ _page[0].title.rendered }}</h1>
  </div> -->
  
  <div v-if="matchDetail" class="pageContainer" :class="router.query.page">
    <div class="pageContainer__inner">
      <section class="contentList-item item">
        <header class="item__header">
          <p class="back">
            <NuxtLinkLocale :to="{name: 'support'}">
            <font-awesome :icon="['fas', 'turn-up']" /><span class="txt">{{t('backToSupport')}}</span>
          </NuxtLinkLocale>
          </p>
          <h1 class="item__header-ttl u_f_bd">{{ matchDetail.header_ttl }}</h1>
          <p v-if="matchDetail.header_txt" class="item__header-txt">
            <span v-html="matchDetail.header_txt"></span>
          </p>
        </header>
        <div class="item__container" v-html="matchDetail.content"></div>
      </section>
    </div>
    
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
