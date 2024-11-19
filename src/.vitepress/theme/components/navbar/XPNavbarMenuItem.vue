<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from 'vitepress'
import { isActive } from '@/theme/composables/shared'
import XPLink from '../utils/XPLink.vue';

defineProps<{
  item: DefaultTheme.NavItemWithLink
}>()

const { page } = useData()
</script>

<template>
    <XPLink
        :class="{
            VPNavBarMenuLink: true,
            active: isActive(
            page.relativePath,
            item.activeMatch || item.link,
            !!item.activeMatch
            )
        }"
        :href="item.link"
        :noIcon="item.noIcon"
        :target="item.target"
        :rel="item.rel"
        tabindex="0"
    >
        <span v-html="item.text"></span>
    </XPLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: 64px;
  font-size: 1.125rem;
  font-weight: 500;
  transition: color 0.25s;
}

.VPNavBarMenuLink.active {
  @apply text-blue-600 no-underline
}

.VPNavBarMenuLink:hover {
  @apply text-blue-600 no-underline
}

.VPNavBarMenuLink {
  @apply no-underline text-black
}
</style>