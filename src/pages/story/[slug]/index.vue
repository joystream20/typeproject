<script setup lang="ts">
import { useLinkClickHandler } from '@/composables/useLinkClickHandler';
import { initSwiper } from '@/utils/initSwiper'
const {locale} = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const _slug = route.params.slug;
let langApi = config.public.wpApiKey
let pageApi = config.public.siteUrl
let langApiCumtom = config.public.wpApiCustom


const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  pageApi = config.public.siteUrl+'/en'
}
const _rest_url = `${langApi}/story?slug=${_slug}`
const _page_url = `${pageApi}/story/${_slug}`
type Post = {
  title:{
    rendered:string;
  }
  acf:{
    hero:string
  },
  thumbnail:{
    url:string
  }
  content: {
    rendered:string
  }
  slug: string;
}

type Fonts = {
  name:string;
  font_family:string;
}
const {data: _post, status: _status, error:_error} = await useFetch<Post[]>(_rest_url)
if (_error.value) {
  console.error('Error fetching data:', _error.value);
} else {
  if(_post.value){
    const description = useSeoDescription(_post.value[0])
  const imgUrl = _post.value[0].thumbnail.url || `${config.public.siteUrl}/_nuxt/assets/images/img_def.png`
    useHead({
      title: `${_post.value[0].title.rendered} | ${config.public.siteTitle}`,
  meta: [
    { name: 'description',content: description},
    {property: 'og:description',content: description},
    {property: 'og:image',content:imgUrl },
    {property: 'og:url',content: _page_url},
    {property: 'og:title',content: _post.value[0].title.rendered},
    {property: 'og:type',content: 'article'},
    {property: 'twitter:title',content: _post.value[0].title.rendered},
    {property: 'twitter:description',content: description}
  ]
    })
    
  }
}

  
onMounted(async () => {
  stClass.value = {type:"single",cls:"story",lng:locale.value}
 
  useLinkClickHandler()

  listShow()

  if(_post?.value?.[0]?.slug === "story20200701"){
   await initSwiper()
  }

})

const listShow = async () => {
    await nextTick()

    const fontListsWrap = document.querySelectorAll('.storyFontListWrap')
    fontListsWrap.forEach(
      _fontListWrap => {
        const _fontListItems = _fontListWrap.querySelectorAll('.storyFontList .storyFontList-item') as NodeListOf<HTMLElement>
        const _fontListBoxs = _fontListWrap.querySelectorAll('.storyFontListContainer .storyFontListContainer-box') as NodeListOf<HTMLElement>

          _fontListItems[0].classList.add('on')
          _fontListBoxs[0].classList.add('on')

        _fontListItems.forEach(
          (_item,i) => {
            if(_item.dataset.listened === 'true') return

            _item.dataset.listened = 'true'
            _item.addEventListener('click', (e) => {
              // console.log(_fontListBoxs[i])

              _fontListItems.forEach((font, v) => {
                font.classList.toggle('on', v === i)
              })
              _fontListBoxs.forEach((box, j) => {
                box.classList.toggle('on', j === i)
              })
            })
          }
        )
      }
    )
  }
</script>

<template>
<div>
  <div v-if="_post && _post[0]">
    <div class="heroImage">
      <NuxtImg :src="`${_post[0].acf.hero}.webp`" alt="" height="1000" width="2000" loading="lazy" format="webp" v-if="_post[0].acf.hero" preload />
      <img v-else src="@/assets/images/img_dum.jpg" alt="">
    </div>
    <div class="postContainer" v-html="_post[0].content.rendered" ></div>
  </div>
</div>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;

.postContainer{
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
