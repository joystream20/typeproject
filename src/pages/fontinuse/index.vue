<script setup lang="ts">
const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const _perPage = config.public.postsPerPage
const _numPage:number = config.public.pagerNumPage //pager max
const _current = 1

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

const _limit =  ref(1)
const _postType = "fontinuse"
const _totalItems = ref<string>(''); 
const _posts = ref(null); 
const _error_fontinuse = ref(null)
let _params = ref(`per_page=${_perPage}&page=${_current}&context=embed`)

const fetchData = async () => {

  const apiUrl = computed(() => {
      return `${langApi}/fontinuse?${_params.value}`;
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
      // console.log('x-wp-totalPages:', headers.get('x-wp-totalPages'));
      _posts.value = await response.json();
      _limit.value = Math.ceil(Number(_totalItems.value )/ _perPage)
    }
  } catch (error:any) {
    _error_fontinuse.value = error
    console.error('Error fetching data:', error);
  }
};

useHead({
  title:`${t('fontinuse')} | ${config.public.siteTitle}`
})
onMounted(() => {
  stClass.value = {type:"archive",cls:"fontinuse",lng:locale.value}
  // console.log(_posts)
  fetchData();
  // console.log(_posts)
})
</script>

<template>
<section class="sec_fontinuse sec">
    <div class="sec__inner">
      <header class="page__header">
        <h2 class="sec-ttl">{{ t('fontinuse') }}</h2>
        <Select type="fontinuse" />
      </header>
      <div v-if="_posts">
        <PostsList :posts="_posts" type="fontinuse" />
      </div>
      <div v-if="_error_fontinuse">
        <p>{{ _error_fontinuse }}</p>
      </div>
    </div>
    <Pagination :numPages="_numPage" :current="_current" :total="_limit" :urlSlug="_postType" />
  </section>
</template>

<style scoped lang="scss">
</style>
