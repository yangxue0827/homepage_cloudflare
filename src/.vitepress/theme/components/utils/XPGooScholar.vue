<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue';
import { NButton } from 'naive-ui';
import { useAxios } from '@vueuse/integrations/useAxios'

const { data } = useAxios('https://raw.githubusercontent.com/yangxue0827/yangxue0827.github.io/google-scholar-stats/gs_data.json')

//const { data, isFinished } = useAxios('https://raw.githubusercontent.com/yangxue0827/yangxue0827.github.io/google-scholar-stats/gs_data.json')
const baseID = '2xTlvV0AAAAJ:-f6ydRqryjwC'
const props = defineProps<{
  id: string
}>()

const paperInfos = ref(null)

watch(data, (newData) => {
    if (newData){
        paperInfos.value = newData.publications
    }
})




</script>

<template>
    <n-button 
        tag="a" 
        href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=2xTlvV0AAAAJ&cstart=20&pagesize=80&citation_for_view=2xTlvV0AAAAJ:3s1wT3WcHBgC" 
        type="info" 
        size="tiny" 
        ghost
        class="hover:text-black hover:font-semibold"
    >
      {{ paperInfos}}
    </n-button>
</template>