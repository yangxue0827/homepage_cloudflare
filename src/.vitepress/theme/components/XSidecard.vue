<script setup lang="ts">
import { onMounted } from 'vue';
import { useData } from 'vitepress';
import XSideCardInfo from './sidecard/XSideCardInfo.vue';
import XSideCardLinks from './sidecard/XSideCardLinks.vue';
import { NDivider, useThemeVars } from 'naive-ui';

const { theme } = useData()
const naiveThemeVars = useThemeVars()

onMounted(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'clustrmaps';
    script.src =
        '//cdn.clustrmaps.com/map_v2.js?cl=080808&w=300&t=tt&d=yZcblN50sSwsCOVmEPYqkPD6Wo-RFHx0E2yb6Ktm_Wk&co=ffffff&ct=808080&cmo=3acc3a&cmn=ff5353';
    script.async = true;
    document.getElementById('clustrmaps-container').appendChild(script);
});

</script>

<template>
    <div class="site-name text-center text-4xl font-bold text-amber-800">
        IntelliVision
    </div>
    <div class="site-name text-center text-2xl font-bold text-amber-800">
        @RethinkLab
    </div>
    <div class="flex flex-col p-4 pt-12 w-full">
        <div class="APSideCardInfo flex flex-col my-4 justify-around items-center">
            <XSideCardInfo 
                :text="theme.sidebarCard.text"
                :avatar="theme.sidebarCard.avatar"
                :tags="theme.sidebarCard.tags"
            />
        </div>
        <div class="APSideCardLinks flex flex-row mx-auto gap-6">
            <XSideCardLinks />
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
        <div class="APSideCardVisiterMap widgetContainer w-full h-auto "> 
        </div>      
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'XSideCard'
})
</script>
