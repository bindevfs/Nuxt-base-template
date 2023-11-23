import { NuxtI18nOptions } from '@nuxtjs/i18n/dist/module'
import { LocaleObject } from 'vue-i18n-routing'
const locales: LocaleObject[] = [
  {
    code: 'en',
    file: 'en.json',
    name: 'English',
  },
  {
    code: 'vi-VN',
    file: 'vi-VN.json',
    name: 'Tiếng Việt',
  },
]
function buildLocales() {
  return locales.sort((a, b) => a.code.localeCompare(b.code))
}
export const currentLocales = buildLocales()

export const i18n: NuxtI18nOptions = {
  locales: currentLocales,
  lazy: true,
  strategy: 'no_prefix',
  langDir: 'locales',
  defaultLocale: 'en',
  vueI18n: {
    availableLocales: currentLocales.map(l => l.code),
    fallbackLocale: 'en-US',
    fallbackWarn: false,
    missingWarn: false,
  },
  detectBrowserLanguage: {
    alwaysRedirect: true,
    fallbackLocale: 'en',
    redirectOn: 'root',
    useCookie: true,
    cookieCrossOrigin: false,
    cookieDomain: process.env.NODE_ENV === 'production' ? process.env.COOKIES_DOMAIN : null,
    cookieKey: 'i18n_redirected',
    cookieSecure: false,
  },
  skipSettingLocaleOnNavigate: true,
}
