<script setup lang="ts">
import { useRouter } from 'vue-router'
const config = useRuntimeConfig()
const route = useRoute()
const {locale, t} = useI18n()
const router = useRouter()
type Props = {
  type: string,
  taxtype?:string,
  sort?:string,
  catid?:string | string[]
}
const { type, sort, taxtype, catid } = defineProps<Props>()

let langApiCumtom = config.public.wpApiCustom

const url_new = ref(route.path)
const url_old = ref(`${route.path}?sort=old`)
const _cats_tax = ref<any>()

const catName = defineModel<string>()

type Category = {
  term_id: string;
  name: string;
}


if(locale.value == 'en'){
  langApiCumtom = config.public.wpApiCustomEn
}

if(type === 'news'){
  const {data: _catstax, status:_status, error:_error} = await useFetch(`${langApiCumtom}/newsCatTaxonomy?context=embed`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
     _cats_tax.value = _catstax.value
  }
  if(taxtype === 'category'){

  }
}else if(type === 'fontinuse'){
  const {data: _catstax, status:_status, error:_error} = await useFetch(`${langApiCumtom}/fontinuseCatTaxonomy?context=embed`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
     _cats_tax.value = _catstax.value
  }

}else if(type === 'interviews'){
  const {data: _catstax, status:_status, error:_error} = await useFetch(`${langApiCumtom}/interviewsCatTaxonomy?context=embed`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
     _cats_tax.value = _catstax.value
  }

}else if(type === 'story'){
  const {data: _catstax, status:_status, error:_error} = await useFetch(`${langApiCumtom}/storyCatTaxonomy?context=embed`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
     _cats_tax.value = _catstax.value
  }

}


const onSort = (e:Event) => {
  const target = e.target as HTMLSelectElement
  router.push(target.value)
}

const urlLocale = (url:string):string => {
  if(locale.value == 'en'){
      return `/en${url}`
    } 
    return `${url}`
}


onMounted(() => {
  // console.log(_cats_tax)
  if(type === 'news'){
    
  }else if(type === 'fontinuse'){

  }

  //cNameで返すため
  if(taxtype === 'category'){
      if(_cats_tax.value['categories']){
        _cats_tax.value['categories'].forEach((_cat: Category) => {
              // console.log(_cat)
              if(_cat.term_id == catid){
                catName.value = _cat.name
              }
            }
          )
        }
    }else if(taxtype === 'font_type'){
      if(_cats_tax.value['font_type']){
        // console.log(_cats_tax.value['font_type'])
        _cats_tax.value['font_type'].forEach((_tax: Category) => {
              if(_tax.term_id == catid){
                catName.value = _tax.name
              }
            }
          )
        }
    }
    else if(taxtype === 'scene'){
      if(_cats_tax.value['scene']){
        // console.log(_cats_tax.value['scene'])
        _cats_tax.value['scene'].forEach((_tax: Category) => {
              if(_tax.term_id == catid){
                catName.value = _tax.name
              }
            }
          )
        }
    }
    else if(taxtype === 'interview_category'){
      if(_cats_tax.value['interview_category']){
        // console.log(_cats_tax.value['interview_category'])
        _cats_tax.value['interview_category'].forEach((_tax: Category) => {
              if(_tax.term_id == catid){
                catName.value = _tax.name
              }
            }
          )
        }
    }
    else if(taxtype === 'story_category'){
      if(_cats_tax.value['story_category']){
        // console.log(_cats_tax.value['story_category'])
        _cats_tax.value['story_category'].forEach((_tax: Category) => {
              if(_tax.term_id == catid){
                catName.value = _tax.name
              }
            }
          )
        }
    }

})



</script>

