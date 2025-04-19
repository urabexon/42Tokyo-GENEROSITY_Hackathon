<!-- src/components/PeopleList.vue -->
<script setup lang="ts">
import PeopleItem from './TopItem.vue';

defineProps({
  items: Array
});
const emit = defineEmits(['delete', 'update']);
</script>

<template>
  <v-card>
    <v-list lines="two">
      <v-list-subheader>該当者リスト</v-list-subheader>

      <template v-for="(item, index) in items" :key="item.id">
        <PeopleItem :item="item" @delete="id => emit('delete', id)" @update="item => emit('update', item)" />
        <v-divider v-if="index !== items.length - 1" :key="`divider-${index}`" inset />
      </template>
    </v-list>
  </v-card>
</template>
