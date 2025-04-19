<script setup lang="ts">
import { ref } from 'vue';
import { useTaskManager } from '@/components/useTaskManager';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';

const {
  statusFilter,
  filteredList,
  handleSubmit,
  handleDelete,
  handleEdit,
  handleSave,
  handleCancelEdit,
  clearFilter,
} = useTaskManager();

// 親コンポーネントで状態を管理
const taskInput = ref('');
const taskDescription = ref('');
const internshipInput = ref('');
const statusInput = ref('');
const currentJobInput = ref('');
const annualIncomeInput = ref<number | null>(null);

// v-modelの更新用メソッド
const updateModelValue = (newValue: any) => {
  taskInput.value = newValue.taskInput;
  taskDescription.value = newValue.taskDescription;
  internshipInput.value = newValue.internshipInput;
  statusInput.value = newValue.statusInput;
  currentJobInput.value = newValue.currentJobInput;
  annualIncomeInput.value = newValue.annualIncomeInput;
};
</script>

<template>
  <v-app>
    <v-main>
      <!-- フィルター -->
      <v-container class="pt-4" fluid>
        <v-select
          v-model="statusFilter"
          :items="['全て', '在校生', '卒業生', 'トランスファー']"
          label="ステータスで絞り込み"
          class="mx-auto"
          style="max-width: 300px"
        />
      </v-container>

      <!-- 件数 -->
      <v-container class="text-center mb-4">
        <div>
          {{ filteredList.length }}件見つかりました
          <v-btn v-if="statusFilter !== '全て'" @click="clearFilter" text small color="primary">
            絞り込みをクリア
          </v-btn>
        </div>
      </v-container>

      <!-- リスト表示 -->
      <TaskList
  :cards="['カード1', 'カード2', 'カード3']"
  :filteredList="filteredList"
  :internshipInput="internshipInput"
  :statusInput="statusInput"
  :currentJobInput="currentJobInput"
  :annualIncomeInput="annualIncomeInput"
  :handleEdit="handleEdit"
  :handleDelete="handleDelete"
  :handleSave="handleSave"
  :handleCancelEdit="handleCancelEdit"
/>

      <!-- 新規フォーム -->
      <TaskForm
  :modelValue="{
    taskInput,
    taskDescription,
    internshipInput,
    statusInput,
    currentJobInput,
    annualIncomeInput
  }"
  @update:modelValue="updateModelValue"
  @submit="handleSubmit({
    title: taskInput,
    description: taskDescription,
    internship: internshipInput,
    status: statusInput,
    currentJob: currentJobInput,
    annualIncome: annualIncomeInput,
  })"
/>

    </v-main>
  </v-app>
</template>
