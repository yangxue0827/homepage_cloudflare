<script setup lang="ts">
import { withBase } from 'vitepress';
import { NAvatar, NDivider, useThemeVars, NTag } from 'naive-ui' 

const naiveThemeVars = useThemeVars()

defineProps<{
    text: string
    avatar: string
    tags?: string[]
}>()

</script>

<template>
    <div class="APSideCardInfoAvatar round">
        <n-avatar 
            bordered
            round
            :src="withBase(avatar)"
            :size="180"
        />
    </div>

    <div class="APSideCardInfoName pt-3">
        <h2 :style="{'color': naiveThemeVars.textColorBase, 'line-height': '1rem'}">
            {{ text }}
        </h2>
    </div>

    <div class="APSideCardInfoTags flex flex-col items-center justify-center gap-2">
        <template v-for="tag in tags" :key="tag">
            <n-tag 
                round 
                :bordered="false" 
                type="info" 
                size="medium"
                class="w-max"
            >
                {{ tag }}
            </n-tag>
        </template>
    </div>

    <div class="APSideCardInfoLine w-full">
        <n-divider 
            :style="{
                'margin-top': '16px',
                'margin-bottom': '10px', 
                'background-color': naiveThemeVars.dividerColor,
            }"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'APSideCardInfo'
})
</script>
