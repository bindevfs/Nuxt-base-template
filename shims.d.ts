declare global {
  namespace NodeJS {
    interface Process {
      test?: boolean
    }
  }
}
// declare module '@nuxt/schema' {
//   interface NuxtConfig {
//     $i18n?: IVueI18n
//   }
//   interface NuxtOptions {
//     $i18n?: IVueI18n
//   }
// }
export {}
