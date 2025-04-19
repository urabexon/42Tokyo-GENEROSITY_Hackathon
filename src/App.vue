<script lang="ts" setup>
import { useTaskManager } from '@/components/useTaskManager';
const {
  statusFilter,
  todoList,
  filteredList,
  taskInput,
  taskDescription,
  internshipInput,
  statusInput,
  currentJobInput,
  annualIncomeInput,
  handleSubmit,
  handleDelete,
  handleEdit,
  handleSave,
  handleCancelEdit,
  clearFilter,
  cards,
} = useTaskManager();
</script>

<template>
  <v-app>
    <v-main>
      <!-- ステータス絞り込み -->
      <v-container class="pt-4" fluid>
        <v-select
          v-model="statusFilter"
          :items="['全て', '在校生', '卒業生', 'トランスファー']"
          label="ステータスで絞り込み"
          class="mx-auto"
          style="max-width: 300px"
        />
      </v-container>

      <!-- 件数表示とクリア -->
      <v-container class="text-center mb-4">
        <div>
          {{ filteredList.length }}件見つかりました
          <v-btn v-if="statusFilter !== '全て'" @click="clearFilter" text small color="primary">
            絞り込みをクリア
          </v-btn>
        </div>
      </v-container>

      <!-- リスト表示 -->
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{ card }}</v-list-subheader>

                <template v-for="(item, index) in filteredList" :key="index">
                  <v-list-item>
                    <template #prepend>
                      <v-avatar color="grey-darken-1" size="24"></v-avatar>
                    </template>
                    <div class="mcon">
                      <div v-if="item.isEditing">
                        <v-text-field v-model="item.title" label="ニックネームを編集" dense />
                        <v-text-field v-model="internshipInput" label="インターン経験" class="mx-2" />
                        <v-select
                          v-model="statusInput"
                          :items="['在校生', '卒業生', 'トランスファー']"
                          label="ステータス"
                          class="mx-2"
                        />
                        <v-text-field v-model="currentJobInput" label="今の職場" class="mx-2" />
                        <v-text-field
                          v-model="annualIncomeInput"
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
                        <v-btn size="30" @click="handleEdit(item)" icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn size="30" @click="handleDelete(item.id)" icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-list-item>
                  <v-divider v-if="index !== filteredList.length - 1" :key="`divider-${index}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- 新規入力フォーム -->
      <v-container class="input-container">
        <div class="input-form">
          <v-text-field
            v-model="taskInput"
            class="mx-2"
            label="ニックネーム"
          />
          <v-text-field
            v-model="internshipInput"
            label="インターン経験"
            class="mx-2"
          />
          <v-select
            v-model="statusInput"
            :items="['在校生', '卒業生', 'トランスファー']"
            label="ステータス"
            class="mx-2"
          />
          <v-text-field
            v-model="currentJobInput"
            label="今の職場"
            class="mx-2"
          />
          <v-text-field
            v-model="annualIncomeInput"
            label="年収（万円）"
            type="number"
            class="mx-2"
          />
          <v-btn size="55" class="submit-button" @click="handleSubmit" type="submit">
            送信
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* 追加のスタイル */
</style>
