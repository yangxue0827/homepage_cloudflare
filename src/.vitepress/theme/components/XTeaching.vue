<script setup lang="ts">
import { useData } from 'vitepress';
</script>

<template>
    <div class="sec-teaching flex flex-col">
        <div class="teaching-title mx-auto w-full lg:mx-0">
          <h1>👨🏼‍🏫 Teaching</h1>
        </div>
        <div class="teaching-content text-lg break-words">
            <Content />
        </div>
    </div>
</template>

<style>
.sec-teaching {
  hr {
    @apply border-0 h-[1px] bg-zinc-300
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'XTeaching'
})
</script>