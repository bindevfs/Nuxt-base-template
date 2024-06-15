import { createResolver } from '@nuxt/kit'
import { isDevelopment, isWindows } from 'std-env'
const { resolve } = createResolver(import.meta.url)
import { i18n } from './config/i18n'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  imports: {
    dirs: ['stores'],
    injectAtEnd: true,
  },
  devtools: {
    enabled: true,
  },
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: false,
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    ...(isDevelopment || isWindows) ? [] : ['nuxt-security']
  ],
  css: [],
  alias: {
    'querystring': 'rollup-plugin-node-polyfills/polyfills/qs',
    'change-case': 'scule',
    'semver': resolve('./mocks/semver'),
  },
  vite: {
    define: {},
    build: {
      target: 'esnext',
    },
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less',
          }),
        ],
      }),
    ],
    ssr: {
      noExternal: ['ant-design-vue', 'dayjs'],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n,
  routeRules: {
    // Static generation
    '/': { prerender: true },
    // CDN cache rules
    '/manifest.webmanifest': {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
    },
    publicAssets: [
      {
        dir: '~/public/avatars',
        maxAge: 24 * 60 * 60 * 30, // 30 days
        baseURL: '/avatars',
      },
      {
        dir: '~/public/emojis',
        maxAge: 24 * 60 * 60 * 15, // 15 days, matching service worker
        baseURL: '/emojis',
      },
      {
        dir: '~/public/fonts',
        maxAge: 24 * 60 * 60 * 365, // 1 year (versioned)
        baseURL: '/fonts',
      }
    ],
  },
  sourcemap: isDevelopment,
  app: {
    keepalive: true,
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      bodyAttrs: {
        class: 'overflow-x-hidden',
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        // open graph social image
        { property: 'og:title', content: 'Base Template' },
        { property: 'og:description', content: 'A Base template nuxt' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '' },
        { property: 'og:image:width', content: '3800' },
        { property: 'og:image:height', content: '1900' },
        { property: 'og:site_name', content: 'Base_Template' },
        { property: 'twitter:site', content: '' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore nuxt-security is conditional
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'default-src': ['\'self\''],
        'base-uri': ['\'self\''],
        'connect-src': ['\'self\'', 'https:', 'http:', 'wss:', 'ws:'],
        'font-src': ['\'self\''],
        'form-action': ['\'none\''],
        'frame-ancestors': ['\'none\''],
        'img-src': ['\'self\'', 'https:', 'http:', 'data:', 'blob:'],
        'media-src': ['\'self\'', 'https:', 'http:'],
        'object-src': ['\'none\''],
        'script-src': ['\'self\'', '\'unsafe-inline\'', '\'wasm-unsafe-eval\''],
        'script-src-attr': ['\'none\''],
        'style-src': ['\'self\'', '\'unsafe-inline\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        fullscreen: ['\'self\'', 'https:', 'http:'],
      },
    },
    rateLimiter: false,
  },
  hooks: {
    'vite:extendConfig': function (config, { isServer }) {
      if (isServer) {
        const noExternal = config.ssr!.noExternal as string[]
        noExternal.push('vue-i18n')
      }
    },
  }
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    // @ts-ignore
    modules: unknown
  }
}
