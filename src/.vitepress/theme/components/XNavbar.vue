<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { ref, watchPostEffect } from 'vue'
import { useData } from 'vitepress';
import XPNavbarMenu from './navbar/XPNavbarMenu.vue';
import XPNavbarTitle from './navbar/XPNavbarTitle.vue';

const { y } = useWindowScroll()
const { frontmatter } = useData()
const classes = ref<Record<string, boolean>>({})

watchPostEffect(() => {
  classes.value = {
    'home': frontmatter.value.layout === 'home',
    'top': y.value === 0,
  }
})
</script>

<template>
    <div class="APNavBar" :class="classes">
        <div class="APNavBarContent">
            <div class="APNavBarContentTitle">
            
            </div>
            <div class="APNavBarContentMenu">
                <XPNavbarMenu />
            </div>
        </div>
        <div class="APNavBarDivider">
            <div class="APNavBarDivider-line" />
        </div>
    </div>
</template>

<style scoped>
.APNavBar {
    display: flex;
    flex-direction: column;
    height: 100%;
    pointer-events: none;
    white-space: nowrap;
    transition: background-color 0.25s;
}

.APNavBarContent {
    display: flex;
    justify-content: flex-end;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    pointer-events: none;
}

.APNavBarDivider-line {
    width: 100%;
    height: 0px;
    transition: background-color 0.5s;
}

.APNavBarContentTitle{
    display: flex;
    pointer-events: auto;
}

.APNavBarContentMenu {
    pointer-events: auto;
}
.APNavBar:not(.home) .APNavBarDivider-line {
    @apply bg-cyan-700 dark:bg-cyan-700
}

@media (min-width: 768px) {
    .APNavBar:not(.home.top) .APNavBarDivider-line {
        @apply bg-cyan-700 dark:bg-cyan-700
    }
}
</style>