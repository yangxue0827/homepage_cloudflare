<script setup lang="ts">
import { ref, computed } from 'vue';
import type { PropType } from 'vue';

interface Article {
  title: string;
  year: number;
  tags: string[];
}

const props = defineProps({
  articles: {
    type: Array as PropType<Article[]>,
    required: true
  }
});

const displayMode = ref<'year' | 'tag'>('year');
const selectedFilter = ref('ALL');

const groupedArticles = computed(() => {
  if (displayMode.value === 'year') {
    return groupByYear(props.articles);
  } else {
    return groupByTag(props.articles);
  }
});

const availableFilters = computed(() => {
  if (displayMode.value === 'year') {
    return ['ALL', ...new Set(props.articles.map(article => article.year))].sort((a, b) => Number(b) - Number(a));
  } else {
    return ['ALL', ...new Set(props.articles.flatMap(article => article.tags))].sort();
  }
});

function groupByYear(articles: Article[]) {
  const grouped = articles.reduce((acc, article) => {
    const year = article.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {} as Record<number, Article[]>);
  
  Object.keys(grouped).forEach(year => {
    grouped[Number(year)].sort((a, b) => b.year - a.year);
  });
  
  return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
}

function groupByTag(articles: Article[]) {
  const grouped = articles.reduce((acc, article) => {
    article.tags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(article);
    });
    return acc;
  }, {} as Record<string, Article[]>);
  
  Object.keys(grouped).forEach(tag => {
    grouped[tag].sort((a, b) => b.year - a.year);
  });
  
  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
}

const filteredArticles = computed(() => {
  if (selectedFilter.value === 'ALL') {
    return groupedArticles.value;
  }
  
  if (displayMode.value === 'year') {
    const selectedYear = Number(selectedFilter.value);
    return groupedArticles.value.filter(([year]) => Number(year) === selectedYear);
  } else {
    return groupedArticles.value.filter(([tag]) => tag === selectedFilter.value);
  }
});

function toggleDisplayMode() {
  displayMode.value = displayMode.value === 'year' ? 'tag' : 'year';
  selectedFilter.value = 'ALL';
}

function selectFilter(filter: string | number) {
  selectedFilter.value = filter;
}
</script>

<template>
  <div class="article-group">
    <div class="controls">
      <button @click="toggleDisplayMode">
        {{ displayMode === 'year' ? 'Switch to Tag View' : 'Switch to Year View' }}
      </button>
      <div class="filters">
        <button
          v-for="filter in availableFilters"
          :key="filter"
          @click="selectFilter(filter)"
          :class="{ active: selectedFilter === filter }"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    
    <div class="articles">
      <template v-for="[groupKey, articles] in filteredArticles" :key="groupKey">
        <h2>{{ groupKey }}</h2>
        <ul>
          <li v-for="article in articles" :key="article.title">
            {{ article.title }} ({{ article.year }})
            <span v-if="displayMode === 'year'">
              Tags: {{ article.tags.join(', ') }}
            </span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped>
.article-group {
  font-family: Arial, sans-serif;
}

.controls {
  margin-bottom: 20px;
}

.filters {
  margin-top: 10px;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
}

h2 {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 5px;
}
</style>