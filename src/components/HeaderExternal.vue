<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const store_url = locale.value === 'en'
  ? 'https://shop.typeproject.com/en'
  : 'https://shop.typeproject.com'

</script>

<template>
  <header id="site-header" class="site-header">
    <div class="site-header__inner">
      <p class="logo">
        <NuxtLinkLocale :to="localePath('/')">
        <img src="@/assets/images/logo.svg" alt="type project" width="195">
        </NuxtLinkLocale>
      </p>
      <div class="navContainer u_d_fl">
        <Gnav />
        <div id="btn_hm" class="btn_hm">
          <div class="btn_inner">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="hmMenuContainer">
      <div class="hmMenuContainer__inner">
        <ul class="navList">
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/')">{{ t('home') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/fonts')">{{ t('fonts') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/service')">{{ t('service') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/case_study')">{{ t('case') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/news')">{{ t('news') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/letterspace')">{{ t('letterspace') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/about')">{{ t('company') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="localePath('/support')">{{ t('support') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <a :href="store_url" target="_blank">{{ t('store') }}</a>
          </li>
        </ul>
        <div class="hmMenuContainer-back"></div>
      </div>
      
    </div>
    
  </header>
</template>
