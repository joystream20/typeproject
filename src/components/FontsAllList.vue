<script setup lang="ts">
import type { FontPost } from '../types/type'

const {locale,t} = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
let langApi = config.public.wpApiKey

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

type Props = {
  specimen:string
}

const {specimen} = defineProps<Props>()

//tpconnect use
const _fonts = ref<FontPost[] | null>(null);

const {data: _fontsdata, status:_fonts_status, error:_error} = await useFetch<FontPost[]>(`${langApi}/fonts?context=embed&per_page=100`)
    _fonts.value = _fontsdata.value

  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }

</script>

<template>
  <section class="sec_fonts sec">
    <div class="sec__inner">
      <header class="sec__header _wbt">
        <h2 class="sec__header-ttl">{{ t('fonts') }}</h2>
        <p class="btn_specimen btn_all"><a :href="specimen" target="_blank"><span class="tx">{{t('download_specimen')}}</span></a></p>
      </header>
      <div class="fontListContainer">
        <ul v-if="_fonts" class="fontList">
          <li :class="`fontList-item font_${font.id} font_${font.slug}`" v-for="font in _fonts" :key="font.id" >
            <div class="image">
              <NuxtLinkLocale :to="`/fonts/${font.slug}`">
                <NuxtImg :src="`${font.thumbnail.url}.webp`" :alt="`${font.title.rendered}`" width="246" loading="lazy" format="webp" />
                <span class="back" :style="font.acf.hover_style">
                  <NuxtImg :src="`${font.thumbnail.url}.webp`" :alt="`${font.title.rendered}`" width="246" loading="lazy" format="webp" />
                </span>
              </NuxtLinkLocale>
            </div>
            <p class="fontList-item-name">{{ font.title.rendered }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sec{
  margin-top:3em;
  &__inner{
    max-width:1440px;
    margin-left:auto;
    margin-right:auto;
  }
}
</style>
