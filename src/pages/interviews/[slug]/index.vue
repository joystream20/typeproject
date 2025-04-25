<script setup lang="ts">
import { useLinkClickHandler } from '@/composables/useLinkClickHandler';
const {locale,t} = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const _slug = route.params.slug;
let langApi = config.public.wpApiKey
let langApiCumtom = config.public.wpApiCustom
let endpoint = 'fontFamily'
const defaultFont = config.public.defaultFontFamily

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  endpoint = 'fontFamily_en'
}
const _rest_url = `${langApi}/interviews?slug=${_slug}`
type Post = {
  title:{
    rendered:string;
  }
  acf:{
    hero:string
  },
  content: {
    rendered:string
  }
}

type Fonts = {
  name:string;
  font_family:string;
}
const {data: _post, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
if (_error.value) {
  console.error('Error fetching data:', _error.value);
} else {
  
}

const {data: _fonts, status:_fonts_st, error:_fonts_error} = await useFetch<Fonts[]>(`${langApiCumtom}/${endpoint}`)
if (_fonts_error.value) {
  console.error('Error fetching data:', _fonts_error.value);
} else {
  
}

const fontFamily = ref<string>(defaultFont)

if(_post.value){
  useHead({
  title:`${_post.value[0].title.rendered} | ${config.public.siteTitle}`
  })
}
  
onMounted(() => {
  stClass.value = {type:"single",cls:"interviews",lng:locale.value}
  // console.log(fontFamily.value)
  useLinkClickHandler()
})
</script>

<template>
<div>
  <div v-if="_post && _post[0]">
    <div class="heroImage">
      <NuxtImg :src="_post[0].acf.hero" alt="" height="1000" width="2000" loading="lazy" format="webp" v-if="_post[0].acf.hero" preload />
      <img v-else src="@/assets/images/img_dum.jpg" alt="">
    </div>
    <!-- <p>{{ fontFamily }}</p> -->
    <div class="fontSelectContainerWrap has-global-padding">
      <div class="fontSelectContainer u_mx1000" v-if="_fonts">
        <p class="fontSelectContainer-txt"><span class="_aa">Aa</span>{{ t('current_font') }}</p>
        <FontSelector :fonts="_fonts" v-model="fontFamily" />
      </div>
    </div>
    <div :style="{fontFamily:fontFamily}" class="postContainer" v-html="_post[0].content.rendered" v-if="fontFamily"></div>
  </div>
</div>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.postContainer{
  // font-family: v-bind(fontFamily);
  font-weight: normal;
}
.fontSelectContainer{
  margin-top:1em;
  margin-left: auto;
  margin-right: auto;
  padding:.5em 0;
  max-width: 750px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top:1px solid #a6a6a6;
  &-txt{
    ._aa{
      display: inline-block;
      margin-right:.3em;
    }
  }
}
.heroImage{
  // height: clamp(18.75rem, 12.148rem + 28.17vw, 37.5rem);
  aspect-ratio: 1/.6;
  width:100%;
  img{
    object-fit: cover;
    object-position: center 20%;
    width:100%;
    height: 100%;
  }
}
.postContainer{
  margin-top:2em;
}
@media screen and (min-width: #{calc($ww * 1px)}) { 
  .heroImage{
    aspect-ratio: 1/.38;
    min-height: 400px;
  }
}
</style>
