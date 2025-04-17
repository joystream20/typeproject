<script setup lang="ts">
import type { FontPost } from '../../types/type'
import { useHeaderSize } from '../../composables/useHeaderSize';
import { useRoute } from 'vue-router'

interface FontTerm {
  name:string;
  slug: string;
  description:string;
  terms:{id:number, name:string, slug:string,tax:string}[]
}

const config = useRuntimeConfig()
const {locale, t} = useI18n()
let langApi = config.public.wpApiKey
let langApiCumtom = config.public.wpApiCustom
let fonts_arr:Array<{id:string; tax:string[]}> = []
const sort_arr:Array<string> = []
const sort_back_arr:Ref<Array<string>> = ref([])
const sort_check_arr:Ref<Array<Array<{id:number,name:string,slug:string,tax:string}>>> = ref([])
const fonts_list_arr:Ref<Array<string>> = ref([])
const parent_check_arr:Ref<Array<boolean>> = ref([])
const stClass = changeClass();
const router = useRoute()

const {headerHeight} = useHeaderSize()

const headerH = computed(() => {
  // console.log(headerHeight.value)
  return headerHeight.value + "px"
})

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

// const _loading = ref(false)

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
        sort_check_arr.value.push(_tax.terms)
        // console.log(_tax.terms)
      }
    )
    // console.log(sort_check_arr)
    // console.log(_fontsAllTerm)

  }

  

  // console.log(fonts_arr)
})

onMounted(() => {
  // console.log('onMounted')
  // setTimeout(()=> {
  //   _loading.value = true
  // },1000)
  
  stClass.value = {type:"archive",cls:"fonts",lng:locale.value}
  // console.log(_posts)
  if(router.query.filter){
    const index = sort_check_arr.value.findIndex((fontGroup:{id:number,name:string,slug:string,tax:string}[]) => 
    fontGroup.some(font => font.slug === router.query.filter)
    );
    
    onSort(index,String(router.query.filter))
  }
  
  // console.log(sort_arr)
})

onBeforeRouteLeave(() => {
  selectedOptions.value = []
})

// onBeforeUnmount(() => {
//   console.log('beforeUnmounted')
//   _loading.value = false
// })
type Result = {
  parentName: string;
  parentDescription: string;
  termName: string;
}
const resultArr = ref<Result[]>([]);
const selectedOptions = useState<Result[]>('selectedOptions', () => [])


const onSort = (index:number, slug:string) => {
  // console.log(index,slug)
  // console.log(fonts_arr)
  
  resultArr.value = []
  selectedOptions.value = []
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

    // console.log(sort_arr)

    sort_arr.forEach(sortString => {
      if(sortString){
        if(_fontsAllTerm.value){
          _fontsAllTerm.value.forEach(parent => {
            const matchTerm = parent.terms.find(term => term.slug === sortString)
            if(matchTerm){
              resultArr.value.push({
                parentName: parent.name,
                parentDescription: parent.description,
                termName: matchTerm.name
              })
              selectedOptions.value.push({
                parentName: parent.name,
                parentDescription: parent.description,
                termName: matchTerm.name
              })
            }
          })
        }
      }
    })
    // console.log(resultArr.value)
    // console.log(sort_arr)
   
  },100)

  //何もしてない
  // fonts_arr.forEach(
  //   _font => {
      
  //     setTimeout(()=>{
  //       if(sort_arr[index] === slug){
         
  //       }
  //     },100)
      
  //   }
  // )
  
}

// const onFilterFonts = () => {
  
//   return _posts.filter(_p => {fonts_list_arr.value.includes(_p.id)})
//   // return fonts_list_arr.includes(id)
// }
const openState = ref<boolean[]>(
  _fontsAllTerm.value ? _fontsAllTerm.value.map(() => true) : [])

const isOpen = (index:number) => {
  return openState.value[index] || false
}

const toggleInputList = (index:number):void => {
  openState.value[index] = !openState.value[index]
}

const repBr = (txt:string):string => {
  const _t = txt.replace('・', '<br>')
  return `<span>${_t}</span>`
}

</script>

<template>
  <div class="is-layout-constrained has-global-padding">
    <div class="alignwide page__container">

      <div class="contentsContainer u_d_fl _rs">
        <div class="termContainer">

          <div class="btnFilterContainer">
            <a href="" class="btnFilterContainer-btn">
              <span class="txt">{{ t('filter') }}</span>
              <span class="plus"></span>
            </a>
          </div>

          <div class="termList" v-for="(tax,index) in _fontsAllTerm" :key="index">
            
            <h3 class="termList-ttl" :class="{'on' :isOpen(index),'sel':sort_arr[index]}" @click="toggleInputList(index)">{{locale === 'ja' ? tax.name : tax.description }}
              <span class="btn"></span>
            </h3>


                <div class="inputListContainer" :class="{'on' :isOpen(index)}">
                  <ul class="inputList" :class="`tax_${tax.slug}`">
                    <li class="inputList-item" :class="`term_${term.slug}`" v-for="term in tax.terms" :key="term.id">
                      <div class="input"><input :name="tax.slug" :id="term.slug" type="radio" :value="term.slug"  v-model="sort_back_arr[index]" ><label @click="() => onSort(index, term.slug)" :for="term.slug" class="txt"><span class="tx" v-html="tax.slug === 'sort' ? repBr(term.name) : term.name"></span></label></div>
                      <!-- v-model="sort_arr[index]" -->
                    </li>
                  </ul>
                </div>
             
      
          </div>
        </div>
        <div class="fontListContainer  u_fx1">
          <ul v-if="_posts" class="fontList" :style="`top:calc(${headerH}`">
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

