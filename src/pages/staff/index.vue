<script setup lang="ts">
const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey
let pageApi = config.public.siteUrl

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  pageApi = config.public.siteUrl+'/en'
}

const _page_url = `${pageApi}/staff`

type Post = {
  thumbnail:{
    url:string,
    url_f:string
  },
  title:{
    rendered:string;
  }
  content:{
    rendered:string
  }
}

const {data:_page, status: _status, error:_error} = await useFetch<Post[]>(`${langApi}/pages/?slug=staff`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
  if(_page.value){
    const description = useSeoDescription(_page.value[0])
    const imgUrl = _page.value[0].thumbnail.url || `${config.public.siteUrl}/_nuxt/assets/images/img_def.png`
    useHead({
      title:`${t('staff')} | ${config.public.siteTitle}`,
      meta: [
        { name: 'description',content: description},
        {property: 'og:description',content: description},
        {property: 'og:image',content:imgUrl },
        {property: 'og:url',content: _page_url},
        {property: 'og:title',content: _page.value[0].title.rendered},
        {property: 'og:type',content: 'article'},
        {property: 'twitter:title',content: _page.value[0].title.rendered},
        {property: 'twitter:description',content: description}
      ]
    })
  }
onMounted(() => {
  stClass.value = {type:"page",cls:"staff",lng:locale.value}
})
</script>

<template>
<div v-if="_page && _page[0]">
  <div class="alignfull" v-if="_page[0].thumbnail">
    <div class="heroImage">
      <h1 class="page-ttl">{{ _page[0].title.rendered }}</h1>
      <NuxtImg :src="`${_page[0].thumbnail.url_f}.webp`" alt="" loading="lazy" format="webp" preload />
    </div>
  </div>
  <PageNav current="staff" />
  <div v-if="_page" class="pogeContainer" v-html="_page[0].content.rendered"></div>
</div>
</template>

<style scoped lang="scss">
.heroImage{
  // aspect-ratio:1/.38;
  img{
    object-fit: cover;
    width:100%;
    height:100%;
  }
}
</style>
