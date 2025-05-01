<script setup lang="ts">
const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

type Post = {
  title:{
    rendered:string;
  }
  thumbnail:{
    url:string;
    url_f:string;
  }
  acf:{
    case_list:{
      image:string;
      text:string;
      url:string;
      blank:boolean;
    }[]
  }
}



const {data:_page, status: _status, error:_error} = await useFetch<Post[]>(`${langApi}/pages/?slug=letterspace`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }

  useHead({
  title:`${t('letterspace')} | ${config.public.siteTitle}` 
  })

onMounted(() => {
  stClass.value = {type:"page",cls:"letterspace",lng:locale.value}
  // console.log(_page)
})
</script>

<template>
<div v-if="_page && _page[0]">
  <div class="alignfull" v-if="_page[0].thumbnail">
    <div class="heroImage">
      <h1 class="page-ttl">{{ _page[0].title.rendered }}</h1>
      <NuxtImg :src="`${_page[0].thumbnail.url_f}.webp`" alt="" loading="lazy" format="webp" preload />
    </div>
  </div>
  <div v-if="_page[0].acf.case_list.length > 0" class="listContainer sec">
    <div class="sec__inner">
      <ul class="postList">
        <li class="postList-item" v-for="(child, index) of _page[0].acf.case_list" :key="index">
          <template v-if="child.blank"> 
            
              <div class="image">
                <a :href="`${child.url}`" target="_blank">
                <NuxtImg v-if="child.image" :src="child.image" :alt="child.text"  />
                <img v-else src="@/assets/images/img_def.png" alt="">
              </a>
              </div>
              <div class="txtContainer">
                <p class="ttl">{{ child.text}}</p>
              </div>
            
          </template>
          <template v-else>
           
              <div class="image">
                <NuxtLink :to="`${child.url}`">
                <NuxtImg v-if="child.image" :src="child.image" :alt="child.text"  />
                <img v-else src="@/assets/images/img_def.png" alt="">
              </NuxtLink>
              </div>
              <div class="txtContainer">
                <p class="ttl">{{ child.text}}</p>
              </div>
            
          </template>
          
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.heroImage{
  // aspect-ratio:1/.38;
  img{
    object-fit: cover;
    width:100%;
    height:100%;
  }
}
</style>
