// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    vatsim: {
      redirectUri: 'http://localhost:3000/api/auth/callback/vatsim',
      endpointUri: 'https://auth-dev.vatsim.net',
      clientId: '647',
      clientSecret: 'UuDuHnB7q8uv32FxNEUkIYkYEAGORzAA6YhbusfK',
    },
    mongodb: {
      uri: 'mongodb+srv://admin:Kt1eyKQb7NLfpCMM@cluster0.notl1.mongodb.net/main?authSource=admin&replicaSet=atlas-n6ifu6-shard-0&readPreference=primary&ssl=true',
      options: {},
    },
    public: {},
  },

  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth'],

  auth: {
    provider: {
      type: 'authjs',
    },
  },

  nitro: {
    plugins: ['~/server/index.ts'],
  },
});
