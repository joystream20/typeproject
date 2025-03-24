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
            <ul class="fnavList">
              <li class="fnavList-item">
                <NuxtLinkLocale :to="{name:'about'}">{{ t('company') }}</NuxtLinkLocale>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <small> <span class="tx1">Copyright (c) 2014-2024 Type Project.</span> <span class="tx1">All right reserved. /</span> <span class="tx1">Powered by REALTYPE.jp web font service.</span> </small>
    </div>
  </footer>
</template>

<style scoped lang="scss">
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.site{
  &-footer{
    text-align: center;
  }
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

@media screen and (min-width: #{calc($ww * 1px)}) { //782
  .site{
    &-footer{
      text-align:left;
      &__inner{
        &-top{
          display: flex;
          align-items:center;
          gap:1em;
        }
      }
    }
  }
}
</style>
