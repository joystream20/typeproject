<script setup lang="ts">
const {locale,t} = useI18n()

</script>

<template>
  <footer class="site-footer has-global-padding">
    <div class="site-footer__inner">
      <div class="site-footer__inner-top">
        <p class="logo">
          <NuxtLinkLocale :to="`/`">
          <img src="@/assets/images/logo.svg" alt="type project" width="195">
          </NuxtLinkLocale>
        </p>
        <div class="fnavContainer">
          <nav class="fnav">
            <ul class="fnavList u_d_fl">
              <li class="fnavList-item">
                <NuxtLinkLocale :to="{name:'news'}">{{ t('news') }}</NuxtLinkLocale>
              </li>
              <li class="fnavList-item">
                <NuxtLinkLocale :to="{name:'about'}">{{ t('company') }}</NuxtLinkLocale>
              </li>
              <li class="fnavList-item">
                <NuxtLinkLocale :to="{name:'support'}">{{ t('support') }}</NuxtLinkLocale>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <p class="copy"><small> <span class="tx1">Copyright (c) 2014-2024 Type Project.</span> <span class="tx1">All right reserved. /</span> <span class="tx1">Powered by REALTYPE.jp web font service.</span> </small></p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.site{
  &-footer{
    text-align: center;
    &__inner{
        &-top{
          display: flex;
          align-items:center;
          gap:1em;
          flex-direction: column;
        }
      }
      .copy{
      line-height: 1.2;
      margin-top:1em;
      font-size:.75em;
    }

    .tx1{
      display: inline-block;
      white-space: nowrap;
    }

    .logo{
      img{
        width:clamp(9.375rem, -0.714rem + 20.64vw, 12.188rem);
        display:inline-block
      }
    }
    .fnavContainer{
      font-size:.75em;
    }
  }
}



@media screen and (min-width: #{calc($ww * 1px)}) { //782
  .site{
    &-footer{
      text-align:left;
      &__inner{
        &-top{
          flex-direction: row;
        }
      }
      .copy{
        margin-top:0;
      }
    }
  }
}
</style>
