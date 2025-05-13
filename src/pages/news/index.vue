<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const _perPage = config.public.postsPerPage
const _numPage:number = config.public.pagerNumPage //pager max
const _current = 1

const stClass = changeClass();



const _limit =  ref(1)
const _postType = "news"
const _totalItems = ref<string>('');
const _posts = ref(null); 
const _error = ref(null)
let _sort = ref('new')
// let _params = ref(`per_page=${_perPage}&page=${_current}&context=embed`)
let _params = ref('')
const params = new URLSearchParams({
  per_page: _perPage.toString(),
  page: _current.toString(),
  context: 'embed'
})


if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  params.set('exc_selective_use','90')
  params.set('exc', 'en')
}else{
  params.delete('exc_selective_use')
  params.delete('exc')
}


watch(() => route.query.sort, (newSort) => {
  if (newSort === 'old') {
    _sort.value = 'old'
    //_params.value = `per_page=${_perPage}&page=${_current}&context=embed&order=asc` // 新しいパラメータを追加
    params.set('order','asc')
    fetchData()
  } else {
    // デフォルト処理
    _sort.value = 'new'
    // _params.value = `per_page=${_perPage}&page=${_current}&context=embed`
    params.delete('order')
    fetchData()
  }
})

 const fetchData = async () => {
  // const apiUrl = `${langApi}/posts?${_params}`; 

    const apiUrl = computed(() => {
     _params.value = params.toString()
    //  console.log(_params.value)
      return `${langApi}/posts?${_params.value}`;
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
      // console.log('x-wp-totalPages:', headers.get('x-wp-totalPages'));

      _posts.value = await response.json();

      _limit.value = Math.ceil(Number(_totalItems.value) / _perPage)
      }
      // console.log('Response Data:', _posts.value);
    } catch (error:any) {
      _error.value = error
      console.error('Error fetching data:', error);
    }
    
  };

useHead({
  title:`${t('news')} | ${config.public.siteTitle}`
})
onBeforeUnmount(() => {
  
})
onMounted(() => {
  stClass.value = {type:"archive",cls:"news",lng:locale.value}

  //ここが意味ない気がして一旦コメントアウト20250307
  if (route.query.sort === 'old') {
    _sort.value = 'old'
    // _params.value = `per_page=${_perPage}&page=${_current}&context=embed&order=asc`
    params.set('order','asc')
  } else {
    _sort.value = 'new'
    // _params.value = `per_page=${_perPage}&page=${_current}&context=embed`
    params.delete('order')
  }

  fetchData();
})
</script>

<template>
  <section class="sec_posts sec">
    <div class="sec__inner">
      <header class="page__header">
        <h2 class="sec-ttl">{{ t('news') }}</h2>
        <Select type="news" :sort="_sort" />
      </header>
      <!-- <p class="all"><NuxtLinkLocale :to="`/posts`"><span class="txt">{{ t('all_posts') }}</span></NuxtLinkLocale></p> -->
      
      <div v-if="_posts">
        <PostsList :posts="_posts" type="news" />
      </div>
      <div v-if="_error">
        <p>{{ _error }}</p>
      </div>
    </div>
    <Pagination :numPages="_numPage" :current="_current" :total="_limit" :urlSlug="_postType" :sort="_sort" />
  </section>

</template>
