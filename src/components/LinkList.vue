<script setup lang="ts">
const config = useRuntimeConfig()
let langApi = config.public.wpApiKey
let langApiCumtom = config.public.wpApiCustom
let linkLlist_api = 'linkList'

type linkListType = {
  image:string;
  text:string;
  url:string;
}

const {data: _linkList, status:_status, error:_error} = await useFetch<linkListType[]>(`${langApiCumtom}/${linkLlist_api}`)
if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }

  onMounted(() => {
  })
</script>

<template>
<section class="sec">
  <div class="linkListContainer" v-if="_linkList">
    <ul class="linkList">
      <li class="linkList-item" v-for="(item, index) in _linkList" :key="index">
        <a :href="item.url" target="_blank">
          <div class="image">
            <NuxtImg :src="item.image" alt="" loading="lazy" />
          </div>
          <div class="txtContainer">
            <p class="txt" v-html="item.text"></p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</section>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.sec{
  margin-top:3em;
}
.linkListContainer{
  max-width:1440px;
  margin-left:auto;
  margin-right:auto;
}
.linkList{
  display: flex;
  flex-direction: column;
  gap:1.5em;
  &-item{
    a{
      display: flex;
    }
    .image{
      width:45%;
      aspect-ratio: 1/.6;
      img{
        width:100%;
        height:100%;
        object-fit: cover;
      }
    }
    .txtContainer{
      padding:1em;
      flex:1;
      display: flex;
      align-items:center;
      word-break: break-all;
      .txt{
        font-size:.875em;
      }
    }
  }
  
}

@media screen and (min-width: #{calc($ww * 1px)}) {
.linkList{
  flex-direction: row;
  gap:27px;
  &-item{
    flex-basis:calc(100% - 18px);
  }
}
}
</style>
