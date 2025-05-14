<script setup lang="ts">
import type { Post } from '../../../../../types/type'

const config = useRuntimeConfig()
const {locale, t} = useI18n()
let langApi = config.public.wpApiKey
const route = useRoute()
const _cat_id = String(route.params.cat_id)
const _id = String(route.params.id);
const stClass = changeClass();

const _perPage = config.public.postsPerPage
const _numPage:number = config.public.pagerNumPage //pager max
const _current = Number(route.params.id);

const catName = ref<string>('category')


const _limit =  ref(1)
const _postType = "news"
const _totalItems = ref<string>('');
const _posts = ref(null); 
const _error = ref(null)

let _sort = ref('new')
// let _params = ref(`categories=${_cat_id}&per_page=${_perPage}&page=${_current}&context=embed`)
let _params = ref('')
const params = new URLSearchParams({
  per_page: _perPage.toString(),
  page: _current.toString(),
  categories:_cat_id,
  context:'embed'
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
    // _params.value = `categories=${_cat_id}&per_page=${_perPage}&page=${_current}&context=embed&order=asc` // 新しいパラメータを追加
    params.set('order','asc')
    fetchData()
  } else {
    // デフォルト処理
    _sort.value = 'new'
    // _params.value = `categories=${_cat_id}&per_page=${_perPage}&page=${_current}&context=embed`
    params.delete('order')
    fetchData()
  }
})

const fetchData = async () => {
  // const apiUrl = `${langApi}/posts?${_params}`; 

    const apiUrl = computed(() => {
      _params.value = params.toString()
      // console.log(_params.value)
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

      _posts.value = await response.json();

      _limit.value = Math.ceil(Number(_totalItems.value) / _perPage)
      }
      // console.log('Response Data:', _posts.value);
    } catch (error:any) {
      _error.value = error
      console.error('Error fetching data:', error);
    }
    
  };

// const _rest_url = `${langApi}/posts?${_params}`

// const {data: _posts, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
// if (_error.value) {
//     console.error('Error fetching data:', _error.value);
//   } else {
    
//   }

  watch(()=> catName.value, (newCatName) => {
  // console.log(newCatName)
    useHead({
    title:`${newCatName} | ${config.public.siteTitle}`
    })
  })

onMounted(() => {
  // console.log('params',route.params)
  stClass.value = {type:"archive",cls:"news cat",lng:locale.value}
  if (route.query.sort === 'old') {
    _sort.value = 'old'
    // _params.value = `categories=${_cat_id}&per_page=${_perPage}&page=${_current}&context=embed&order=asc`
    params.set('order','asc')
  } else {
    _sort.value = 'new'
    // _params.value = `categories=${_cat_id}&per_page=${_perPage}&page=${_current}&context=embed`
    params.delete('order')
  }
  // console.log(_posts)
  fetchData();
})


</script>
<template>
  <section class="sec_posts sec">
    <div class="sec__inner">
      <header class="page__header">
        <h2 class="sec-ttl"><NuxtLinkLocale :to="`/news`">{{ t('news') }}</NuxtLinkLocale> / {{ catName }}</h2>
        <Select type="news" :sort="_sort" taxtype="category" :catid="_cat_id" v-model="catName" />
        <!-- <Select type="news" :sort="_sort" taxtype="category" :catid="_id" @catName="setCatname" /> -->
      </header>
      
      <div v-if="_posts">
        <PostsList :posts="_posts" type="news" />
      </div>
      <div v-if="_error">
        <p>{{ _error }}</p>
      </div>
    </div>
    <Pagination :numPages="_numPage" :current="_current" :total="_limit" :urlSlug="`${_postType}/category/${_cat_id}`" :sort="_sort" />
  </section>
</template>

<style lang="scss" scoped>
</style>
