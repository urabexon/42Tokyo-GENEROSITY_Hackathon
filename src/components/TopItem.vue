<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  item: Object
});
const emit = defineEmits(['delete', 'update']);

const isEditing = ref(false);
const edited = ref({ ...props.item });

// props.itemが変わったらeditedも更新
watch(() => props.item, (newVal) => {
  edited.value = { ...newVal };
});

const save = () => {
  emit('update', { ...edited.value });
  isEditing.value = false;
};

const cancel = () => {
  edited.value = { ...props.item };
  isEditing.value = false;
};
</script>

<template>
  <v-list-item>
    <div v-if="isEditing">
      <v-text-field v-model="edited.title" label="ニックネーム" />
      <v-text-field v-model="edited.internship" label="インターン経験" />
      <v-select v-model="edited.status" :items="['在校生', '卒業生', 'トランスファー']" label="ステータス" />
      <v-text-field v-model="edited.currentJob" label="今の職場" />
      <v-text-field v-model="edited.annualIncome" label="年収" type="number" />
      <v-btn color="success" @click="save">保存</v-btn>
      <v-btn color="error" @click="cancel">キャンセル</v-btn>
    </div>
    <div v-else>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <v-btn icon @click="isEditing = true"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon @click="$emit('delete', item.id)"><v-icon>mdi-delete</v-icon></v-btn>
    </div>
  </v-list-item>
</template>
