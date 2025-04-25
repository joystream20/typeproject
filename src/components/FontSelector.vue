<script setup lang="ts">
const {locale,t} = useI18n()
type Props = {
  fonts:{
    name:string;
    font_family:string;
  }[]
}

const {fonts} = defineProps<Props>()

const fontFamily = defineModel<string>()

const onChangeFont = (e:Event) => {
  const target = e.target as HTMLSelectElement
  fontFamily.value = target.value
  // console.log(target.value)
}

</script>

<template>
<div v-if="fonts">
  <div class="wrap">
    <select class="fontSelector" @change="onChangeFont">
      <option value="">{{ t('selectfont') }}</option>
      <option v-for="font in fonts" :value="font.font_family" :key="font.name">{{ font.name }}</option>
    </select>
  </div>
</div>
</template>

<style scoped lang="scss">
.wrap{
  position:relative;
  &:after{
    content: "";
  position: absolute;
  width: 9px;
  height: 8px;
  top: 50%;
  right: .5em;
  margin-top:-4px;
  z-index: 2;
  background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 12'%3E%3Cpolygon fill='rgb(102,102,102)' points='8,12 0,0 16,0'/%3E%3C/svg%3E") 0 0 no-repeat;  
  /* These hacks make the select behind the arrow clickable in some browsers */
  pointer-events:none;
  }
}
.fontSelector{
  font-size: .875em;
  padding:.5em;
  border: none;
  -webkit-appearance: none; // Chrome, Safari (Firefoxでも効いた)
  -moz-appearance: none; // Firefox
  appearance: none;
  position:relative;
  background:transparent;
  padding-right:2em;
  color:#000;
  &:focus{
    outline:none;
  }
}
</style>
