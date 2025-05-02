<script setup lang="ts">
import type { PostListFont } from 'src/types/type';

type Props = {
  fontsPosts: PostListFont[]
}

const { fontsPosts } = defineProps<Props>()

const onMounted = () => {
  
}
</script>

<template>

<ul class="fontList">
      <li :class="`fontList-item font_${font.slug}`" v-for="font in fontsPosts" :key="font.id">
        <div class="image">
          <NuxtLinkLocale :to="`/fonts/${font.slug}`">
          <NuxtImg :src="`${font.thumbnail.url}.webp`" loading="lazy" format="webp" :alt="`${font.title.rendered}`" />
          <span class="back" :style="font.acf.hover_style">
                <NuxtImg :src="`${font.thumbnail.url}.webp`" :alt="`${font.title.rendered}`" width="246" loading="lazy" format="webp" />
              </span>
        </NuxtLinkLocale>
        </div>
        <p class="fontsList-item-name">{{ font.title.rendered }}</p>
      </li>
  </ul>
</template>

<style lang="scss" scoped>

</style>
