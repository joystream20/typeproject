import axios from 'axios'

// const {WP_API_KEY,SITE_DOMAIN,FONTAWESOME_URL} = process.env
// const siteUrl = 'https://typeproject.com'
// const config = useRuntimeConfig()
// const wpApi = config.public.wpApiKey
// const apiUrl = 'https://damazeinc.xsrv.jp'
// const fontawasomeUrl =  process.env.FONTAWESOME_URL || 'https://kit.fontawesome.com/b1e6e0e757.js'

const metaImage = '/ogp.png'
const metaTitle = 'Type Project | タイププロジェクト'
const metaDescription = 'タイププロジェクトは、機能性と独自性を核にした魅力ある書体づくりに挑む21世紀の文字カンパニーです。'
const _perPage = 24

export default defineNuxtConfig({
  ssr: true,

  srcDir:'src/',

  experimental: {
    payloadExtraction: true
  },
  
  nitro: {
    prerender: {
      routes: [
        '/',
        '/shared-header-ja',
        '/shared-header-en'
      ],
      failOnError: false,
      crawlLinks: true
    }
  },

  site: {
    url: process.env.SITE_DOMAIN
  },

  sitemap: {
    discoverImages: false,
  },

  generate: {
  },

  hooks: {
    'nitro:config': async (nitroConfig: any) => {
      // 開発環境の場合は処理を中止
      if (nitroConfig.dev) {
        return;
      }

      // もし prerend の設定がない場合、処理を中止
      if (nitroConfig.prerender?.routes === undefined) {
        return;
      }

      // データ取得とルート生成
      const dataList = await fetchRoutes();
      // console.log(JSON.stringify(dataList, null, 2));
      nitroConfig.prerender.routes.push(...dataList);
      // nitroConfig.prerender.routes = dataList;
      // console.log(JSON.stringify(nitroConfig.prerender.routes, null, 2));
    }
  },

  runtimeConfig:{
    public: {
      siteUrl:process.env.SITE_DOMAIN || 'https://typeproject.com',
      fontawasomeUrl: process.env.FONTAWESOME_URL || 'https://kit.fontawesome.com/b1e6e0e757.js',
      apiKey: process.env.WP_API_KEY,
      wpApiKey:`${process.env.WP_API_KEY}/wp-json/wp/v2`,
      wpApiKeyEn:`${process.env.WP_API_KEY}/en/wp-json/wp/v2`,
      wpApiCustom:`${process.env.WP_API_KEY}/wp-json/custom/v0`,
      wpApiCustomEn:`${process.env.WP_API_KEY}/en/wp-json/custom/v0`,
      postsPerPage: _perPage,
      pagerNumPage:5,
      defaultFontFamily:"'A+mfCv-TPスカイ セミクラシック ロー M'",
      siteTitle:metaTitle
    }
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/device', "@nuxt/image", 'nuxt-simple-sitemap', '@vesp/nuxt-fontawesome'],//,'@nuxtjs/google-gtag'
  //// @ts-expect-error
  // googleGtag: {
  //   id: 'G-E3QC2KK3Y7'
  // },
  image: {
    dir: 'assets/images',
    // domains: [`${process.env.SITE_DOMAIN}`],
    // provider: 'ipx', // or leave empty to use default ipx
    provider:'none', //ipxを無効
    domains: ['damazeinc.xsrv.jp'],
    formats: ['webp']
  },

  fontawesome: {
    icons: {
      brands:['facebook-f','facebook', 'x-twitter', 'instagram'],
      solid: ['cart-shopping','angle-right','turn-up']
    }
  },

  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
    strategy: 'prefix_except_default',
    defaultLocale: 'ja',
    locales: [
      { code: 'ja', language: 'ja-JP', name: 'Japanese' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    lazy:true,
    // langDir: 'locales',
  },

  css: ["modern-css-reset",
    "@/assets/styles/main.scss"
  ],

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `
          @use '@/assets/styles/_wp.scss';
          @use '@/assets/styles/_common.scss';
          @use '@/assets/styles/_block-build.scss';
          @use '@/assets/styles/_bootstrap_vk_using.scss';
          @use '@/assets/styles/_util.scss';
          `,
        }
      }
    },
    resolve:{
      alias: {
      }
    }
  },

  plugins: [
    '@/plugins/gsap.ts',
    '@/plugins/days.ts'
  ],

  devtools: { enabled: false },

  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: metaTitle,
      meta:[
        {name: 'description', content: metaDescription},
        {property: 'og:site_name', content: metaTitle},
        {property: 'og:title', content: metaTitle},
        {property: 'og:description', content: metaDescription},
        {property: 'og:type', content: 'website'},
        {property: 'og:image', content: metaImage},
        {property: 'twitter:title', content: metaTitle},
        {property: 'twitter:description', content: metaDescription},
        {property: 'twitter:image', content: metaImage},
        {property: 'twitter:card', content: 'summary_large_image'},
        // {name: 'robots', content: 'noindex,nofollow'}
      ],
      script: [
        {
          src: 'https://font.realtype.jp/api/script/v4?rt-input=true&rt-nofliker=true&rt-manual=false&rt-layout=true&rt-user=xfabeMF7lgt6U3zLVEC31IIBywNVt4Xm',
        },
        {src: process.env.FONTAWESOME_URL, defer:true}
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href:'/favicon.ico'},
        // { rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon.png' }
      ]
    }
  },

  compatibilityDate: '2025-03-13'
})


