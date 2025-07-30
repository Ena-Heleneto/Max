<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'

const { item } = defineProps<{ item: { send: string;content: string } }>()
</script>

<template>
  <div class="flex w-100 my-20px gap-10px " :class="{ 'justify-end': item.send === 'user', 'justify-start': item.send === 'ai' }">
    <el-avatar :icon="UserFilled" />

    <div class="p-15px text-15px max-w-1/2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg">
      {{ item.content }}
    </div>
  </div>
</template>
