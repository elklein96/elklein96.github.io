import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { seo } from './seo.ts'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true }), seo()],
  ssr: { noExternal: ['vuetify'] },
})
