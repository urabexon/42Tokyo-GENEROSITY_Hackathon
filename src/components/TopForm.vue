<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['submit']);

// プロフィール入力用のフォームデータ
const nickname = ref('');
const age = ref<number | null>(null);
const gender = ref('');
const status = ref('');
const internship = ref('');
const currentJob = ref('');
const jobType = ref('');
const annualIncome = ref<number | null>(null);
const message = ref('');

// 送信処理
const handleSubmit = () => {
  emit('submit', {
    nickname: nickname.value,
    age: age.value,
    gender: gender.value,
    status: status.value,
    internship: internship.value,
    currentJob: currentJob.value,
    jobType: jobType.value,
    annualIncome: annualIncome.value,
    message: message.value,
    timestamp: new Date()
  });

  // 入力初期化
  nickname.value = '';
  age.value = null;
  gender.value = '';
  status.value = '';
  internship.value = '';
  currentJob.value = '';
  jobType.value = '';
  annualIncome.value = null;
  message.value = '';
};
</script>

<template>
  <v-container>
    <v-text-field v-model="nickname" label="ニックネーム" class="custom-input" />
    <v-text-field v-model="age" label="年齢" type="number" class="custom-input" />
    <v-select
      v-model="gender"
      :items="['男性', '女性', 'その他', '未回答']"
      label="性別"
      class="custom-input"
    />
    <v-select
      v-model="status"
      :items="['在校生', '卒業生', 'トランスファー']"
      label="ステータス"
      class="custom-input"
    />
    <v-text-field v-model="internship" label="インターン経験" class="custom-input" />
    <v-text-field v-model="currentJob" label="今の職場" class="custom-input" />
    <v-select
      v-model="jobType"
      :items="['Web系', 'SIer', 'フリーランス', 'スタートアップ', '未定']"
      label="職種"
      class="custom-input"
    />
    <v-text-field v-model="annualIncome" label="年収(万円)" type="number" class="custom-input" />
    <v-textarea v-model="message" label="自由コメント" class="custom-input" auto-grow />

    <v-btn color="primary" @click="handleSubmit" class="custom-button">送信</v-btn>
  </v-container>
</template>
