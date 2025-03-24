<script setup lang="ts">
// import { defineProps } from 'vue';

type Props = {
  title:string,
  slug:string,
  src:string,
  post_type:string
}
const {title, slug, src, post_type} = defineProps<Props>()

</script>
<template>
<div class="customPost-item">
  <div class="image">
    <NuxtLinkLocale :to="`/${post_type}/${slug}`"><NuxtImg :src="src" :alt="`${title}`" loading="lazy" format="webp" preload /></NuxtLinkLocale>
  </div>
  <div class="txtContainer">
    <h3 class="ttl">{{ title }}</h3>
  </div>
</div>
</template>
<style scoped lang="scss">

  .customPost-item{
    .image{
      aspect-ratio: 1/.65;
    }
    img{
      object-fit: cover;
      width:100%;
      height: 100%;
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
