<script setup lang="ts">

type Props = {
  title:string,
  src:string,
  href:string,
  blank:boolean
}
const {title, src, href, blank} = defineProps<Props>()

</script>
<template>
<div class="customPost-item">
  <div class="image">
    <a v-if="blank" :href="href" target="_blank">
      <NuxtImg 
      :src="`${src}.webp`" 
      width="700"
      height="399" 
      :alt="title" 
      loading="eager" 
      format="webp" />
    </a>
    <NuxtLinkLocale v-else :to="`/${href}`">
    <NuxtImg 
    :src="`${src}.webp`" 
    :alt="title" 
    width="700"
    height="399" 
    loading="eager" 
    format="webp" />
    </NuxtLinkLocale>
  </div>
  <div class="txtContainer">
    <h2 class="ttl">{{ title }}</h2>
  </div>
</div>
</template>
<style scoped lang="scss">

  .customPost-item{
    .image{
      img{
      object-fit: cover;
      width:100%;
      aspect-ratio: 1/.57;
    }
    }
    
    .txtContainer{
      margin-top:.3em;
      line-height: 1.4;
      .ttl{
        font-size:.875em;
      }
    }
  }

</style>
