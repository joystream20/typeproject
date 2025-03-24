<script setup lang="ts">
import type { FontPost } from '../../types/type'
import { useHeaderSize } from '@/composables/useHeaderSize';

interface FontTerm {
  name:string;
  slug: string;
  terms:{id:number, name:string, slug:string,tax:string}[]
}[]

const config = useRuntimeConfig()
const {locale, t} = useI18n()
let langApi = config.public.wpApiKey
let langApiCumtom = config.public.wpApiCustom
let fonts_arr:Array<{id:string; tax:string[]}> = []
const sort_arr:Array<string> = []
const sort_back_arr:Ref<Array<string>> = ref([])
const fonts_list_arr:Ref<Array<string>> = ref([])
const stClass = changeClass();

// const headerHeight = useHeaderSize()

if(locale.value === 'en'){
  langApi = config.public.wpApiKeyEn
  langApiCumtom = config.public.wpApiCustomEn
}

const {data: _posts, status:_status, error:_error} = await useFetch<FontPost[]>(`${langApi}/fonts?context=embed&per_page=100`)
  if (_error.value) {
    console.error('Error fetching data:', _error.value);
  } else {
    
  }
const {data: _fontsAllTerm, status:_fonts_all_term_st, error:_fonts_all_term_error} = await useFetch<FontTerm[]>(`${langApiCumtom}/fonts_all_terms`)
  if (_fonts_all_term_error.value) {
    console.error('Error fetching data:', _fonts_all_term_error.value);
  } else {
    
  }

onBeforeMount(() => {
  // console.log('before mount')
  // console.log(_posts.value)
  if(_posts.value){
    _posts.value.forEach((_font:FontPost) => {
        const {id, tax_info} = _font

        fonts_list_arr.value.push(id)
        const _arr:string[] = [];
        tax_info.forEach(
          
          _taxs => {
            _taxs.terms.forEach(
              _tax => {
                _arr.push(_tax.slug)
              }
            )
          }
        )
        fonts_arr.push({id:id,tax:_arr})
    });
  }
  // console.log(fonts_list_arr.value)

  if(_fontsAllTerm.value){
    _fontsAllTerm.value.forEach(
      _tax => {
        sort_arr.push("")
        sort_back_arr.value.push("")
      }
    )
  }

  // console.log(fonts_arr)
})

onMounted(() => {
  stClass.value = {type:"archive",cls:"fonts",lng:locale.value}
  console.log(_posts)
})

const onSort = (index:number, slug:string) => {
  // console.log(index,slug)
  // console.log(fonts_arr)
  setTimeout(() => {
    // console.log(sort_arr.value[index])
    if(sort_arr[index] === slug){
      sort_arr[index] = ""
      sort_back_arr.value[index] = ""
    }else{
      sort_arr[index] = slug
      sort_back_arr.value[index] = slug
    }
    // const _sort_arr = [...sort_arr]
    const _sort_arr = sort_arr.filter(Boolean)
    const judge_arr:string[] = []
    fonts_arr.forEach(
      _font => {
        if(_sort_arr.every(_f => _font.tax.includes(_f))){
          judge_arr.push(_font.id)
        }
      }
    )
    fonts_list_arr.value = judge_arr
   
  },100)

  fonts_arr.forEach(
    _font => {
      
      setTimeout(()=>{
        if(sort_arr[index] === slug){
         
        }
      },100)
      
    }
  )
  
}

// const onFilterFonts = () => {
  
//   return _posts.filter(_p => {fonts_list_arr.value.includes(_p.id)})
//   // return fonts_list_arr.includes(id)
// }

</script>

<template>
  <div class="is-layout-constrained has-global-padding">
    <div class="alignwide">
      <h1>{{t('fontlist')}}</h1>
      <div class="contentsContainer u_d_fl _rs">
        <div class="termContainer">
          <div class="termList" v-for="(tax,index) in _fontsAllTerm" :key="index">
            <h3 class="termList-ttl">{{ tax.name }}</h3>
      
              <ul class="inputList">
                <li class="inputList-item" v-for="term in tax.terms" :key="term.id">
                  <div class="input"><input :name="tax.slug" :id="term.slug" type="radio" :value="term.slug"  v-model="sort_back_arr[index]" ><label @click="() => onSort(index, term.slug)" :for="term.slug" class="txt"><span class="tx">{{ term.name }}</span></label></div>
                  <!-- v-model="sort_arr[index]" -->
                </li>
              </ul>
      
          </div>
        </div>
        <div class="fontListContainer  u_fx1">
          <ul v-if="_posts" class="fontList">
            <li :class="`fontList-item font_${font.id} font_${font.slug}`" v-for="font in _posts.filter(_p => fonts_list_arr.includes(_p.id))" :key="font.id" >
          <div class="image">
            <NuxtLinkLocale :to="`/fonts/${font.slug}`">
              <NuxtImg :src="`${font.thumbnail.url}`" :alt="`${font.title.rendered}`" width="246" loading="lazy" format="webp" />
              <span class="back" :style="font.acf.hover_style">
                <NuxtImg :src="`${font.thumbnail.url}`" :alt="`${font.title.rendered}`" width="246" loading="lazy" format="webp" />
              </span>
            </NuxtLinkLocale>
          </div>
          <p class="fontList-item-name">{{ font.title.rendered }}</p>
        </li>
      </ul>
      
        </div>
      
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.input{
    
    input[type=radio]{
      display: none;

      &:checked{
        & + .txt{
          &:before{
            background-color: #777;
          }
        }
      }
    }
    .txt{
      display: flex;
      gap:.5em;
      align-items: center;

      &:before{
      content:"";
      width:.7em;
      aspect-ratio: 1/1;
      border:1px solid;
      display: block
    }
    }
}
.contentsContainer{
  margin-top:1em;
  .termContainer{
    position:fixed;
    z-index: 1;
    padding: 1em 1em 1em 0;
    background-color: rgba(#f4f4f4, .95);
    // height:calc(100vh);
    > * + * {
      margin-top:1.2em;
    }
  }
  .termList{
    &-ttl{
      font-size:1.125em;
      font-weight: normal;
    }
  }
  .inputList{
    padding-left:.7em;
    font-size:.875em;
  }
}

.fontList{
  display: flex;
  flex-wrap:wrap;
  gap:20px;
  &-item{
    flex-basis: calc(50% - 10px);
    
    img{
      width:100%;
    }
    a{
      display: block;
      position:relative;
      overflow: hidden;
      &:hover{
        // img{
        //   filter: invert(1);
        // }
        .back{
          opacity:1;
          clip-path: inset(0);
        }
      }
      .back{
        img{
          filter:invert(1);
        }
        position:absolute;
        top:0;left:0;
        width:100%;
        height: 100%;
        clip-path: inset(96% 0 0 0);
        transition:clip-path .3s ease-in-out, opacity .3s;
      }
    }
    
  }
}

@media screen and (min-width: #{calc($ww * 1px)}) {
  .fontList{
    gap:12px;
    &-item{
      flex-basis:calc(100% / 4 - 9px);
    }
  }
  .fontListContainer{
    flex:1;
  }
  .contentsContainer{
  .termContainer{
    width:clamp(220px,20%,280px);
    position:relative;
  }
}
}
</style>
