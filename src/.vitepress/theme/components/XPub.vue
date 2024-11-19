<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useData } from 'vitepress';
import { data as Posts } from '@/theme/data/pubs.data'
import { groupByTag, groupByYear } from '../composables/tag';
import { NTag, NBadge, NButton, NSwitch, NSkeleton, NSpin } from 'naive-ui';
import { useAxios } from '@vueuse/integrations/useAxios'

const { theme } = useData()
const paperInfos = ref(null)
const offset = [1, 4]
const displayMode = ref<'year' | 'tag'>('year');
const selectedFilters = ref<string[]>(['ALL']);
const groupedPosts = computed(() => {
    if (displayMode.value === 'year') {
        return groupByYear(Posts);
    } else {
        return groupByTag(Posts);
    }
});

const availableFilters = computed(() => {
    if (displayMode.value === 'year') {
        const years = [...new Set(Posts.map(post => post.frontmatter.year))];
        years.sort((a, b) => Number(b) - Number(a));
        
        const processedYears = years.map(year => {
            if (Number(year) <= 2019) {
                return 'Before 2019';
            }
            return year;
        });
        
        const uniqueProcessedYears = [...new Set(processedYears)];
        uniqueProcessedYears.sort((a, b) => {
            if (a === 'Before 2019') return 1;
            if (b === 'Before 2019') return -1;
            return Number(b) - Number(a);
        });
        
        return ['ALL', ...uniqueProcessedYears];
    } else {
        const tagCounts = Posts.reduce((acc, post) => {
            post.frontmatter.tags.forEach((tag: string) => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);
        
        const sortedTags = Object.entries(tagCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([tag]) => tag);
        
        return ['ALL', ...sortedTags];
    }
});

const filteredPosts = computed(() => {
    // ALL 的处理保持不变
    if (selectedFilters.value.includes('ALL')) {
        if (displayMode.value === 'year'){
            return groupedPosts.value;
        } else {
            return groupedPosts.value.filter(([tag]) => tag === 'ALL');
        }
    }
    
    if (displayMode.value === 'year') {
        // 年份筛选：保持原来的分组显示方式
        const selectedYear = Number(selectedFilters.value[0]);
        if (typeof(selectedFilters.value[0]) === 'number') {
            return groupedPosts.value.filter(([year]) => Number(year) === selectedYear);
        } else {
            return groupedPosts.value.filter(([year]) => year === selectedFilters.value[0]);
        }
;
    } else {
        // 标签筛选：进行去重和合并
        const selectedPostsMap = new Map<string, number>();
        const selectedPosts = new Set();
        
        groupedPosts.value.forEach(([tag, posts]) => {
            if (selectedFilters.value.includes(tag)) {
                posts.forEach((post: any) => {
                    const postString = JSON.stringify(post);
                    selectedPostsMap.set(postString, (selectedPostsMap.get(postString) || 0) + 1);
                });
            }
        });

        const uniquePosts = Array.from(selectedPostsMap.entries())
                                    .filter(([_, count]) => count === selectedFilters.value.length)
                                    .map(([postString]) => JSON.parse(postString));

        uniquePosts.sort((a: any, b: any) => b.frontmatter.year - a.frontmatter.year);
        
        return [['Selected', uniquePosts]];
    }
});

function toggleDisplayMode(value: string) {
    displayMode.value = displayMode.value === 'year' ? 'tag' : 'year';
    selectedFilters.value = ['ALL'];
}

function selectFilter(filter: string) {
    if (filter === 'ALL') {
        selectedFilters.value = ['ALL'];
        return;
    }
    if (displayMode.value === 'year'){
        selectedFilters.value = [filter]
        return;
    }
    
    const currentFilters = selectedFilters.value.filter(f => f !== 'ALL');
    
    if (currentFilters.includes(filter)) {
        // 如果已选中，则移除
        selectedFilters.value = currentFilters.filter(f => f !== filter);
        // 如果没有选中的过滤器，则默认选中 ALL
        if (selectedFilters.value.length === 0) {
            selectedFilters.value = ['ALL'];
        }
    } else {
        // 如果未选中，则添加
        selectedFilters.value = [...currentFilters, filter];
    }
}

const { data, isFinished } = useAxios('https://raw.githubusercontent.com/yangxue0827/yangxue0827.github.io/google-scholar-stats/gs_data.json')
watch(data, (newData) => {
    if (newData){
        paperInfos.value = newData.publications
    }
})




</script>

<template>
    <div class="sec-pub flex flex-col">
        <div class="sec-pub-content flex flex-row justify-between items-center">
            <div class="flex flex-nowrap items-stretch gap-0">
                <Content />
                <div>
                    <n-button 
                        quaternary 
                        size="medium" 
                        type="info" 
                        tag="a" 
                        href="https://scholar.google.com/citations?user=2xTlvV0AAAAJ&hl=en"
                        class="my-8"
                    >
                        Full List
                    </n-button>
                </div>
            </div>
            <div class="sort-by-what flex gap-1 items-stretch text-stone-400">
                <span class="">Sorted by</span>
                <n-switch 
                    checked-value="tag"
                    unchecked-value="year"
                    @update:value="toggleDisplayMode"
                >
                    <template #checked>
                        Tag
                    </template>
                    <template #unchecked>
                        Year
                    </template>
                </n-switch>
            </div>
        </div>

        <div class="sec-pub-filter flex flex-wrap gap-3 justify-start mb-3">
            <n-button
                v-for="filter in availableFilters"
                :key="filter"
                @click="selectFilter(filter)"
                :class="{ active: selectedFilters.includes(filter) }"
                dashed
                class="active-tag"
            >
                {{ filter }}
            </n-button>
        </div>

        <div class="sec-pub-content-more flex flex-row justify-start gap-6">
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

        <div class="sec-pub-papers flex flex-col gap-3 text-justify break-words">
            <template v-for="[groupKey, Posts] in filteredPosts" :key="groupKey">
                <h2>
                    <span>{{ groupKey }}</span>
                    <span class=" text-zinc-400 font-normal"> ({{Posts.length }} papers)</span>

                </h2>
                <div v-for="post in Posts" :key="post.frontmatter.title" class="sec-pub-papers-item flex">
                    <div class="paper-tags min-w-16 max-w-16 mr-2 flex flex-col gap-2 p-1">
                        <n-tag 
                            v-if="post.frontmatter.award.toUpperCase() !== 'POSTER'" 
                            type="error" 
                            round 
                            bordered 
                            strong 
                            size="small" 
                            class="w-full justify-center overflow-hidden"
                        >
                            {{ post.frontmatter.award.toUpperCase() }}
                        </n-tag>
                        <n-tag 
                            type="info" 
                            round 
                            bordered 
                            strong 
                            size="small" 
                            class="w-full justify-center"
                        >
                            {{ post.frontmatter.short_name }}
                        </n-tag>
                    </div>
                    <div class="paper-info text-lg">
                        <div class="pub-authors inline">
                            <template v-for="(author, index) in post.frontmatter.authors" :key="index">
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
                                <span v-if="index !== post.frontmatter.authors.length - 1">,&nbsp;</span>
                                <span v-else>.&nbsp;</span>
                            </template>
                        </div>
                        <div class="pub-title inline text-[#1661AB]">
                            <span>
                                {{ post.frontmatter.title }}
                            </span>
                            <span>.&nbsp;</span>
                        </div>
                        <div class="pub-publish inline">
                            <span class="font-semibold">
                                {{ post.frontmatter.journal_conference }}
                            </span>
                            <span>,&nbsp;</span>
                        </div>
                        <div v-if="post.frontmatter.additional_info" class="pub-extra inline">
                            <span>
                                {{ post.frontmatter.additional_info }}
                            </span>
                            <span>,&nbsp;</span>
                        </div>
                        <div class="pub-year inline">
                            <span>
                                {{ post.frontmatter.year }}
                            </span>
                            <span>.&nbsp;</span>
                        </div>
                        <div class="pub-links flex flex-row gap-2">
                            <span v-for="item in post.frontmatter.attachments" :key="item.text">
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
                            <span v-if="post.frontmatter.ggid">
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
                                Citation: {{ paperInfos[post.frontmatter.ggid].num_citations }}
                                </n-button>
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.corresponding::after {
    content: '\2709';
    vertical-align: super;
    font-size: smaller;
    color: black;
}
.addBold {
    @apply font-semibold
}
.active-tag.active {
    @apply text-[#d94430] font-semibold
}
.active-tag{
    @apply hover:text-[#1661AB] hover:font-semibold hover:bg-[#F9F1DB]
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'XPub'
})
</script>