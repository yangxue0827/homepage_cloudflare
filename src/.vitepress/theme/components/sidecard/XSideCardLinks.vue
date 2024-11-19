<script setup lang="ts">
import { useData } from 'vitepress';
import XSideCardIcons from './XSideCardIcons.vue';

const { theme } = useData()

</script>

<template>
    <XSideCardIcons v-for="item in theme.sidebarCard.linkGroup" :text="item.text" :icon="item.icon" :link="item.link" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'XSideCardLinks'
})
</script>
