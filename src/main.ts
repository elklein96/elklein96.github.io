import { ViteSSG } from 'vite-ssg/single-page'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '@fontsource-variable/inter'
import 'vuetify/styles'
import './styles.css'
import App from './App.vue'

// Pre-rendered to static HTML at build time (vite-ssg), then hydrated in the browser.
export const createApp = ViteSSG(App, ({ app }) => {
  app.use(
    createVuetify({
      ssr: true,
      icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
      theme: {
        defaultTheme: 'system',
        themes: {
          light: {
            dark: false,
            colors: {
              background: '#faf9f7',
              surface: '#ffffff',
              primary: '#1f3a5f',
              secondary: '#b5542e',
            },
          },
          dark: {
            dark: true,
            colors: {
              background: '#0f1217',
              surface: '#161a21',
              primary: '#9cc0ee',
              secondary: '#f0a07c',
            },
          },
        },
      },
      defaults: {
        VBtn: { rounded: 'lg' },
        VCard: { rounded: 'lg' },
        VChip: { size: 'small', variant: 'tonal' },
      },
    }),
  )
})
