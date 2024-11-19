<script setup lang="ts">
import { ref, computed } from 'vue';
import { NCarousel, NCarouselItem } from 'naive-ui';
import { useData } from 'vitepress';

const { frontmatter } = useData()
</script>

<template>
  <div class="sec-research flex flex-col">
      <div class="teaching-title mx-auto w-full lg:mx-0">
        <h1>🧑‍🔬 Research</h1>
      </div>
      <div class="research-content text-lg break-words lg:mx-4 flex flex-col gap-4">
        <div v-for="topic in frontmatter.directions" class="research-item flex flex-col w-full max-w-full gap-4  border-0 border-solid py-3 md:flex-row">
          <div class="topic-index text-2xl text-stone-400 font-semibold min-w-56 max-w-56">
            {{ topic.text }}
          </div>
          <div class="topic-infos w-100">
            <n-carousel
              direction="vertical"
              dot-placement="right"
              show-arrow
              autoplay
              style="width: 100%; height: 240px"
            >
              <img
                class="carousel-img w-full h-60 object-cover"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
              >
              <img
                class="carousel-img w-full h-60 object-cover"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
              >
              <img
                class="carousel-img w-full h-60 object-cover"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
              >
              <img
                class="carousel-img w-full h-60 object-cover"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
              >
            </n-carousel>
          </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>