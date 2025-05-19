<script setup lang="ts">
const {locale,t} = useI18n()
const AnimationAsync = defineAsyncComponent(() =>
  import("vue-fitfont-animation").then((m) => m.FitfontAnimation)
);
const lang = ref('ja')

if(locale.value === 'en'){
  lang.value = 'en' 
}
</script>

<template>
  <div>
    <ClientOnly>
      <Suspense>
        <AnimationAsync :lang="lang" assets-root="/assets/animation" />
      </Suspense>
    </ClientOnly>
  </div>
</template>
