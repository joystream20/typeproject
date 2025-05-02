<script setup lang="ts">

import type { Post } from '../types/type'

const {locale, t} = useI18n()

const config = useRuntimeConfig()
let langApi = config.public.wpApiKey

const _ttl = ref(t('fontinuse'))


type Props = {
  taxonomy?:string,
  term?:string,
  name?:string
}
const {taxonomy, term, name} = defineProps<Props>()

if(name){
  _ttl.value = `「${name}」${t('otheruses')}`
}

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  if(name){
    _ttl.value = `${t('otheruses')}「${name}」`
  }
}

let _rest_url = `${langApi}/fontinuse?per_page=4&context=embed`


if(taxonomy && term){
  _rest_url = `${_rest_url}&taxonomy=${taxonomy}&term=${term}`
}


const {data: _posts, status:_status, error:_error} = await useFetch<Post[]>(`${_rest_url}`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
</script>

<template>
 <section v-if="_posts && _posts[0]" class="sec_interview sec">
      <div class="sec__inner">
        <header class="sec__header _wbt">
          <h2 class="sec__header-ttl">{{_ttl }}</h2>
          <p class="btn_all all"><NuxtLinkLocale :to="`/fontinuse`"><span class="txt">{{ t('all_posts') }}</span></NuxtLinkLocale></p>
        </header>
        <div v-if="_posts" class="sec__container">
          <PostsList :posts="_posts" type="fontinuse" />
        </div>
        <div v-if="_error">
          <p>{{ _error }}</p>
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
