<script setup lang="ts">
import { useImage } from '@vueuse/core';
const props = defineProps<{
    src: string
    alt?: 'Image'
    srcset?: string | undefined
    loading?: 'eager'
    objectFit?: 'cover' | 'fill' | 'contain' | 'scale-down' | 'none'
}>()
const { isLoading, error } = useImage({src: props.src, alt: props.alt})
</script>

<template>
    <div class="ap-image">
        <div v-if="isLoading" class="w-full h-full animate-pulse bg-gray-500/5 p-2">
            Loading...
        </div>
        <div v-else-if="error" class="w-full h-full text-red">
            Failed
        </div>
        <img v-else 
            :src="props.src" 
            :alt="props.alt" 
            :loading="props.loading"
            :srcset="props.srcset"  
            class="max-w-full h-auto ease-out duration-300 w-64 hover:w-72 hover:scale-110 hover:ease-in-out hover:duration-300"
            :style="{
                'object-fit': objectFit
            }"
        >
    </div>
</template>

<style scoped>
.ap-image {
    display: inline-flex;
    max-width: 100%;
    max-height: 100%;
}
</style>
