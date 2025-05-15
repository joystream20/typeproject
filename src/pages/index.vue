<script setup lang="ts">
import type { Post, PostTopNews, PostListFont } from '../types/type'
const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey
let langApiCumtom = config.public.wpApiCustom
let top_posts_api = 'top_posts'
const _desc = "フォントによるブランディングの強化を支援。AXIS Font、TP明朝、TPスカイなどの次世代標準を目指した書体を提供するとともに、都市フォント、四季フォントなどユニークなプロジェクトを進めています。"


if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  // langApiCumtom = config.public.wpApiCustomEn
  top_posts_api = 'top_posts_en'
}


const stClass = changeClass();

type toplistType = {
  id:number,
  href:string,
  thumb:string,
  title:string,
  blank:boolean
}

const customArray = ref<toplistType[][]>([])

const {data: _top_posts, status:_top_posts_st, error:_top_posts_error} = await useFetch<toplistType[]>(`${langApiCumtom}/${top_posts_api}`)
  if (_top_posts_error.value) {
    console.error('Error fetching data:', _top_posts_error.value);
  }

const {data: _posts, status:_status, error:_error} = await useFetch<PostTopNews[]>(`${langApi}/posts?exc_selective_use=90&exc=en&per_page=3&context=embed`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  }
const {data: _fonts, status:_status_f, error:_error_f} = await useFetch<PostListFont[]>(`${langApi}/fonts?per_page=5&context=embed`)
  if (_error_f.value) {
    console.error('Error fetching data:', _error_f.value);
  }

const {data: _services, status:_status_service, error:_error_service} = await useFetch<Post[]>(`${langApi}/service?per_page=4&context=embed`)
if (_error_service.value) {
    console.error('Error fetching data:', _error_service.value);
  }

const loading = ref('on')

useHead({
  meta: [
    { name: 'description',content: _desc},
    {property: 'og:description',content: _desc},
    {property: 'twitter:description',content: _desc}
  ]
})

onBeforeMount(() => {
  // console.log(_top_posts)
  if (_top_posts.value && _top_posts.value.length > 0) {
    customArray.value = [
      _top_posts.value.slice(0,1),
      _top_posts.value.slice(1,5),
      _top_posts.value.slice(5)
    ]

    // console.log(customArray)
  }
})

onMounted(() => {
  stClass.value = {type:"page",cls:"home",lng:locale.value}
})

// onUnmounted(() => {})
// onBeforeUnmount(() => {})

</script>

<template>
  <div>
    <div class="secContainer">
      <section v-if="_top_posts" class="sec sec_customPost">
        <div class="sec__inner">
          <div class="customPost">
            <div class="customPost__top ">
              <div class="customPost__top-left">
                <TopList  v-for="(_post, index) in customArray[0]" :key="index" :title="_post.title" :href="_post.href" :src="_post.thumb" :blank="_post.blank" />
              </div>
              <div class="customPost__top-right">
                <TopList v-for="(_post, index) in customArray[1]" :key="index" :title="_post.title" :href="_post.href" :src="_post.thumb" :blank="_post.blank" />
              </div>
            </div>
            <div class="customPost__bottom ">
              <TopList v-for="(_post, index) in customArray[2]" :key="index" :title="_post.title" :href="_post.href" :src="_post.thumb" :blank="_post.blank" />
            </div>
          </div>
        </div>
      </section>
      <section class="sec sec_news">
        <div class="sec__inner">
          <header class="sec__header _wbt">
            <h2 class="sec__header-ttl">{{ t('news') }}</h2>
            <p class="btn_all all"><NuxtLinkLocale :to="`/news`"><span class="txt">{{ t('all_posts') }}</span></NuxtLinkLocale></p>
          </header>
          <div v-if="_posts" class="sec__container u_mt0_i">
            <NewsList :newsPosts="_posts" />
          </div>
          <div v-if="_error">
            <p>{{ _error }}</p>
          </div>
        </div>
      </section>
    
      <section class="sec_font sec">
        <div class="sec__inner">
          <header class="sec__header _wbt">
            <h2 class="sec-ttl">{{ t('fonts') }}</h2>
            <p class="btn_all all"><NuxtLinkLocale :to="`/fonts`"><span class="txt">{{ t('all_posts') }}</span></NuxtLinkLocale></p>
          </header>
          <div v-if="_fonts" class="sec__container">
            <FontsList :fontsPosts="_fonts" />
          </div>
          <div v-if="_error_f">
            <p>{{ _error_f }}</p>
          </div>
        </div>
      </section>
      <section class="sec_service sec">
        <div class="sec__inner">
          <header class="sec__header _wbt">
            <h2 class="sec-ttl">{{ t('service') }}</h2>
            <p class="btn_all all"><NuxtLinkLocale :to="`/service`"><span class="txt">{{ t('all_posts') }}</span></NuxtLinkLocale></p>
          </header>
          <div v-if="_services" class="sec__container">
            <PostsList :posts="_services" type="service" />
          </div>
          <div v-if="_error_service">
            <p>{{ _error_service }}</p>
          </div>
        </div>
      </section>
      <InterviewList />
      <FontInUseList />
      <DevelopmentStory />
      <LinkList />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;

.customPost{
  display: flex;
  flex-direction: column;
  gap:1.24em;

  &__top{
    display: flex;
    flex-direction: column;
    gap:1.24em;
    &-left{
      flex-basis: calc(58% - .62em);
    }
    &-right{
      flex-basis: calc(42% - .62em);
      display: flex;
      flex-wrap:wrap;
      gap:1.24em;
      .customPost-item{
        flex-basis: calc(50% - .62em);
      }
    }
  }
  &__bottom{
    display: flex;
    flex-wrap: wrap;
    gap:1.24em;
    .customPost-item{
      flex-basis:calc(50% - .93em);
    }
  }
}
.sec{
  &.sec_customPost{
    margin-top:1.25em;
    min-height:450px;
  }
  margin-top:5em;
  &__header{
    margin-bottom:.7em;
    border-bottom:1px solid #b3b3b3;
    padding:.3em 0;
    &-ttl{
      font-size:1.25em;
    }
  }
  &__container{
    margin-top:1.5em;
  }
  &__inner{
      max-width:1440px;
      margin-left: auto;
      margin-right: auto;
  }

  
  &.sec_news{
    .sec__inner{
      max-width:1200px;
      margin-left:auto;
      margin-right:auto;
    }
  }
}

@media screen and (min-width: #{calc($ww * 1px)}) { 
  .customPost{
    &__top{
      flex-direction: row;
    }
    &__bottom{
    .customPost-item{
      flex-basis:calc(25% - .93em);
    }
  }
  }
}
</style>
