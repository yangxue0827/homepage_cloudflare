<script setup lang="ts">
import { 
  NConfigProvider, 
  GlobalThemeOverrides, 
  lightTheme, 
  NLayout, 
  NLayoutSider, 
  NLayoutContent, 
  NLayoutFooter,
  NLayoutHeader 
} from 'naive-ui'
import { useData } from 'vitepress'
import XNavbar from './components/XNavbar.vue';
import XSidecard from './components/XSidecard.vue';
import XPub from './components/XPub.vue';
import XResearch from './components/XResearch.vue';
import XTeam from './components/XTeam.vue';
import XTeaching from './components/XTeaching.vue';
import XCV from './components/XCV.vue';
import XNews from './components/XNews.vue';



// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()

const themeOverrides: GlobalThemeOverrides = {
  Button: {
    borderHover: '#1661AB',
    borderFocus: '#1661AB'

  },
  Switch: {
    railColorActive: '#1661AB',
    railColor: '#F9F1DB',
    textColor: '#000'
  }
}

const tabs = {
  'publication': XPub,
  'news': XNews,
  'team': XTeam,
  'teaching': XTeaching,
  'cv': XCV,
}
</script>

<template>
  <n-config-provider 
      :theme="lightTheme"
      :theme-overrides="themeOverrides"
  >
  
    <div class="Layout">
      <n-layout has-sider class=" h-screen w-screen min-h-full">
        <!-- Sider -->
        <n-layout-sider bordered width="300" content-style="padding: 24px;" class="">
          <XSidecard />
        </n-layout-sider>

        <n-layout>
          <!-- Nav -->
          <n-layout-header class="h-16" position="static">
            <XNavbar />
          </n-layout-header>

          <!-- Content -->
          <n-layout-content content-style="padding: 0px; padding-left: 0px">
            <div class="container container-index" v-if="frontmatter.layout === 'index'">
              <div class="bg-white">
                <div class="mx-4 max-w-6xl pb-6 lg:px-0 lg:max-w-[1600px]">
                  <div class="index-content-news text-base">
                      <Content />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="container container-other">
              <div class="bg-white">
                <div class="mx-4 max-w-6xl pb-6 lg:px-8 lg:max-w-[1600px]">
                  <div class="text-base">
                    <component :is="tabs[frontmatter.layout]" :class="frontmatter.layout"></component>
                  </div>
                </div>
              </div>
            </div>
          </n-layout-content>

          <!-- Footer -->
          <n-layout-footer position="absolute">
            
          </n-layout-footer>

        </n-layout>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<style>
/* 
    CLASS Layout: only consider spatial css
*/
.Layout {
    display: block;
    position: relative;
    min-height: 100vh;
}
.container-index,
.container-other {
  h3 {
    @apply text-stone-500
  }

  p {
    @apply text-lg text-justify
  }

  h1 {
    @apply my-8
  }
  h2{
    @apply my-4
  }
}
.danger {
    @apply text-red-600 font-semibold
}

.container-index {
  a {
    @apply bg-[#F9F1DB] font-semibold rounded-lg py-1 px-2
  }
  h1 a,
  h2 a,
  h4 a,
  h3 a,
  .index-content-news a {
    @apply bg-transparent font-semibold
  }
  .index-content-news h3 {
    @apply leading-3
  }
  .index-content-news h2 {
    @apply mt-10
  }
}

</style>
