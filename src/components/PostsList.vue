<script setup lang="ts">
import type { Post } from '../types/type'

type Props = {
  posts: Post[],
  type: string
}

const { posts, type } = defineProps<Props>()

onMounted(() => {

})

</script>

<template>
<ul class="postList" v-if="posts && posts.length">
  <li class="postList-item" v-for="post in posts" :key="post.id">
    <div class="image">
      <NuxtLinkLocale :to="`/${type}/${post.slug}`">
      <NuxtImg v-if="post.thumbnail.url" :src="`${post.thumbnail.url}`" :alt="`${post.title.rendered}`" width="246" format="webp" loading="lazy" />
      <img v-else src="@/assets/images/img_def.png" alt="" />
    </NuxtLinkLocale>
    </div>
    <div class="txtContainer">
      <!-- <p class="ttl">{{ post.title.rendered }}</p> -->
      <p class="ttl" v-html="post.title.rendered"></p>
      <div class="catContainer">
        <div v-if="type === 'interviews'" class="u_d_fl u_gp-5_e" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'interview_category'" class="scene u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/category/${term.id}`"><span v-html="term.name"></span></NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-if="type === 'story'" class="u_d_fl u_gp-5_e" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'story_category'" class="scene u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/category/${term.id}`"><span v-html="term.name"></span></NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-if="type === 'fontinuse'" class="u_d_fl u_gp-5_e" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'scene'" class="scene u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-else-if="type === 'news'" class="u_d_fl u_gp-5_e">
          <ul class="font_type u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="tax in post.tax_info" :key="tax.id">
                <NuxtLinkLocale :to="`/${type}/font-type/${tax.id}`">{{ tax.name }}</NuxtLinkLocale>
              </li>
            </ul>
            <ul class="category u_d_fl u_fl_w_w u_gp-2_e">
              <li v-for="cat in post.categories_info" :key="cat.id">
                <NuxtLinkLocale :to="`/${type}/category/${cat.id}`">{{ cat.name }}</NuxtLinkLocale>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </li>
</ul>
</template>

<style lang="scss" scoped>
.postList{
  &-item{
    flex-basis: calc(25% - 18px);
    .txtContainer{
      margin-top:.5em;
    }
    .ttl{
      font-size:max(.875em, 13px);
    }
    .catContainer{
      font-size:.75em;
      margin-top:.3em;
    }
  }
}
</style>
