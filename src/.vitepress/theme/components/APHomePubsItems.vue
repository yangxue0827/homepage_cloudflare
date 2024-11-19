<script setup lang="ts">
import { watch, ref } from 'vue';
import { useData } from 'vitepress';
import { withBase } from 'vitepress';
import { PostPage } from '@/theme/data/pubs.data'
import { NBadge, NTag, NButton } from 'naive-ui';
import Tag from './utils/Tag.vue';
import Image from './utils/Image.vue';
import { useAxios } from '@vueuse/integrations/useAxios'
defineProps<{
    mdContent: PostPage
}>()
const paperInfos = ref(null)
const { theme } = useData()
const offset = [0, 6]

const { data, isFinished } = useAxios('https://raw.githubusercontent.com/yangxue0827/yangxue0827.github.io/google-scholar-stats/gs_data.json')
watch(data, (newData) => {
    if (newData){
        paperInfos.value = newData.publications
    }
})

</script>

<template>
    <div class="pub-item flex flex-row w-full h-40 items-center">
        <div class="pub-item-image relative bg-slate-0 rounded-2xl h-full flex-none overflow-hidden">
            <div class="pub-item-tags absolute top-3 left-0 w-max z-1 flex flex-col gap-1">
                <!--<n-tag v-for="badge in mdContent.frontmatter.content.paper.badge" :key="badge.text" type="success" :bordered="false" strong class=" text-white bg-lime-600 rounded-r-lg hover:bg-lime-600/50 hover:text-black">
                    {{ badge.text }}
                </n-tag>-->
                <Tag 
                        :bordered="false"
                        :round="false"
                        class="text-white bg-blue-500 text-xs font-semibold rounded-r-md hover:bg-blue-600/80 hover:text-black"
                >
                        {{ mdContent.frontmatter.short_name }}
                </Tag>
                <Tag 
                    v-if="mdContent.frontmatter.award !== 'Poster'" 
                    :bordered="false"
                    :round="false"
                    class="text-white bg-red-600/75 text-xs font-semibold rounded-r-md hover:bg-lime-600/50 hover:text-black"
                >
                    {{ mdContent.frontmatter.award }}
                </Tag>
            </div>
            <!--<n-image 
                preview-disabled
                object-fit="scale-down"
                class="ease-out duration-300 w-64 hover:w-72 hover:scale-110 hover:ease-in-out hover:duration-300"
                :src="withBase('/Shanghai-Jiaotong-University.png')"  
            />-->
            <Image 
                :src="withBase(mdContent.frontmatter.image || '/Shanghai-Jiaotong-University.png')" 
                alt="Image"
                object-fit="scale-down"
                class="ease-out overflow-clip duration-300 w-64 h-full hover:ease-in-out hover:duration-300"  
            />
        </div>
        <div class="pub-item-content pl-6 grow flex flex-col justify-between">
            <div class="pub-item-content-details">
                <div class="pub-item-content-title text-lg font-medium">
                    {{ mdContent.frontmatter.title }} <span class=" text-black-500">({{ mdContent.frontmatter.short_name }}, {{ mdContent.frontmatter.year }})</span>
                </div>
                <div class="pub-item-content-tags flex flex-wrap gap-2 my-1">
                   
                        <n-tag v-for="tag in mdContent.frontmatter.tags" :key="tag" type="success" strong round size="small">
                            <span>{{ tag }}</span>
                        </n-tag>
                    
                </div>
                <div class="pub-item-content-author text-base text-zinc-500">
                    <template v-for="(author, index) in mdContent.frontmatter.authors" :key="index">
                    <span 
                        :class="{
                            addBold: author.replace(/[*#+]$/, '') === theme.author
                        }"
                    >
                        <n-badge v-if="author.endsWith('*')" dot type="success" :offset="offset">
                            {{ author.replace(/[*#+]$/, '') }}
                        </n-badge>
                        <n-badge v-else-if="author.endsWith('#')" dot type="info" :offset="offset">
                            {{ author.replace(/[*#+]$/, '') }}
                        </n-badge>
                        <n-badge v-else-if="author.endsWith('+')" dot type="error" :offset="offset">
                            {{ author.replace(/[*#+]$/, '') }}
                        </n-badge>
                        <n-badge v-else show>
                            {{ author.replace(/[*#+]$/, '') }}
                        </n-badge>
                    </span>
                    <span v-if="index !== mdContent.frontmatter.authors.length - 1">, </span>
                    </template>
                </div>
            </div>
            <div class="pub-item-content-links flex flex-wrap gap-2">
                <span v-for="item in mdContent.frontmatter.attachments" :key="item.text">
                    <n-button 
                        v-if="item.text.length > 0"
                        tag="a" 
                        :href="item.link" 
                        type="info" 
                        size="tiny" 
                        ghost
                        class="hover:text-black hover:font-semibold"
                    >
                        {{ item.text }}
                    </n-button>
                </span>
                <span v-if="mdContent.frontmatter.ggid">
                    <n-spin v-if="paperInfos === null" :size="18"  />
                    <n-button
                        v-else 
                        tag="a" 
                        href="" 
                        type="info" 
                        size="tiny" 
                        ghost
                        class="hover:text-black hover:font-semibold"
                    >
                    Citation: {{ paperInfos[mdContent.frontmatter.ggid].num_citations }}
                    </n-button>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.coFirst::after {
    content: '*';
    vertical-align: super;
    font-size: smaller;
}
.corresponding::after {
    content: '\2709';
    vertical-align: super;
    font-size: smaller;
}
.addBold {
    @apply font-semibold
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Badge from 'primevue/badge';
export default defineComponent({
    name: 'APHomePubsItems'
})
</script>