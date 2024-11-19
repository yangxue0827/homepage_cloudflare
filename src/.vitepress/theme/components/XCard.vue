<script setup lang="ts">
import { useData } from 'vitepress';
import APHomePubsItems from './APHomePubsItems.vue';
import { data as posts } from '@/theme/data/pubs.data'

const { theme } = useData()
</script>

<template>
  <div class="sec-news flex flex-col">
      <div class="teaching-title mx-auto w-full lg:mx-0">
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