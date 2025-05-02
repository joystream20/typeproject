<script setup lang="ts">
import type { Post } from '../types/type'

type Props = {
  posts: Post[],
  type: string
}

const { posts, type } = defineProps<Props>()

onMounted(() => {
// console.log(posts)
})

</script>

<template>
<ul class="postList" v-if="posts && posts.length">
  <li class="postList-item" v-for="post in posts" :key="post.id">
   
    <div class="image">
     <!-- <p v-if="post.acf">{{ post.acf.link }}</p> -->
      <a v-if="post.acf && post.acf.link" :href="`${post.acf.url}`" target="_blank">
        <NuxtImg 
        v-if="post.thumbnail.url_s" 
        :src="`${post.thumbnail.url_s}.webp`" 
        :alt="post.title.rendered"
        :width="post.thumbnail.imgW"
        :height="post.thumbnail.imgH"
        format="webp" 
        loading="lazy" />
        <img v-else src="@/assets/images/img_def.png" alt="" />
      </a>
      <NuxtLinkLocale v-else :to="`/${type}/${post.slug}`">
        <NuxtImg 
        v-if="post.thumbnail.url_s" 
        :src="`${post.thumbnail.url_s}.webp`" 
        :alt="post.title.rendered"
        :width="post.thumbnail.imgW"
        :height="post.thumbnail.imgH"
        format="webp"  
        loading="lazy" />
        <img v-else src="@/assets/images/img_def.png"  />
      </NuxtLinkLocale>
    </div>
    <div class="txtContainer">
      <a v-if="post.acf && post.acf.link" :href="`${post.acf.url}`" target="_blank">
        <p class="ttl" v-html="post.title.rendered"></p>
      </a>
      <NuxtLinkLocale v-else :to="`/${type}/${post.slug}`">
      <p v-if="post.type === 'interviews'" class="ttl" v-html="post.acf?.company_name"></p>
      <p v-else class="ttl" v-html="post.title.rendered"></p>
      </NuxtLinkLocale>
      <div class="catContainer">
        <div v-if="post.type === 'interviews'" class="u_d_fl u_gp0" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'interview_category'" class="scene u_d_fl u_fl_w_w u_gp-5_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/category/${term.id}`"><span v-html="term.name"></span></NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-if="post.type === 'story'" class="u_d_fl u_gp0" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'story_category'" class="scene u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/category/${term.id}`"><span v-html="term.name"></span></NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-if="post.type === 'fontinuse'" class="u_d_fl u_gp-5_e  u_fl_w_w" >
          <div v-for="tax in post.tax_info" :key="tax.slug" :class="tax.slug">
           
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
            <ul v-if="tax.slug === 'scene'" class="scene u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.id">
                <NuxtLinkLocale :to="`/${type}/${term.tax}/${term.id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          
        </div>
        <div v-else-if="post.type === 'news'" class="u_d_fl u_gp-5_e u_fl_w_w">
          <ul class="font_type u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="tax in post.tax_info" :key="tax.id">
                <NuxtLinkLocale :to="`/${type}/font-type/${tax.id}`">{{ tax.name }}</NuxtLinkLocale>
              </li>
            </ul>
            <ul class="category u_d_fl u_fl_w_w u_gp-3_e">
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
$wxx : 1440;$wx : 1240;$ww : 782;$ws : 640;$wss : 480;$wsx : 375;
.postList{
  &-item{
    flex-basis: calc(25% - 18px);
    // overflow: hidden;
    
    .ttl{
      font-size:max(.875em, 13px);
    }
    .catContainer{
      font-size:.75em;
      margin-top:.3em;
    }
  }
}

@media screen and (min-width: #{calc($ww * 1px)}) {
  .postList{
    &-item{
      .txtContainer{
        margin-top:.5em;
      }
    }
  }
}
</style>
