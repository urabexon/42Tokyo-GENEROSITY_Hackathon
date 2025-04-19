<!-- src/components/PeopleForm.vue -->
<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['submit']);

const taskInput = ref('');
const internshipInput = ref('');
const statusInput = ref('');
const currentJobInput = ref('');
const annualIncomeInput = ref(null);

const handleSubmit = () => {
  emit('submit', {
    title: taskInput.value,
    internship: internshipInput.value,
    status: statusInput.value,
    currentJob: currentJobInput.value,
    annualIncome: annualIncomeInput.value,
    timestamp: new Date()
  });

  taskInput.value = '';
  internshipInput.value = '';
  statusInput.value = '';
  currentJobInput.value = '';
  annualIncomeInput.value = null;
};
</script>

<template>
  <div class="input-form">
    <v-text-field v-model="taskInput" label="ニックネーム" class="mx-2" />
    <v-text-field v-model="internshipInput" label="インターン経験" class="mx-2" />
    <v-select v-model="statusInput" :items="['在校生', '卒業生', 'トランスファー']" label="ステータス" class="mx-2" />
    <v-text-field v-model="currentJobInput" label="今の職場" class="mx-2" />
    <v-text-field v-model="annualIncomeInput" label="年収（万円）" type="number" class="mx-2" />
    <v-btn class="submit-button" @click="handleSubmit">送信</v-btn>
  </div>
</template>

<style scoped>
.input-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
}
</style>
