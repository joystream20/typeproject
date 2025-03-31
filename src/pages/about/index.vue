<script setup lang="ts">
import { useLinkClickHandler } from '@/composables/useLinkClickHandler';

const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

type Post = {
  thumbnail:{
    url:string,
    url_f:string
  }
  title:{
    rendered:string
  }
  content:{
    rendered:string
  }
}

const {data:_page, status: _status, error:_error} = await useFetch<Post[]>(`${langApi}/pages/?slug=about`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
  useHead({
  title:`${t('about')} | ${config.public.siteTitle}`
})



onMounted(() => {
  stClass.value = {type:"page",cls:"about",lng:locale.value}
  useLinkClickHandler()
})
</script>

<template>
<div v-if="_page && _page[0]">
  <div class="alignfull" v-if="_page[0].thumbnail">
    <div class="heroImage">
      <h1 class="page-ttl">{{ _page[0].title.rendered }}</h1>
      <NuxtImg :src="`${_page[0].thumbnail.url_f}`" loading="lazy" format="webp" alt="" preload />
    </div>
  </div>
  <PageNav current="about" />
  <div v-if="_page" class="pogeContainer" v-html="_page[0].content.rendered"></div>
</div>
</template>

<style scoped lang="scss">
.heroImage{
  img{
    object-fit: cover;
    width:100%;
    height:100%;
  }
}
</style>