.page{
  &__container{
    position:relative;
    // padding-top:calc(clamp(1.25rem, 0.559rem + 2.95vw, 2rem) + 1em);
  }
  &__header{
    padding:.5em 0;
    border:none;
    background-color: #eee;
    width:100%;
    top:0;
    left:0;
    position:fixed;
    z-index: 10;
    display: block;
    opacity:1;
    &-inner{
      display: flex;
      max-width:1440px;
      margin-left: auto;
      margin-right: auto;
      // justify-content: space-between;
      align-items: center;
    }

    &-ttl{
      font-size:clamp(1.125rem, 0.549rem + 2.46vw, 1.75rem);
      line-height: 1;
      min-width: 8em;
    }
  }
  
}
.input{
    
    input[type=radio]{
      display: none;

      &:checked{
        & + .txt{
          &:before{
            background-color: #38cbd6;
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
        width:.85em;
        aspect-ratio: 1/1;
        border:1px solid;
        display: block
      }
    }
}
.contentsContainer{
  // margin-top:1em;
  // background-color: #eee;
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
      cursor: pointer;
      display: flex;
      align-content: center;
      justify-content: space-between;
      &.sel{
        color:#38cbd6;
      }
      .btn{//b3b3b3
        width:1em;
        height: 1em;
        border:1px solid #909090;
        border-radius: 0;
        padding:2px;
        position:relative;
        display: block;
        &:before{
          content: "";
          width:70%;
          height: 1px;
          background-color: #909090;
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          z-index: 1;
        }
        &::after{
          content:"";
          height: 70%;
          width:1px;
          background-color: #909090;
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);

        }
        
      }
      &.on{
          .btn{
            &::after{
              opacity: 0;
            }
          }
        }
    }

    .inputListContainer {
      overflow: hidden;
      max-height: 0;
      transition: max-height .7s ease;
      &.on{
        max-height: 400px;
      }
    }
  }
  .inputList{
    padding-left:.7em;
    font-size:.875em;
    > * + * {
      margin-top:.1em;
    }
    
    &.tax_sort{
      > * + * {
      margin-top:.5em;
    }
      .inputList-item{
        .tx{
          display: flex;
          align-items: center;
          line-height: 1.1;
          gap:3px;

          &:before{
          content:"";
          aspect-ratio: 1/1;
          width:1.5em;
          display: block;
          background-size:contain;
          background-repeat: no-repeat;
        }
        }
      }
      .term_sort1{
        .tx{
          &:before{
            background-image:url(../../assets/images/img_fonts_category_s1.png);
          }
        }
      }
      .term_sort2{
        .tx{
          &:before{
            background-image:url(../../assets/images/img_fonts_category_s2.png);
          }
        }
      }
      .term_sort3{
        .tx{
          &:before{
            background-image:url(../../assets/images/img_fonts_category_s3.png);
          }
        }
      }
      .term_sort4{
        .tx{
          &:before{
            background-image:url(../../assets/images/img_fonts_category_s4.png);
          }
        }
      }
    }
  }
}

.fontList{
  display: flex;
  flex-wrap:wrap;
  gap:20px;
  position:sticky;

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

.selectContainer{
  &__inner{
    display: flex;
    gap:0 1em;
    flex-wrap: wrap;
    font-size:.75em;
  }
  &-item{
     .parent{
      color:#38cbd6;
      display: none;
     } 
    }
}

.btnFilterContainer{
   &-btn{
    display: flex;
    align-content: center;
    line-height: 1;
    gap:.5em;
    .txt{

    }
    .plus{
      width:1em;
      height:1em;
      position:relative;
      &:before,
      &:after{
        content:"";
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background-color: #909090;
      }
      &:before{
        width:70%;
        height:1px;
      }
      &:after{
        height:70%;
        width:1px;
      }
    }
    &.on{
      .plus{
        &::after{
          display: none;
        }
      }
    }
   }
  }


@media screen and (max-width: #{calc($ww * 1px)}) {
  .contentsContainer{

  .termContainer{
    margin-left:calc(var(--wp--style--root--padding-left) * -1);
    max-height: calc(100vh - v-bind(headerH));
    padding-left:var(--wp--style--root--padding-left);
    overflow-y: auto;
    width:45%;
  }
}
}



@media screen and (min-width: #{calc($ww * 1px)}) {
  .btnFilterContainer{
    // display: none;
  }
  .page{
    &__header{
      &-ttl{
        width:clamp(220px, 20%, 280px);
      }
    }
  }
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
    background-color: transparent;
  }
}

.selectContainer{
  &__inner{
    font-size:.8em;
  }
  &-item{
     .parent{
      display: inline;
     } 
    }
}
}
</style>
