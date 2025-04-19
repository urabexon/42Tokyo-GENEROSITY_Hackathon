<script setup lang="ts">
// 親からのmodelValueを受け取る
const props = defineProps<{
  modelValue: {
    taskInput: string;
    taskDescription: string;
    internshipInput: string;
    statusInput: string;
    currentJobInput: string;
    annualIncomeInput: number | null;
  };
}>();

// emitの設定
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'submit', value: any): void;
}>();

// モデルの更新関数を作成
const updateValue = (key: string, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>

<template>
  <v-container>
    <v-text-field
      v-model="props.modelValue.taskInput"
      label="ニックネーム"
      @update:model-value="updateValue('taskInput', $event)"
    />
    <v-text-field
      v-model="props.modelValue.taskDescription"
      label="説明"
      @update:model-value="updateValue('taskDescription', $event)"
    />
    <v-text-field
      v-model="props.modelValue.internshipInput"
      label="インターン経験"
      @update:model-value="updateValue('internshipInput', $event)"
    />
    <v-select
      v-model="props.modelValue.statusInput"
      :items="['在校生', '卒業生', 'トランスファー']"
      label="ステータス"
      @update:model-value="updateValue('statusInput', $event)"
    />
    <v-text-field
      v-model="props.modelValue.currentJobInput"
      label="今の職場"
      @update:model-value="updateValue('currentJobInput', $event)"
    />
    <v-text-field
      v-model="props.modelValue.annualIncomeInput"
      label="年収"
      type="number"
      @update:model-value="updateValue('annualIncomeInput', $event)"
    />
    <v-btn @click="emit('submit', props.modelValue)">送信</v-btn>
  </v-container>
</template>
