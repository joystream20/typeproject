<script setup lang="ts">
const config = useRuntimeConfig()
const {locale} = useI18n()
let langApi = config.public.wpApiKey

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

type Post = {
  thumbnail:{
    url:string;
    url_f:string;
  }
  acf:{
    case_list:{
      image:string;
      text:string;
      url:string;
    }[]
  }
}



const {data:_page, status: _status, error:_error} = await useFetch<Post[]>(`${langApi}/pages/?slug=case`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
onMounted(() => {
  stClass.value = {type:"page",cls:"case",lng:locale.value}
  // console.log(_page)
})
</script>

<template>
<div v-if="_page && _page[0]">
  <div class="alignfull" v-if="_page[0].thumbnail">
    <div class="heroImage">
      <NuxtImg :src="`${_page[0].thumbnail.url_f}`" alt="" loading="lazy" format="webp" preload />
    </div>
  </div>
  <div v-if="_page[0].acf.case_list.length > 0" class="listContainer sec">
    <div class="sec__inner">
      <ul class="postList">
        <li class="postList-item" v-for="(child, index) of _page[0].acf.case_list" :key="index">
          <div class="image">
            <NuxtLink :to="`${child.url}`">
              <NuxtImg v-if="child.image" :src="child.image" :alt="child.text" loading="razy" />
              <img v-else src="@/assets/images/img_def.png" alt="">
            </NuxtLink>
          </div>
          <div class="txtContainer">
            <p class="ttl">{{ child.text}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.heroImage{
  aspect-ratio:1/.38;
  img{
    object-fit: cover;
    width:100%;
    height:100%;
  }
}
</style>
