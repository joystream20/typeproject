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
  title:{
    rendered:string
  }
  content:{
    rendered:string
  }
}

const {data:_page, status: _status, error:_error} = await useFetch<Post[]>(`${langApi}/pages/?slug=support`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
  useHead({
  title:`${t('support')} | ${config.public.siteTitle}`
})



onMounted(() => {
  stClass.value = {type:"page",cls:"support",lng:locale.value}
  useLinkClickHandler()
})
</script>

<template>
<div v-if="_page && _page[0]">
  <div class="alignfull">
    <div class="page__header">
      <h1 class="page__header-ttl u_f_bd u_tl_ct">{{ _page[0].title.rendered }}</h1>
    </div>
  </div>
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
