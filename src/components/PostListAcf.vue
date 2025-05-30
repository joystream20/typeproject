<script setup lang="ts">
type Props = {
  posts: {
    ID:string;
    post_title:string;
    post_name:string;
    thumbnail:{url:string;url_f:string};
    post_type:string;
    company_name?:string;
    tax_info:{
      slug:string;
      label:string;
      terms:{
        term_id:number;
        name:string;
        slug:string;
        taxonomy:string;
      }[]
    }[];
    category:{
      term_id:number;
      name:string;
      slug:string;
    }[]
  }[]
}

const { posts } = defineProps<Props>()

onMounted(() => {
  console.log(posts)
})

</script>

<template>
<ul class="postList" v-if="posts && posts.length">
  <li class="postList-item" v-for="post in posts" :key="post.ID">
   
    <div class="image">
      <NuxtLinkLocale :to="`/${post.post_type}/${post.post_name}`">
        <NuxtImg v-if="post.thumbnail.url" :src="`${post.thumbnail.url}.webp`" :alt="`${post.post_title}`" width="246" format="webp" loading="lazy" />
        <img v-else src="@/assets/images/img_def.png"  />
      </NuxtLinkLocale>
    </div>
    <div class="txtContainer">
      <p class="ttl">
        <NuxtLinkLocale :to="`/${post.post_type}/${post.post_name}`">
        <span v-if="post.post_type === 'interviews'" class="ttl" v-html="post.company_name"></span>
        <span v-else class="ttl" v-html="post.post_title"></span>
      </NuxtLinkLocale>
      </p>
      <div class="catContainer">
        <div v-if="post.post_type === 'interviews'" class="u_d_fl u_gp0 u1" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.term_id">
                <NuxtLinkLocale :to="`/${post.post_type}/${term.taxonomy}/${term.term_id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'interview_category'" class="scene u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.term_id">
                <NuxtLinkLocale :to="`/${post.post_type}/category/${term.term_id}`"><span v-html="term.name"></span></NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-if="post.post_type === 'story'" class="u_d_fl u_gp0 u2" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.term_id">
                <NuxtLinkLocale :to="`/${post.post_type}/${term.taxonomy}/${term.term_id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'story_category'" class="scene u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.term_id">
                <NuxtLinkLocale :to="`/${post.post_type}/category/${term.term_id}`"><span v-html="term.name"></span></NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-if="post.post_type === 'fontinuse'" class="u_d_fl u_gp-3_e u_fl_w_w u3" >
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="fonttype u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.term_id">
                <NuxtLinkLocale :to="`/${post.post_type}/${term.taxonomy}/${term.term_id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'scene'" class="scene u_d_fl u_fl_w_w u_gp-3_e">
              <li v-for="term in tax.terms" :key="term.term_id">
                <NuxtLinkLocale :to="`/${post.post_type}/${term.taxonomy}/${term.term_id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
            </ul>
          </div>
        </div>
        <div v-else-if="post.post_type === 'news'" class="u_d_fl u_gp-5_e u_fl_w_w u4">
          <div v-for="tax in post.tax_info" :key="tax.slug">
            <ul v-if="tax.slug === 'font-type'" class="font_type u_d_fl u_fl_w_w u_gp-3_e">
                <li v-for="term in tax.terms" :key="term.term_id">
                  <NuxtLinkLocale :to="`/${post.post_type}/font-type/${term.term_id}`">{{ term.name }}</NuxtLinkLocale>
                </li>
              </ul>
              <ul class="category u_d_fl u_fl_w_w u_gp-3_e">
                <li v-for="cat in post.category" :key="cat.term_id">
                  <NuxtLinkLocale :to="`/${post.post_type}/category/${cat.term_id}`">{{ cat.name }}</NuxtLinkLocale>
                </li>
              </ul>
          </div>
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
