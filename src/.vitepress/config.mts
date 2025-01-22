import path from 'node:path'
import { defineConfig } from 'vitepress'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { getThemeConfig } from './theme/node'


const fileAndStyles: Record<string, string> = {}
// APTheme configs
const APThemeConfig = getThemeConfig({
  author: 'Xue Yang',
  news: true,
  itemNum: 3,
  indexNewsTopK: 10,
  indexWorksTopK: 10,
  sidebarCard: {
    text: 'Xue Yang (杨学)',
    avatar: '/assets/yangxue.jpg',
    tags: [
      // 'Assistant Professor',
      // 'PhD Supervisor',
      // 'Shanghai Jiao Tong University',
      'Researcher',
      'OpenGVLab',
      'Shanghai AI Laboratory​',
    ],
    linkGroup: [
      {text: 'Email', link: 'mailto:yangxue-2019-sjtu@sjtu.edu.cn', icon: 'email'},
      {text: 'GitHub', link: 'https://github.com/yangxue0827', icon: 'github'},
      {text: 'Google Scholar', link: 'https://scholar.google.com/citations?user=2xTlvV0AAAAJ&hl=en', icon: 'googlescholar'},
      {text: 'Zhihu', link: 'https://www.zhihu.com/people/yangxue0827', icon: 'zhihu'},
    ]
  },
})


// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: APThemeConfig,
  metaChunk: true,
  cleanUrls: true,

  title: "SJTU",
  description: "The personal homepage of Prof. Yang",

  head: [
    [
      'link',
      { rel: 'preconnect', href: 'https://api.fontshare.com'}
    ],
    [
      'link',
      { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=supreme@300,301,400,401,500,501,700,701,800,801,1,2&display=swap'}
    ],
    [
      'link',
      { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=sentient@300,301,400,401,500,501,700,701&display=swap'}
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'News', link: '/news' },
      { text: 'Publication', link: '/publication' },
      { text: 'Team', link: '/team' },
      { text: 'Teaching', link: '/teaching' },
      { text: 'CV', link: '/cv' },
    ],
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwind(), 
          autoprefixer()
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../.vitepress'),
      },
    },
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  }
})

