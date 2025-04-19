<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['submit']);

const title = ref('');
const internship = ref('');
const status = ref('');
const currentJob = ref('');
const annualIncome = ref<number | null>(null);

const handleSubmit = () => {
  emit('submit', {
    title: title.value,
    internship: internship.value,
    status: status.value,
    currentJob: currentJob.value,
    annualIncome: annualIncome.value,
    timestamp: new Date()
  });

  // フォーム初期化
  title.value = '';
  internship.value = '';
  status.value = '';
  currentJob.value = '';
  annualIncome.value = null;
};
</script>

<template>
  <v-container>
    <v-text-field v-model="title" label="ニックネーム" />
    <v-text-field v-model="internship" label="インターン経験" />
    <v-select :items="['在校生', '卒業生', 'トランスファー']" v-model="status" label="ステータス" />
    <v-text-field v-model="currentJob" label="今の職場" />
    <v-text-field v-model="annualIncome" label="年収" type="number" />
    <v-btn color="primary" @click="handleSubmit">送信</v-btn>
  </v-container>
</template>
