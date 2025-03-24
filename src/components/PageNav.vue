<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
<nav class="pnav">
  <ul class="pList">
    <li class="pList-item">
      <NuxtLinkLocale :to="`/about`">{{ t('about') }}</NuxtLinkLocale>
    </li>
    <li class="pList-item">
      <NuxtLinkLocale :to="`/history`">{{ t('history') }}</NuxtLinkLocale>
    </li>
    <li class="pList-item">
      <NuxtLinkLocale :to="`/staff`">{{ t('staff') }}</NuxtLinkLocale>
    </li>
    <li class="pList-item">
      <NuxtLinkLocale :to="`/news`">{{ t('news_report') }}</NuxtLinkLocale>
    </li>
  </ul>
</nav>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.pList{
  display: flex;
  flex-direction: column;
  justify-content: center;
  &-item{
    a{
      display: block;
      padding:1.2em 1.5em;
    }
  }
}

@media screen and (min-width: #{calc($ww * 1px)}) { 
  .pList{
    flex-direction: row;
  }
}
</style>
