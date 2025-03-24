<script setup lang="ts">
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
const _postType = "fontinuse"
const _totalItems = ref<string>(''); 
const _posts = ref(null); 
const _error_fontinuse = ref(null)
let _params = ref(`per_page=${_perPage}&page=${_current}&context=embed`)
// const {data: _fontinuses, status:_status_fontinuse, error:_error_fontinuse} = await useFetch(`${langApi}/fontinuse?context=embed`)

const fetchData = async () => {
  // const apiUrl = `${langApi}/fontinuse?per_page=${_perPage}&page=${_current}&context=embed`; 
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

    if(!response.ok){
      console.error(`${response.status} - ${response.statusText}`);
      window.location.href = locale.value == 'en' ? '/en/fontinuse' : '/fontinuse'
      return
    }

    const headers = response.headers;
    _totalItems.value = headers.get('x-wp-total') as string;
    // console.log('x-wp-total:', _totalItems.value);

    _posts.value = await response.json();

    _limit.value = Math.ceil(Number(_totalItems.value) / _perPage)
    // console.log('limit='+_limit.value)
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
  fetchData();
  // console.log(_fontinuses.value[0])
})
</script>

<template>
<section class="sec_fontinuse sec">
    <div class="sec__inner">
      <div class="page__header">
        <h2 class="sec-ttl">{{ t('fontinuse') }}</h2>
        <Select type="fontinuse" />
      </div>
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
