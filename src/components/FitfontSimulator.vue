<script setup lang="ts">
const SimulatorAsync = defineAsyncComponent(() =>
  import("vue-fitfont-simulator").then((m) => m.FitfontSimulator)
);
</script>

<template>
 <div>
    <ClientOnly>
      <Suspense>
        <SimulatorAsync lang="ja" assets-path="/assets" />
      </Suspense>
    </ClientOnly>
  </div> 
</template>
