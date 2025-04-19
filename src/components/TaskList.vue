<script setup lang="ts">
import TaskItem from './TaskItem.vue';

defineProps<{
  filteredList: any[];   // 親から渡されるフィルタされたリスト
  internshipInput: any;   // インターンシップ情報
  statusInput: any;       // ステータス情報
  currentJobInput: any;   // 現在の職業情報
  annualIncomeInput: any; // 年収情報
  handleEdit: Function;   // 編集処理
  handleDelete: Function; // 削除処理
  handleSave: Function;   // 保存処理
  handleCancelEdit: Function; // 編集キャンセル処理
}>();
</script>

<template>
  <v-container class="py-8 px-6" fluid>
    <!-- リスト表示 -->
    <v-row>
      <v-col v-for="(item, index) in filteredList" :key="index" cols="12">
        <v-card>
          <v-list lines="two">
            <!-- 各アイテムの詳細を表示 -->
            <TaskItem
              :item="item"
              :internshipInput="internshipInput"
              :statusInput="statusInput"
              :currentJobInput="currentJobInput"
              :annualIncomeInput="annualIncomeInput"
              :handleEdit="handleEdit"
              :handleDelete="handleDelete"
              :handleSave="handleSave"
              :handleCancelEdit="handleCancelEdit"
            />
            <v-divider v-if="index !== filteredList.length - 1" inset></v-divider>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
