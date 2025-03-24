<script setup lang="ts">
import type { Post } from '../../../../types/type'

const config = useRuntimeConfig()
const {locale,t} = useI18n()
const route = useRoute()
const _id = String(route.params.cat_id); 
let langApi = config.public.wpApiKey
const stClass = changeClass();
const _perPage = config.public.postsPerPage
const _numPage:number = config.public.pagerNumPage //pager max
const _current = 1

const catName = ref<string>('')

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}
const _limit =  ref(1)
const _postType = "story"
const _totalItems = ref<string>('');
const _posts = ref(null); 
const _error = ref(null)

// const _rest_url = `${langApi}/story?scene=${_id}&context=embed`
let _params = ref(`font-type=${_id}&per_page=${_perPage}&page=${_current}&context=embed`)


const fetchData = async () => {

const apiUrl = computed(() => {
  return `${langApi}/story?${_params.value}`;
});


try {
  const response = await fetch(apiUrl.value, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
    },
  });

  const headers = response.headers;
  if (_totalItems !== null) {
  _totalItems.value = headers.get('x-wp-total') as string;
  // console.log('x-wp-total:', _totalItems.value);

  _posts.value = await response.json();

  _limit.value = Math.ceil(Number(_totalItems.value) / _perPage)
  }
  // console.log('Response Data:', _posts.value);
} catch (error:any) {
  _error.value = error
  console.error('Error fetching data:', error);
}

};


watch(()=> catName.value, (newCatName) => {
  // console.log(newCatName)
    useHead({
  title:`${newCatName} | ${config.public.siteTitle}`
  })
  })

onMounted(() => {
  stClass.value = {type:"archive",cls:"story scene tax",lng:locale.value}
  // console.log(_posts)
  fetchData();
})
</script>
<template>
<section class="sec_story sec">
    <div class="sec__inner">
      <div class="page__header">
        <h2 class="sec-ttl"><NuxtLinkLocale :to="`/story`">{{ t('story') }}</NuxtLinkLocale> / <span v-html="catName"></span></h2>
        <Select type="story" taxtype="font_type" :catid="_id" v-model="catName" />
      </div>
      <div v-if="_posts">
        <PostsList :posts="_posts" type="story" />
      </div>
      <div v-if="_error">
        <p>{{ _error }}</p>
      </div>
    </div>
    <Pagination :numPages="_numPage" :current="_current" :total="_limit" :urlSlug="`${_postType}/font-type/${_id}`" />
  </section>
</template>
<style scoped lang="scss">
</style>
