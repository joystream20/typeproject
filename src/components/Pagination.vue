<script setup lang="ts">

type Props = {
  numPages:number,
  current: number,
  total: number,
  urlSlug: string,
  sort?:string
}
const {numPages, current, total, urlSlug, sort} = defineProps<Props>()

const start_num = ref(1)
const last_num = ref(3)

const _next_url  = ref('')
const _prev_url = ref('')

const pages = computed(():any => {
  const value = (numPages - 1) / 2
  let start = current - Math.floor(value)
  let last = current + Math.ceil(value)
  // console.log('start='+start,'last='+last)

  // console.log('pager num:'+numPages, value, 'total:'+total, 'cur:'+current)
  // console.log('url_srug='+urlSlug)

  if(total <= numPages){
    //最終ページが5以下
    start = 1
    last = total
  }else if(current <= 1 + Math.floor(value)){
    //1~3papge
    // console.log("1~3papge",numPages,current,Math.floor(value))
    start = 1
    last = numPages
  }else if(current >= (total - Math.ceil(value))){
    //最終ページ - 2 ~ 最終ページは最終 - 4 ~ 最終ページ
    // console.log("最終ページ - 2 ~ 最終ページは最終 - 4  ~ 最終ページ",current,Math.ceil(value),total)
    start = total - numPages + 1
    last = total
  }else{
    // console.log('usual')
  }

  let pages = []

  for(let i = start; i <= last; i++){
    pages.push(i)
  }

  start_num.value = start
  last_num.value = last

  // console.log(pages)

  return pages
})

const first = computed(():(string | boolean) => {
  if(start_num.value > 1){
    return  `/${urlSlug}/page/1`
  }else{
    return false
  }
})

const last = computed(():(string | boolean) => {
  if(last_num.value  < total){
    return `/${urlSlug}/page/${total}`
  }else{
    return false
  } 
})

const prevDot = computed(():boolean => {
  return start_num.value > 1
})

const nextDot = computed(():boolean => {
  return last_num.value  < total
})

const nextLink = computed(():string => {
  // console.log(current, last_num.value)
  if(current < last_num.value) {
    let _param:string = String(Number(current) + 1)
    if(sort === 'old'){
      _param += '?sort=old'
    }
    // console.log('nextLink='+_param,current)
    return _param
  }
  return ''
})

const prevLink = computed(():string =>{
  // console.log(current)
  if(current > 1){
    let _param:string = String(Number(current) - 1)

    if(sort === 'old'){
      _param += '?sort=old'
    }
    return _param
  }
  return ''
} )

const itemLink = (id:string):string => {
  let _item:string = `/${urlSlug}/page/${id}`
  
  if(sort === 'old'){
    _item += '?sort=old'
  }
  // console.log('itemLink='+_item)
return _item
}


onMounted(() => {
  
})





</script>

<template>
  <div class="pagerContainer">
      <NuxtLinkLocale class="prev" v-if="prevLink" :to="`/${urlSlug}/page/${prevLink}`">&lt;</NuxtLinkLocale>
      <span class="emp" v-else></span>
      <ul class="pageList">
        <li class="pageList-page" v-if="first"><NuxtLinkLocale  :to="`${first}`">1</NuxtLinkLocale></li>
        <li class="pageList-page dot" v-if="prevDot">...</li>
        <li class="pageList-page" v-for="i in pages" :key="i">
          <!-- <NuxtLinkLocale v-if="i != current" :to="`/${urlSlug}/page/${i}`">{{ i }}</NuxtLinkLocale> -->
          <NuxtLinkLocale v-if="i != current" :to="`${itemLink(i)}`">{{ i }}</NuxtLinkLocale>
          <span class="current" v-else>{{ i }}</span>
        </li>
        <li class="pageList-page dot" v-if="nextDot">...</li>
        <li class="pageList-page" v-if="last"><NuxtLinkLocale :to="`${last}`">{{ total }}</NuxtLinkLocale></li>
      </ul>
      <NuxtLinkLocale class="next" v-if="nextLink" :to="`/${urlSlug}/page/${nextLink}`">&gt;</NuxtLinkLocale>
      <span class="emp" v-else></span>
    </div>
</template>
