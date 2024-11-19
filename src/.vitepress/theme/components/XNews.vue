<script setup lang="ts">
import { ref, computed } from 'vue';
import { NList, NListItem, NThing } from 'naive-ui';
import { useData } from 'vitepress';

const { frontmatter } = useData()
</script>

<template>
  <div class="sec-news flex flex-col">
      <div class="teaching-title mx-auto w-full lg:mx-0">
        <h1>🔥 News</h1>
      </div>
      <div class="research-content text-lg break-words lg:mx-4 flex flex-col gap-4">
          <n-list hoverable>
            <n-list-item v-for="news in frontmatter.News" :key="news.text" style="align-items: start;" class="research-item flex flex-col w-full max-w-full gap-4 border-0 border-solid py-3 md:flex-row">
                <template #prefix>
                    <div v-if="news.top" class=" text-red-600 size-6 mr-[-16px]" >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                            <g fill="red" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 4.5l-4 4L7 10l-1.5 1.5l7 7L14 17l1.5-4l4-4"></path>
                                <path d="M9 15l-4.5 4.5"></path>
                                <path d="M14.5 4L20 9.5"></path>
                            </g>
                        </svg>
                    </div>
                    <div v-else class=" text-black-600 w-20 mr-[-16px] text-lg text-zinc-500" >
                        {{ news.date }}
                        <!--<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="currentColor"></circle></svg>-->
                    </div>
                </template>
                <n-thing content-indented class="">
                    <template #description>
                        <div class="text-lg mb-0 pb-0 ">
                            {{ news.text }}
                        </div>
                        <div v-for="item in news.links" class="pl-4 text-base">
                            <a v-if="item.text !== null" :href="item.link" class="no-underline">
                                {{ item.text }}
                            </a>
                        </div>
                    </template>
                </n-thing>
            </n-list-item>
        </n-list>
    </div>
  </div>

</template>

<style scoped>
</style>