<script setup lang="ts">
import { useData } from 'vitepress';
</script>

<template>
    <div class="sec-cv flex flex-col">
        <div class="cv-title mx-auto w-full lg:mx-0">
          <h1>Curriculum Vitae</h1>
        </div>
        <div class="cv-content text-lg break-words">
            <Content />
        </div>
    </div>
</template>

<style>
.cv-content {
  a {
    @apply bg-[#F9F1DB] font-semibold rounded-lg py-1 px-2
  }
  h1 a,
  h2 a,
  h4 a,
  h3 a {
    @apply bg-transparent font-normal
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'XCV'
})
</script>