const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(url: string, retries: number = MAX_RETRIES): Promise<any> {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying ${url}... Attempts left: ${retries}`);
      
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, retries - 1);
    } else {
      console.error(`Error fetching ${url} after ${MAX_RETRIES} attempts:`, error);
      throw error;
    }
  }
}

async function fetchData(_apiUrl:string, perPage: number, retries: number = MAX_RETRIES):Promise<string[] | undefined> {
  try {
    const response = await axios.get(`${_apiUrl}?per_page=${perPage}`)//totalの算出に関わるので、変えたくない
    const totalPages = Number(response.headers['x-wp-totalpages'])
    console.log(`${_apiUrl}?per_page=${perPage}--${totalPages}`)

    const fetchDataList = []
    for(let page = 1; page <= totalPages; page++){
      const pageResponse = await axios.get(`${_apiUrl}?per_page=${perPage}&page=${page}`)
      fetchDataList.push(...pageResponse.data)
    }
    return fetchDataList
  } catch (error){
    if (retries > 0) {
      console.warn(`Retrying ${_apiUrl}... Attempts left: ${retries}`);
      
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchData(_apiUrl, perPage, retries - 1);
    }else{
      throw error
    }
  }
}

function getPages(name: string, pageRoutes: string[], perPage: number){
  const pageArray = []

  // let pageNum = 1
  // if(pageRoutes.length / perPage > 0){
  //   pageNum = pageRoutes.length / perPage + 1
  // }

  const pageNum = Math.ceil(pageRoutes.length / perPage);  // 修正部分
  for(let page = 1; page <= pageNum; page++){
    if(page !== 1){
      pageArray.push(`${name}/page/${page}`)
    }
  }
  // console.log(name, pageArray)
  return pageArray
}

async function fetchRoutes() {
  let dataList: string[] = [];

  // const config = useRuntimeConfig()
  // const apiKey = config.public.apiKey
  const apiKey = process.env.WP_API_KEY

  // APIエンドポイントリスト
  const apiEndpoints: {url:string; prefix: string}[] = [
    { url: `${apiKey}/wp-json/wp/v2/posts`, prefix: '/news' },
    { url: `${apiKey}/en/wp-json/wp/v2/posts`, prefix: '/en/news' },
    { url: `${apiKey}/wp-json/wp/v2/fontinuse`, prefix: '/fontinuse' },
    { url: `${apiKey}/en/wp-json/wp/v2/fontinuse`, prefix: '/en/fontinuse' },
    { url: `${apiKey}/wp-json/wp/v2/fonts`, prefix: '/fonts' },
    { url: `${apiKey}/en/wp-json/wp/v2/fonts`, prefix: '/en/fonts' },
    { url: `${apiKey}/wp-json/wp/v2/service`, prefix: '/service' },
    { url: `${apiKey}/en/wp-json/wp/v2/service`, prefix: '/en/service' },
    { url: `${apiKey}/wp-json/wp/v2/interviews`, prefix: '/interviews' },
    { url: `${apiKey}/en/wp-json/wp/v2/interviews`, prefix: '/en/interviews' },
    { url: `${apiKey}/wp-json/wp/v2/story`, prefix: '/story' },
    { url: `${apiKey}/en/wp-json/wp/v2/story`, prefix: '/en/story' },
  ];

  try {
   
    const responses = await Promise.all(
      apiEndpoints.map(async ({ url, prefix }) => {
        // const pageRoutes:string[] = []
        const resList = await fetchData(url,24)
        if(resList){
        // console.log(resList.length)
        }
        const resRoutes = resList?.map((res:any) => `${prefix}/${res.slug}`) ?? []
        const resPages = getPages(prefix, resRoutes, _perPage)
        // console.log('fffetchData',resRoutes)
        const pageRoutes = resRoutes
        .concat(resPages)

        // const response = await fetchWithRetry(url); 
        // if (response.status === 200 && Array.isArray(response.data)) {
        //   return response.data.map((item: any) => `${prefix}/${item.slug}`);
        // }
        // return [];
        return pageRoutes
      })
    );

    // responses.forEach((routes) => dataList.push(...routes));
    dataList = responses.flat()
    // console.log(dataList)
    // console.log(JSON.stringify(dataList, null, 2));
    return dataList;

  } catch (error) {
    console.error('Error fetching data for routes:', error);
    return [];
  }
}
