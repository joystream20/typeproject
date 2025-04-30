<script setup lang="ts">
import type { PostTopNews } from 'src/types/type';

const { $formatDate } = useNuxtApp()
type Props = {
  newsPosts: PostTopNews[]
}

const {newsPosts} = defineProps<Props>()

const format_date = (date:string):string => {
  return $formatDate(date,"YYYY.M/D")
}
  onMounted(() => {
  })

</script>
<template>
<div v-cloak>
  <ul class="newsList">
    <li class="newsList-item" v-for="(post, index) in newsPosts" :key="index">
      <div class="dateContainer">
        <div class="catContainer u_d_fl">
          <p class="date">{{ format_date(post.date) }}</p>
          <ul class="catList">
            <li class="catList-item" v-for="cat in post.categories_info" :key="cat.id">
              <NuxtLinkLocale :to="`/news/category/${cat.id}`">{{ cat.name }}</NuxtLinkLocale>
            </li>
            <li class="catList-item" v-for="tax in post.tax_info" :key="tax.id">
              <NuxtLinkLocale :to="`/news/font-type/${tax.id}`">{{ tax.name }}</NuxtLinkLocale>
            </li>
          </ul>
        </div>
      </div>
      <p><NuxtLinkLocale :to="`/news/${post.slug}`">{{ post.title.rendered }}</NuxtLinkLocale></p>
    </li>
  </ul>
</div>
</template>
<style lang="scss" scoped>
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.newsList{
  // border-top: 1px solid #b3b3b3;
  &-item{
    padding:1em 0;
    border-bottom: 1px solid #b3b3b3;
    .dateContainer{
      margin-bottom:.5em;
    }
  }
}
.catContainer{
  flex-direction: column;
  gap:.2em;

  .date{
    font-size:.75em;
  }
}
.catList{
  display: flex;
  gap:.5em;
  flex-wrap:wrap;
  &-item{
    font-size: .6875em;
    .dateContainer{
      margin-bottom: 0;
    }
    a{
      border:1px solid #cdcdcd;
      display: inline-block;
      padding:.5em .7em;
      line-height: 1;
      display: block;
    }
  }
}

@media screen and (min-width: #{calc($ww * 1px)}) { 
  .catContainer{
    flex-direction: row;
    gap:1em;
    align-items: center;
  }
  .catList{
  &-item{
    a{

    }
  }
}
}
</style>
