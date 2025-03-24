<script setup lang="ts">
const {locale} = useI18n()

const config = useRuntimeConfig()
const route = useRoute()
const _slug = route.params.slug; //Number(route.params.slug)
let langApi = config.public.wpApiKey
const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}
const _rest_url = `${langApi}/posts?slug=${_slug}`

type Post = {
  title:{
    rendered:string;
  },
  content:{
    rendered:string
  },
  categories_info: Array<{id:string,name:string}>,
  tax_info:Array<{id:string, name:string, slug:string}>
}

const {data: _post, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
const wrap = ref<HTMLDivElement | null>(null)

if(_post.value){
  useHead({
  title:`${_post.value[0].title.rendered} | ${config.public.siteTitle}`
  })
}

onMounted(() => {
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
