<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';

const stClass = changeClass();
const {locale,t} = useI18n()
const route = useRoute()
const _state = ref<boolean | null>(null)


const store_url = ref<string>('https://shop.typeproject.com/')
watch(()=> _state.value, (newState) => {
  // console.log(newState)
})

watch(route, (newRoute)=>{
  // console.log(newRoute.path)
  // console.log(locale.value)
  _state.value = false
  if(locale.value === 'en'){
    store_url.value = 'https://shop.typeproject.com/en/'
  }else{
    store_url.value = 'https://shop.typeproject.com/'
  }
})

const btnClick = () => {
  _state.value = !_state.value
  // console.log('click', _state.value)
}

if(locale.value === 'en'){
  store_url.value = 'https://shop.typeproject.com/en/'
}

type Result = {
  parentName: string;
  parentDescription: string;
  termName: string;
}

const selectedOptions = useState<Result[]>('selectedOptions', () => [])

const isFontsPage = computed(() => route.path.endsWith('/fonts'))

</script>

<template>

  <header id="site-header" class="site-header">
    <div class="site-header__inner">
      <h1 class="logo" v-if="stClass.cls === 'home'">
        <NuxtLinkLocale :to="`/`">
        <img src="@/assets/images/logo.svg" alt="type project" width="195">
        </NuxtLinkLocale>
      </h1>
      <p class="logo" v-else>
        <NuxtLinkLocale :to="`/`">
        <img src="@/assets/images/logo.svg" alt="type project" width="195">
        </NuxtLinkLocale>
      </p>
      <div class="navContainer u_d_fl">
        <Gnav v-model="_state" />
        <div id="btn_hm" class="btn_hm" :class="{'on': _state, 'off': !_state && _state !== null}" @click="btnClick()">
          <div class="btn_inner">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="fonts_page__header" v-if="isFontsPage">
      <!-- {{ selectedOptions }} -->
      <div class="fonts_page__header-inner">
          <h1 class="fonts_page__header-ttl u_f_bd">{{t('fontlist')}}</h1>
          <div class="selectContainer">
            <div class="selectContainer__inner" v-if="selectedOptions.length > 0">
              <div class="selectContainer-item" v-for="(res, index) in selectedOptions" :key="index">
                <span class="parent"><span class="tx">{{ locale === 'en' ? res.parentDescription :  res.parentName }}</span><span class="spa">:</span></span>
                <span class="child">{{ res.termName }}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    <div class="hmMenuContainer" :class="{'on': _state}">
      <div class="hmMenuContainer__inner">
        <ul class="navList">
          <li class="navList-item">
            <NuxtLinkLocale :to="`/`">{{ t('home') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'fonts'}">{{ t('fonts') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'service'}">{{ t('service') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'case_study'}">{{ t('case') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'news'}">{{ t('news') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'letterspace'}">{{ t('letterspace') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'about'}">{{ t('company') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <NuxtLinkLocale :to="{name:'support'}">{{ t('support') }}</NuxtLinkLocale>
          </li>
          <li class="navList-item">
            <a :href="store_url" target="_blank">{{ t('store') }}</a>
          </li>
        </ul>
        <div class="hmMenuContainer-back" @click="btnClick()"></div>
      </div>
      
    </div>
  </header>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;

.logo{
  width:clamp(8.125rem, -5.323rem + 28.02vw, 12.188rem);
}
.fonts_page{
  &__header{
    padding:.5em 0;
    border:none;
    background-color: #eee;
    width:100%;
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

    .selectContainer{
      &__inner{
        display: flex;
        gap:0 1em;
        flex-wrap: wrap;
        font-size:.75em;
      }
      &-item{
        .parent{
          display: none;
          .tx{
            color:#38cbd6;
          }
          .spa{
            padding: 0 2px;
          }
        } 
        }
    }
  }
}
@media screen and (min-width: #{calc($ww * 1px)}) {
  .fonts_page{
    &__header{
      &-ttl{
        width:clamp(220px, 20%, 280px);
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
  }
}
</style>
