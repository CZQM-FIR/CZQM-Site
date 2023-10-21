// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    vatsim: {
      redirectUri: 'http://localhost:3000/api/auth/callback/vatsim',
      endpointUri: 'https://auth-dev.vatsim.net',
      clientId: '647',
      clientSecret: 'UuDuHnB7q8uv32FxNEUkIYkYEAGORzAA6YhbusfK',
    },
    public: {},
  },

  mongoose: {
    modelsDir: 'models'
  },

  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth', 'nuxt-mongoose'],

  auth: {
    provider: {
      type: 'authjs',
    },
  },
});
