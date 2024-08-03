// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['~/assets/styles/css/config.min.css'],

  plugins: [
    '~/plugins/scramble.js',
    '~/plugins/cursor.js',
  ],

  modules: [
    '@pinia/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  imports: {
    dirs: ['./stores'],
  }
})
