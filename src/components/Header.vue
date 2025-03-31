<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';

const stClass = changeClass();
const {locale,t} = useI18n()
const route = useRoute()
const _state = ref<boolean | null>(null)


const store_url = ref<string>('https://shop.typeproject.com/')
watch(()=> _state.value, (newState) => {
  // console.log(newState)
})

watch(route, (newRoute)=>{
  // console.log(newRoute.path)
  // console.log(locale.value)
  _state.value = false
  if(locale.value === 'en'){
    store_url.value = 'https://shop.typeproject.com/en/'
  }else{
    store_url.value = 'https://shop.typeproject.com/'
  }
})

const btnClick = () => {
  _state.value = !_state.value
  // console.log('click', _state.value)
}

if(locale.value === 'en'){
  store_url.value = 'https://shop.typeproject.com/en/'
}

</script>

<template>

  <header id="site-header" class="site-header">
    <div class="site-header__inner">
      <h1 class="logo" v-if="stClass.cls === 'home'">
        <NuxtLinkLocale :to="`/`">
        <img src="@/assets/images/logo.svg" alt="type project" width="195">
        </NuxtLinkLocale>
      </h1>
      <p class="logo" v-else>
        <NuxtLinkLocale :to="`/`">
        <img src="@/assets/images/logo.svg" alt="type project" width="195">
        </NuxtLinkLocale>
      </p>
      <Gnav v-model="_state" />
    </div>
    <div id="btn_hm" class="btn_hm" :class="{'on': _state, 'off': !_state && _state !== null}" @click="btnClick()">
      <div class="btn_inner">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
    <div class="hmMenuContainer" :class="{'on': _state}">
      <div class="hmMenuContainer__inner">
        <ul class="navList">
          <li class="navList-item">
            <NuxtLinkLocale :to="`/`">{{ t('home') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'fonts'}">{{ t('fonts') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'service'}">{{ t('service') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'case_study'}">{{ t('case') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'news'}">{{ t('news') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'letterspace'}">{{ t('letterspace') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'about'}">{{ t('company') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <a :href="store_url" target="_blank">{{ t('store') }}</a>
          </li>
        </ul>
        <div class="hmMenuContainer-back" @click="btnClick()"></div>
      </div>
      
    </div>
  </header>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;

.logo{
  width:clamp(8.125rem, -5.323rem + 28.02vw, 12.188rem);
}
</style>