<template>
<div class="selectContainer">
  
  <template v-if="type === 'news'">
    <div class="cats_taxContainer selContainer">
      <select class="cats_taxList" @change="onSort">
        <option value="">{{ t('category') }}</option>
        <option v-if="locale === 'ja'" value="/news">{{ t('all') }}</option>
        <option v-else-if="locale === 'en'" value="/en/news">{{ t('all') }}</option>
        <option :value="urlLocale(`/news/category/${_cat.term_id}`)" v-for="_cat in _cats_tax.categories" :key="_cat.term_id" :selected="catid == _cat.term_id">{{ _cat.name }}</option>
        <option :value="urlLocale(`/news/font-type/${_tax.term_id}`)" v-for="_tax in _cats_tax.font_type" :key="_tax.term_id" :selected="catid == _tax.term_id">{{ _tax.name }}</option>
      </select>
      <span class="selBack"></span>
    </div>
    <div class="newsSortContainer selContainer">
        <select class="newsSortList" @change="onSort">
          <option :value="`${url_new}`">{{ t('new') }}</option>
          <option :value="`${url_old}`" :selected="sort==='old'">{{ t('old') }}</option>
        </select>
        <span class="selBack"></span>
      
    </div>
  </template>
  <template v-if="type === 'fontinuse'">
    <div class="cats_taxContainer selContainer">
      <select class="cats_taxList" @change="onSort">
        <option value="">{{ t('category') }}</option>
        <option value="/fontinuse">{{ t('all') }}</option>
        <option :value="urlLocale(`/fontinuse/scene/${_cat.term_id}`)" v-for="_cat in _cats_tax.scene" :key="_cat.term_id" :selected="catid == _cat.term_id">{{ _cat.name }}</option>
        <option :value="urlLocale(`/fontinuse/font-type/${_tax.term_id}`)" v-for="_tax in _cats_tax.font_type" :key="_tax.term_id" :selected="catid == _tax.term_id">{{ _tax.name }}</option>
      </select>
      <span class="selBack"></span>
    </div>
  </template>
  <template v-if="type === 'interviews'">
    <div class="cats_taxContainer selContainer">
      <select class="cats_taxList" @change="onSort">
        <option value="">{{ t('category') }}</option>
        <option value="/interviews">{{ t('all') }}</option>
        <option :value="urlLocale(`/interviews/category/${_cat.term_id}`)" v-for="_cat in _cats_tax.interview_category" :key="_cat.term_id" :selected="catid == _cat.term_id" v-html="_cat.name"></option>
        <option :value="urlLocale(`/interviews/font-type/${_tax.term_id}`)" v-for="_tax in _cats_tax.font_type" :key="_tax.term_id" :selected="catid == _tax.term_id">{{ _tax.name }}</option>
      </select>
      <span class="selBack"></span>
    </div>
  </template>
  <template v-if="type === 'story'">
    <div class="cats_taxContainer selContainer">
      <select class="cats_taxList" @change="onSort">
        <option value="">{{ t('category') }}</option>
        <option value="/story">{{ t('all') }}</option>
        <option :value="urlLocale(`/story/category/${_cat.term_id}`)" v-for="_cat in _cats_tax.story_category" :key="_cat.term_id" :selected="catid == _cat.term_id" v-html="_cat.name"></option>
        <option :value="urlLocale(`/story/font-type/${_tax.term_id}`)" v-for="_tax in _cats_tax.font_type" :key="_tax.term_id" :selected="catid == _tax.term_id">{{ _tax.name }}</option>
      </select>
      <span class="selBack"></span>
    </div>
  </template>
</div>
</template>

<style lang="scss" scoped>
.selectContainer{
  font-size:.875em;
  display: flex;
  gap:.5em;
}
.selContainer{
  position:relative;
}
.selBack{
  position:absolute;
  top:0;right:0;bottom:0;left:0;
  background-color: #f5f5f5;
  // z-index: -1;
  &:after{
    content:"";
    display: block;
    position:absolute;
    right:.5em;
    top:50%;
    transform:translateY(-50%);
    $bw : .7em;
    $aj : .6;
    border: {
      top:$bw solid #3a3a3a;
      right:$bw * $aj solid transparent;
      bottom:0 solid transparent;
      left:$bw * $aj solid transparent;
    }
  }
}

select{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border:1px solid #c7c7c7;
  background-color: transparent;
  padding:.5em 2em .5em 1em;
  color:#000;
  position: relative;
  z-index: 1;

}

.btn_sort{
  padding:.3em .7em;
  border:1px solid #c7c7c7;
  background-color: #f5f5f5;
}
</style>
