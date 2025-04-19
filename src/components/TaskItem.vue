<script setup lang="ts">
const props = defineProps<{
  item: any;
  internshipInput: any;
  statusInput: any;
  currentJobInput: any;
  annualIncomeInput: any;
  handleEdit: (item: any) => void;
  handleDelete: (id: string) => void;
  handleSave: (item: any) => void;
  handleCancelEdit: (item: any) => void;
}>();

const emit = defineEmits<{
  (e: 'update:internshipInput', value: any): void;
  (e: 'update:statusInput', value: any): void;
  (e: 'update:currentJobInput', value: any): void;
  (e: 'update:annualIncomeInput', value: any): void;
}>();
</script>

<template>
  <v-list-item>
    <template #prepend>
      <v-avatar color="grey-darken-1" size="24" />
    </template>

    <div class="mcon">
      <div v-if="item.isEditing">
        <!-- 編集モード: local model-valueを使用 -->
        <v-text-field v-model="item.title" label="ニックネームを編集" dense />
        
        <!-- Internship Input -->
        <v-text-field
          :model-value="internshipInput"
          @update:model-value="val => emit('update:internshipInput', val)"
          label="インターン経験"
          class="mx-2"
        />
        
        <!-- Status Input -->
        <v-select
          :model-value="statusInput"
          @update:model-value="val => emit('update:statusInput', val)"
          :items="['在校生', '卒業生', 'トランスファー']"
          label="ステータス"
          class="mx-2"
        />
        
        <!-- Current Job Input -->
        <v-text-field
          :model-value="currentJobInput"
          @update:model-value="val => emit('update:currentJobInput', val)"
          label="今の職場"
          class="mx-2"
        />
        
        <!-- Annual Income Input -->
        <v-text-field
          :model-value="annualIncomeInput"
          @update:model-value="val => emit('update:annualIncomeInput', val)"
          label="年収（万円）"
          type="number"
          class="mx-2"
        />
        
        <v-btn @click="handleSave(item)" color="success" small>保存</v-btn>
        <v-btn @click="handleCancelEdit(item)" color="error" small>キャンセル</v-btn>
      </div>
      <div v-else class="todo-item">
        <div class="text-content">
          <v-list-item-title class="task">{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </div>
        <v-btn size="30" @click="handleEdit(item)" icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn size="30" @click="handleDelete(item.id)" icon><v-icon>mdi-delete</v-icon></v-btn>
      </div>
    </div>
  </v-list-item>
</template>
