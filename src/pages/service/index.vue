<script setup lang="ts">
import type { Post } from '../../types/type'
const config = useRuntimeConfig()
const {locale,t} = useI18n()
let langApi = config.public.wpApiKey

const stClass = changeClass();

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
}

const {data: _services, status:_status_service, error:_error_service} = await useFetch<Post[]>(`${langApi}/service?context=embed`)
if (_error_service.value) {
    console.error('Error fetching data:', _error_service.value);
  } else {
    
  }

  useHead({
    title:`${t('service')} | ${config.public.siteTitle}`
  })
onMounted(() => {
  stClass.value = {type:"archive",cls:"service",lng:locale.value}
  // console.log(_services.value[0])
})
</script>

<template>
<section class="sec_service sec">
    <div class="sec__inner">
      <h2 class="sec-ttl">{{ t('service') }}</h2>
      
      <div v-if="_services">
        <PostsList :posts="_services" type="service" />
      </div>
      <div v-if="_error_service">
        <p>{{ _error_service }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>
