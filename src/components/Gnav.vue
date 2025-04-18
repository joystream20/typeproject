<script setup lang="ts">
const {t} = useI18n()

const set_locale = (lang:'ja' | 'en'):void => {
  const { $i18n } = useNuxtApp() // NuxtAppからi18nインスタンスを取得
  if ($i18n) {
    $i18n.setLocale(lang)
  }
}

// const _state = defineModel<boolean | null>()


</script>

<template>
  <nav class="gnav ">
    <!-- <ul class="gnavList ">
      <li class="gnavList-item">
        <NuxtLinkLocale :to="{name:'news'}">{{t('news')}}</NuxtLinkLocale>
      </li>
      <li class="gnavList-item">
        <NuxtLinkLocale :to="{name:'fonts'}">{{t('fonts')}}</NuxtLinkLocale>
      </li>
      <li class="gnavList-item">
        <NuxtLinkLocale :to="{name:'service'}">{{t('service')}}</NuxtLinkLocale>
      </li>
      <li class="gnavList-item">
        <NuxtLinkLocale :to="{name:'fontinuse'}">{{t('fontinuse2')}}</NuxtLinkLocale>
      </li>
      <li class="gnavList-item">
        <NuxtLinkLocale :to="{name:'about'}">{{ t('company') }}</NuxtLinkLocale>
      </li>
    </ul> -->
    <div class="gnav__rightContainer">
      <div class="langContainer ">
        <button @click="set_locale('ja')">JA</button>
        <span class="bar"></span>
        <button @click="set_locale('en')">EN</button>
      </div>
      <div class="socialContainer">
        <a class="btn_x" href="">
          <font-awesome :icon="['fab', 'x-twitter']" />
        </a>
        <a class="btn_fa" href="">
          <font-awesome :icon="['fab', 'facebook-f']" />
        </a>
        <a class="btn_ins" href="">
          <font-awesome :icon="['fab', 'instagram']" />
        </a>
      </div>
      <div class="cartContainer">
        <a href="">
          <font-awesome :icon="['fas', 'cart-shopping']" />
          <span class="txt">ストア</span>
        </a>
      </div>
      
    </div>
  </nav>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.gnav{
  display: flex;
  align-items: center;
  gap:2em;
  font-size:clamp(0.875rem, 0.461rem + 0.86vw, 1rem);
  
  &__rightContainer{
    display: flex;
    align-items: center;
    gap:.5em;
    @media screen and (max-width: #{calc($ww * 1px)}) { 
    display: none;
  }
  }
}
.gnavList{
  display: flex;
  gap:1em;
  // &-item{
    
  // }
}

.socialContainer{
  display:flex;
  gap:.3em;
  align-items: center;
  >a{
    display: flex;
    align-items: center;
    justify-content: center;
    width:1.4em;
    height: 1.4em;
    background:#000;
    color:#fff;
    border-radius: 50%;
    font-size:1em;
    svg{
      fill:#fff;
      // height:1em
    }
  }
}
.cartContainer{
  padding-left:.5em;
  border-left:1px solid;
  >a{
    font-size:1.1em;
    display: flex;
    align-items: center;
    gap:.3em;
    .txt{
      font-size:.9em;
      @media screen and (max-width: #{calc($wx * 1px)}) { 
        // display: none;
      }
    }
  }
}
.langContainer{
  display: flex;
  align-items: center;
  button{
    border:none;
    background: transparent;
    font-size:.75em;
  }
  .bar{
    display: inline-block;
    width:1px;
    height: .7em;
    background-color: #000;
  }
}
</style>
