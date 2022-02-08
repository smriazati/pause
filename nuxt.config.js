export default {
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
        { hid: 'og:image', property: 'og:image', content: ''},
        { hid: 'og:image:alt', property: 'og:image:alt', content: ''}
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
  },
  css: ['~/assets/sass/main.scss'],
  plugins: ['~/plugins/sanity-image-builder.js'],
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
          'Inter': true,
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
}
