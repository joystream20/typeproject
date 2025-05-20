<script setup lang="ts">
const {locale,t} = useI18n()
const SimulatorAsync = defineAsyncComponent(() =>
  import("vue-fitfont-simulator").then((m) => m.FitfontSimulator)
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
        <SimulatorAsync :lang="lang" assets-root="/assets/simulator" />
      </Suspense>
    </ClientOnly>
  </div> 
</template>
