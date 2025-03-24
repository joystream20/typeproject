<script setup lang="ts">
import type { Post } from '../../../types/type'
const config = useRuntimeConfig()
const route = useRoute()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const _perPage = config.public.postsPerPage
const _numPage:number = config.public.pagerNumPage //pager max
const _current:number = Number(route.params.id || 1)
const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}
const _limit =  ref(1)
const _postType = "interviews"
const _totalItems = ref<string>('');
const _posts = ref(null); 
const _error = ref(null)
let _params = ref(`per_page=${_perPage}&page=${_current}&context=embed`)


const fetchData = async () => {

  const apiUrl = computed(() => {
      return `${langApi}/interviews?${_params.value}`;
    });

  try {
    const response = await fetch(apiUrl.value, {
      method: 'GET', 
      headers: {
        'Accept': 'application/json',
      },
    });

    const headers = response.headers;
    if(_totalItems !== null){
      _totalItems.value = headers.get('x-wp-total') as string;
      // console.log('x-wp-total:', _totalItems.value);
      _posts.value = await response.json();
      _limit.value = Math.ceil(Number(_totalItems.value )/ _perPage)
    }
  } catch (error:any) {
    _error.value = error
    console.error('Error fetching data:', error);
  }
};

  useHead({
    title:`${t('interview')} | ${config.public.siteTitle}`
  })
onMounted(() => {
  stClass.value = {type:"archive",cls:"interviews",lng:locale.value}
  // _totalNum.value = _interviews.value[0].allPostsNum
  // console.log(_posts)
  fetchData();
})
</script>

<template>
<section class="sec_interview sec">
    <div class="sec__inner">
      <div class="page__header">
        <h2 class="sec-ttl">{{ t('interview') }}</h2>
        <Select type="interviews" />
      </div>
      <div v-if="_posts">
        <PostsList :posts="_posts" type="interviews" />
      </div>
      <div v-if="_error">
        <p>{{ _error }}</p>
      </div>
    </div>
    <Pagination :numPages="_numPage" :current="_current" :total="_limit" :urlSlug="_postType" />
  </section>
  
</template>

<style scoped lang="scss">
</style>
