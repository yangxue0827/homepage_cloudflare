<script setup lang="ts">
import { ref, computed } from 'vue';
import { Student, ProcessedStudent } from '../composables/team';
import { data as student } from '@/theme/data/team.data'
import { withBase } from 'vitepress';

const datas = ref<Student[]>(student)

const processedData = computed(() => {
    // 1. 将 type 转换为大写并分组
    const groupedData = datas.value.reduce((acc, student) => {
        const upperType = student.type.toUpperCase()
        if (!acc[upperType]) {
        acc[upperType] = []
        }
        acc[upperType].push(student)
        return acc
    }, {} as Record<string, Student[]>)

  // 2 & 3. 排序并添加 grade 字段
    const processedGroups = Object.entries(groupedData).reduce((acc, [type, students]) => {
        const processedStudent: ProcessedStudent[] = students
        .map(student => {
            const [year, month] = student.date.split('-')
            const semester = month === '09' ? 'Fall' : 'Spring'
            return {
            ...student,
            type: type, // 使用大写的 type
            grade: `${year} ${semester}`
            }
        })
        .sort((a, b) => {
            const [yearA, monthA] = a.date.split('-').map(Number)
            const [yearB, monthB] = b.date.split('-').map(Number)
            if (yearA !== yearB) {
                return yearA - yearB
            }
            return monthA - monthB
        })
        acc[type] = processedStudent
        return acc
    }, {} as Record<string, ProcessedStudent[]>)
    
    return processedGroups
})


</script>

<template>
    <div class="sec-team flex flex-col">
      <div v-if="processedData.FACULTY" class="team-faculty flex flex-col">
        <div class="w-full">
          <h1>
            🧑‍🎓 Faculty
          </h1>
        </div>
        <div class="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div v-for="person in processedData.FACULTY" :key="person.name" class="flex flex-col gap-1 items-center group">
            <img class="h-28 w-28 border border-solid border-stone-200 rounded-full object-scale-down" :src="withBase(person.avatar)" alt="avatar" />
            <a :href="person.homepage" class="no-underline mt-3 text-lg font-semibold leading-7 tracking-tight text-gray-900 mb-0 group-hover:bg-[#F9F1DB] group-hover:rounded-xl group-hover:px-2 group-hover:py-1 group-hover:text-xl duration-150 ease-in-out">{{ person.name }}</a>
            <p class="text-sm text-gray-600 my-0">{{ person.title }}</p>
          </div>
        </div>
      </div>
      <div v-if="processedData.COAUTHOR" class="team-phd flex flex-col">
        <div class="w-full">
          <h1>
            🧑‍🎓 Collaborators
          </h1>
        </div>
        <div class="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div v-for="person in processedData.COAUTHOR" :key="person.name" class="flex flex-col gap-1 items-center group">
            <img class="h-28 w-28 border border-solid border-stone-200 rounded-full object-scale-down" :src="withBase(person.avatar)" alt="avatar" />
            <a :href="person.homepage" class="no-underline mt-3 text-lg font-semibold leading-7 tracking-tight text-gray-900 mb-0 group-hover:bg-[#F9F1DB] group-hover:rounded-xl group-hover:px-2 group-hover:py-1 group-hover:text-xl duration-150 ease-in-out">{{ person.name }}</a>
            <p class="text-sm text-gray-600 my-0">{{ person.publication }}</p>
            <p class="text-sm text-gray-500 my-0">{{ person.title }}</p>
            <p class="text-sm text-gray-400 my-0">{{ person.degree }}</p>
          </div>
        </div>
      </div>
      <div v-if="processedData.PHD" class="team-phd flex flex-col">
        <div class="w-full">
          <h1>
            🧑‍🎓 PhD Students
          </h1>
        </div>
        <div class="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div v-for="person in processedData.PHD" :key="person.name" class="flex flex-col gap-1 items-center group">
            <img class="h-28 w-28 border border-solid border-stone-200 rounded-full object-scale-down" :src="withBase(person.avatar)" alt="avatar" />
            <a :href="person.homepage" class="no-underline mt-3 text-lg font-semibold leading-7 tracking-tight text-gray-900 mb-0 group-hover:bg-[#F9F1DB] group-hover:rounded-xl group-hover:px-2 group-hover:py-1 group-hover:text-xl duration-150 ease-in-out">{{ person.name }}</a>
            <p class="text-sm text-gray-600 my-0">{{ person.grade }}</p>
            <p class="text-sm text-gray-500 my-0">{{ person.publication }}</p>
            <p class="text-sm text-gray-400 my-0">{{ person.intern }}</p>
          </div>
        </div>
      </div>
      <div v-if="processedData.MASTER" class="team-master flex flex-col">
        <div class="w-full">
          <h1>
            🧑‍🎓 MPhil Students
          </h1>
        </div>
        <div class="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div v-for="person in processedData.MASTER" :key="person.name" class="flex flex-col gap-1 items-center group">
            <img class="h-28 w-28 border border-solid border-stone-200 rounded-full object-scale-down" :src="withBase(person.avatar)" alt="avatar" />
            <a :href="person.homepage" class="no-underline mt-3 text-lg font-semibold leading-7 tracking-tight text-gray-900 mb-0 group-hover:bg-[#F9F1DB] group-hover:rounded-xl group-hover:px-2 group-hover:py-1 group-hover:text-xl duration-150 ease-in-out">{{ person.name }}</a>
            <p class="text-sm text-gray-600 my-0">{{ person.grade }}</p>
            <p class="text-sm text-gray-500 my-0">{{ person.publication }}</p>
            <p class="text-sm text-gray-400 my-0">{{ person.intern }}</p>
          </div>
        </div>
      </div>
      <div v-if="processedData.UNDERGRADUATE" class="team-undergraduate flex flex-col">
        <div class="w-full">
          <h1>
            🧑‍🎓 Undergraduate
          </h1>
        </div>
        <div class="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div v-for="person in processedData.UNDERGRADUATE" :key="person.name" class="flex flex-col gap-1 items-center group">
            <img class="h-28 w-28 border border-solid border-stone-200 rounded-full object-scale-down" :src="withBase(person.avatar)" alt="avatar" />
            <a :href="person.homepage" class="no-underline mt-3 text-lg font-semibold leading-7 tracking-tight text-gray-900 mb-0 group-hover:bg-[#F9F1DB] group-hover:rounded-xl group-hover:px-2 group-hover:py-1 group-hover:text-xl duration-150 ease-in-out">{{ person.name }}</a>
            <p class="text-sm text-gray-600 my-0">{{ person.grade }}</p>
            <p class="text-sm text-gray-500 my-0">{{ person.publication }}</p>
            <p class="text-sm text-gray-400 my-0">{{ person.intern }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="team-alumni flex flex-col">
        <div class="mx-auto w-full lg:mx-0">
          <h1>🧑‍🎓 Alumni</h1>
        </div>
        <div class="ml-4 text-lg">
          <Content />
        </div>
      </div> --> 
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'XTeam'
})
</script>