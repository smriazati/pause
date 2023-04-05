import { groq } from "@nuxtjs/sanity";
import { sanity } from './plugins/sanity'
const query = groq`*[_type == "siteSettings"][0]{
  "favicon": favicon.image.asset->url,
  "ogImg": {
       "url": ogImg.image.asset->url,
       "alt": ogImg.image.asset->altText
   }
}`;

export default async () => {
  const siteSettings = await sanity.fetch(query)
  return {
    target: 'static',
    head: {
      titleTemplate: "%s | Pause",
      title: 'Pause',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${siteSettings?.ogImg?.url}?h=1200&w=640`
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: `640`
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: `1200`
        },
        { hid: 'og:image:alt', property: 'og:image:alt', content: `${siteSettings?.ogImg?.alt}` }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${siteSettings?.favicon}?h=1200&w=640` },
      ],
    },
    css: ['~/assets/sass/main.scss'],
    plugins: ['~/plugins/sanity-image-builder.js', '~/plugins/youtube.client.js'],
    components: true,
    buildModules: [
      '@nuxtjs/google-fonts', '@nuxtjs/sanity/module', 'nuxt-gsap-module', '@nuxtjs/style-resources',
    ],
    modules: [],
    sanity: {
      projectId: process.env.SANITYID
    },
    gsap: {
      extraPlugins: {
        scrollTo: true,
        scrollTrigger: true
      }
    },
    googleFonts: {
      prefetch: true,
      preconnect: true,
      families: {
        'Inter': {
          wght: [400, 500]
        }
      },
      display: 'swap'
    },
    styleResources: {
      scss: [
        '~/assets/sass/system/_colors.scss',
        '~/assets/sass/system/_typography.scss',
        '~/assets/sass/system/_layout.scss',
        '~/assets/sass/system/_buttons.scss'
      ],
      hoistUseStatements: true
    },
    build: {
      extractCSS: true,
      loaders: {
        limit: 0,
      }
    },
    generate: {
      fallback: true
    }
  }
}