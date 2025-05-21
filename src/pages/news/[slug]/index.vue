<script setup lang="ts">
import { useLinkClickHandler } from '@/composables/useLinkClickHandler';
import { useSeoDescription } from '@/composables/useSeoDescription';
// import { decodeHTMLEntities } from '@/composables/decodeHTMLEntities'
const {locale} = useI18n()

const config = useRuntimeConfig()
const route = useRoute()
const _slug = route.params.slug; //Number(route.params.slug)
let langApi = config.public.wpApiKey
let pageApi = config.public.siteUrl
const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  pageApi = config.public.siteUrl+'/en'
}
const _rest_url = `${langApi}/posts?slug=${_slug}`
const _page_url = `${pageApi}/news/${_slug}`

type Post = {
  title:{
    rendered:string;
  },
  content:{
    rendered:string
  },
  thumbnail:{
    url:string;
  }
  categories_info: Array<{id:string,name:string}>,
  tax_info:Array<{id:string, name:string, slug:string}>
}

const {data: _post, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
const wrap = ref<HTMLDivElement | null>(null)


onMounted(() => {

if(_post.value){
  const description = useSeoDescription(_post.value[0])
  const imgUrl = _post.value[0].thumbnail.url || `${config.public.siteUrl}/_nuxt/assets/images/img_def.png`
  const pageTitle = _post.value[0].title.rendered//decodeHTMLEntities(_post.value[0].title.rendered)
  useHead({
  title:`${pageTitle} | ${config.public.siteTitle}`,
  meta: [
    { name: 'description',content: description},
    {property: 'og:description',content: description},
    {property: 'og:image',content:imgUrl },
    {property: 'og:url',content: _page_url},
    {property: 'og:title',content: pageTitle},
    {property: 'og:type',content: 'article'},
    {property: 'twitter:title',content: pageTitle},
    {property: 'twitter:description',content: description}
  ]
  })
}

  // console.log(_post)
  stClass.value = {type:"single",cls:"news",lng:locale.value}
  
  if(wrap){
    if (_post.value && _post.value.length > 0) {
    const _cats = _post.value[0].categories_info
    if(_cats){
      const catList = wrap.value?.querySelector('.catListContainer')
      const catContainer = wrap.value?.querySelector('.catContainer')
      if(catList && catContainer){
        catContainer.append(catList)
      }
    }
  }
  }

  useLinkClickHandler()
  
})
</script>

<template>
  <div ref="wrap" v-if="_post && _post[0]">
    <div v-html="_post[0].content.rendered"></div>
    <div class="catListContainer">
      <ul class="catList u_d_fl">
        <li class="catList-item" v-for="cat in _post[0].categories_info" :key="cat.id">
          <NuxtLinkLocale :to="`/news/category/${cat.id}`">
            {{ cat.name }}
          </NuxtLinkLocale>
        </li>
        <template v-if="_post[0]['tax_info']">
          <li class="catList-item" v-for="tp in _post[0]['tax_info']" :key="tp.id">
          <NuxtLinkLocale :to="`/news/font-type/${tp.id}`">
            {{ tp.name }}
          </NuxtLinkLocale>
        </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
