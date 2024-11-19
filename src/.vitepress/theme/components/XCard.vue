<script setup lang="ts">
import { useData } from 'vitepress';
import APHomePubsItems from './APHomePubsItems.vue';
import { data as posts } from '@/theme/data/pubs.data'
import { NBadge } from 'naive-ui';

const { theme } = useData()
</script>

<template>
  <div class="sec-news flex flex-col">
      <div class="teaching-title mx-auto w-full lg:mx-0">
        <div class="sec-pub-content-more flex flex-row justify-start gap-6 pl-5 pb-4">
            <div>
                <n-badge dot type="success" :offset="[0,0]" />
                Equal contribution
            </div>
            <div>
                <n-badge dot type="info" :offset="[0,0]" />
                Corresponding author
            </div>
            <div>
                <n-badge dot type="error" :offset="[0,0]" />
                Project Leader
            </div>
            
        </div>
      </div>
      <div class="research-content text-lg break-words lg:mx-4 flex flex-col gap-4">
        <template v-for="post in posts.slice(0,theme.indexWorksTopK)" :key="post.frontmatter.title">
                <APHomePubsItems :mdContent="post" />
        </template>
    </div>
  </div>

</template>

<style scoped>
</style>