<!-- src/components/PeopleItem.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  item: Object
});
const emit = defineEmits(['delete', 'update']);

const isEditing = ref(false);
const edited = ref({ ...props.item });

const save = () => {
  emit('update', edited.value);
  isEditing.value = false;
};

const cancel = () => {
  isEditing.value = false;
  edited.value = { ...props.item };
};
</script>

<template>
  <v-list-item>
    <template #prepend>
      <v-avatar color="grey-darken-1" size="24" />
    </template>

    <div class="mcon">
      <div v-if="isEditing">
        <v-text-field v-model="edited.title" label="ニックネームを編集" dense />
        <v-text-field v-model="edited.internship" label="インターン経験" class="mx-2" />
        <v-select v-model="edited.status" :items="['在校生', '卒業生', 'トランスファー']" label="ステータス" class="mx-2" />
        <v-text-field v-model="edited.currentJob" label="今の職場" class="mx-2" />
        <v-text-field v-model="edited.annualIncome" label="年収（万円）" type="number" class="mx-2" />
        <v-btn @click="save" color="success" small>保存</v-btn>
        <v-btn @click="cancel" color="error" small>キャンセル</v-btn>
      </div>
      <div v-else class="todo-item">
        <div class="text-content">
          <v-list-item-title class="task">{{ item.title }}</v-list-item-title>
        </div>
        <v-btn icon @click="isEditing = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('delete', item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </v-list-item>
</template>

<style scoped>
.task {
  text-align: left;
  font-weight: bold;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.text-content {
  flex-grow: 1;
}
.mcon {
  margin-left: 20px;
}
</style>
