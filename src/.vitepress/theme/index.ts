import { defineComponent, h, inject, computed } from 'vue'
import { NConfigProvider, darkTheme, useOsTheme } from 'naive-ui'
import { setup } from '@css-render/vue3-ssr'
import { useRoute } from 'vitepress'
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import './styles/style.css'



const CssRenderStyle = defineComponent({
  setup () {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render () {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup () {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  render () {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ]
      }
    )
  }
})

export default {
  Layout: NaiveUIProvider,
  enhanceApp: ({ app, router, siteData }) => {
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  }
} satisfies Theme