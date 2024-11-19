<script lang="ts" setup>
import { useData } from 'vitepress'
import XPNavbarMenuItem from './XPNavbarMenuItem.vue';

const { theme } = useData()
</script>

<template>
    <nav
        v-if="theme.nav"
        aria-labelledby="main-nav-aria-label"
        class="VPNavBarMenu"
    >
        <template v-for="item in theme.nav" :key="JSON.stringify(item)">
            <XPNavbarMenuItem v-if="'link' in item" :item="item" />
            <component v-else-if="'component' in item" :is="item.component" v-bind="item.props" />
        </template>
    </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
    gap: 16px;
  }
}
</style>
