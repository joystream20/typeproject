<script setup lang="ts">
import { useWindowSize } from '@/composables/useWindowSize';
const windowSize = useWindowSize()

import { useHeaderSize } from '@/composables/useHeaderSize';
const {headerHeight} = useHeaderSize()

const config = useRuntimeConfig()
const defaultFont = ref<string>(config.public.defaultFontFamily)
// const site = ref<HTMLElement | null>(null)



const { isMobile, isTablet, isDesktop } = useDevice()
// import { ClassType } from './types/type'

const stClass = changeClass();

useHead({
  title:`${config.public.siteTitle}`,
  // link: [
  //   {
  //     rel: "stylesheet",
  //     href: "https://use.typekit.net/lgp4oyp.css"
  //   }
  // ]
})

let dv = ref<string>("other")

  if(isMobile){
    dv.value = "mobile"
  }else if(isTablet){
    dv.value = "table"
  }else if(isDesktop){
    dv.value = "other"
  }
const txt = "asdf"


const headerH = computed(() => {
  // console.log('use header')
  return headerHeight.value + "px"
})

// console.log(windowSize.value)
onMounted(() => {
  // headerHeight = useHeaderSize(site.value)
  // console.log(headerHeight.value)
  // const script = document.createElement('script');
  // script.src = 'https://font.realtype.jp/api/script/v4?rt-input=true&rt-nofliker=true&rt-manual=false&rt-cache=true&rt-layout=true&rt-user=xfabeMF7lgt6U3zLVEC31IIBywNVt4Xm';
  // document.head.appendChild(script);
  // RT.start(
  //   function(){
  //     console.log('error')
  //   },
  //   function(){
  //     console.log('load')
  //   }
  // )
})
onUnmounted(() => { 
  // console.log('unmounts')
})
onBeforeMount(() => { 
  // console.log('beforeMount') 
})
onBeforeUpdate(() => { 
  // console.log('beforeupdate')
 })
onUpdated(() => { 
  // console.log('updated')
 })
onActivated(() => { 
  // console.log('onactive')
 })

</script>
<template>
  <div :class="`site ${stClass.lng} ${dv} ${stClass.type} ${stClass.cls}`" ref="site" :style="{fontFamily:defaultFont}">
    <Header />
    <!-- <p class="av">{{ txt }}</p> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </div>
</template>

<style lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;

.page-enter-active,
.page-leave-active{
  transition:all 0.5s;
}

.page-enter-from,
.page-leave-to{
  opacity:0;
  filter: blur(.2rem);
}


:root{
  --headerH:v-bind(headerH);
}

ul{
  list-style: none;
  margin:0;
  padding:0;
}
a{
  color:inherit;
  text-decoration: none;
}
body{
  //font-size:clamp(0.875rem, 0.785rem + 0.38vw, 1rem);//896
  font-size:clamp(0.875rem, 0.76rem + 0.49vw, 1rem);//782
}
// .av{
//   padding-top:v-bind(aa);
// }


.site{
  padding-top: v-bind(headerH);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  // font-family: v-bind(defaultFont);
}

.single{
  &.fontinuse{
    .contentsContainer{
      .txtContainer{
        margin-top:15%;
      }
    }
  }
}

.page{
    &.history{
      .historyColumn{
        &__right{
          &-box{
            padding-top:calc(v-bind(headerH) + 1em);
            margin-top:calc((v-bind(headerH)) * -1);;
          }
        }
      }
    }
  }

@media screen and (min-width: #{calc($ww * 1px)}) { //897
  .page{
    &.history{
      .historyColumn{
        &__left{
          &-listContainer{
            top:v-bind(headerH);
          }
        }
        &__right{
          &-box{
            padding-top:calc(v-bind(headerH) + 1em);
            margin-top:calc((v-bind(headerH)) * -1);;
          }
        }
      }
    }
  }
  .single{
    &.fontinuse{
      .contentsContainer{
        .txtContainer{
          top:v-bind(headerH);
        }
      }
    }
  }
}
</style>
