<script setup lang="ts">
import TopItem from './TopItem.vue';
defineProps({ items: Array });
const emit = defineEmits(['update', 'delete']);
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
