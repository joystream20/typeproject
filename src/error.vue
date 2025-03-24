<script setup>
const error = useError()
</script>

<template>
  <div class="error_wrap">
    <div class="inner">
      <Error404 v-if="error.statusCode===404" />
      <div v-else>Error</div>
    </div>
  </div>
</template>

<style>
.error_wrap{
  display:flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size:2em;
}
</style>
