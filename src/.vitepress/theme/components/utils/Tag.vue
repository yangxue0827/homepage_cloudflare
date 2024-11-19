<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface TagProps {
    bgColor?: string
    textColor?: string
    textSize?: string
    round?: boolean
    bordered?: boolean
}

const props = defineProps<TagProps>()

const tagStyle = computed(() => ({
    backgroundColor: props.bgColor,
    color: props.textColor,
    fontSize: props.textSize,
}))
</script>

<template>
    <div
        :class="[
            'tag',
            { 'tag--bordered': bordered },
            { 'tag--rounded': round }
        ]"
        :style="tagStyle"
    >
        <span>
            <slot name="default"></slot>
        </span>
    </div>
</template>

<style scoped>
.tag {
    display: inline-block;
    line-height: 1;
    transition: all 0.3s ease;
    padding: 6px;
}

.tag--bordered {
    border: 1px solid;
}

.tag--rounded {
    border-radius: 9999px;
}
</style>