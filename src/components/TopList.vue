<script setup lang="ts">
import TopItem from './TopItem.vue';

interface Item {
  id: string;
  nickname: string;
  status: string;
  age?: number;
  gender?: string;
  internship?: string;
  currentJob?: string;
  jobType?: string;
  annualIncome?: number;
  message?: string;
  timestamp?: any;
}

defineProps<{
  items: Item[];
}>();

const emit = defineEmits<{
  (e: 'update', item: Item): void;
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <v-list class="custom-list">
    <TopItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @update="item => emit('update', item)"
      @delete="id => emit('delete', id)"
      class="custom-list-item"
    />
  </v-list>
</template>
