<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { db } from '@/firebase/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

import TopForm from '@/components/TopForm.vue';
import TopList from '@/components/TopList.vue';

const items = ref<any[]>([]);
const statusFilter = ref('全て'); // フィルタ用のステータス

// タスクデータを取得する関数
const fetchData = async () => {
  const q = query(collection(db, 'tasks'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  items.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

onMounted(fetchData);

// フィルタリングされたタスクリストを返すcomputedプロパティ
const filteredItems = computed(() => {
  if (statusFilter.value === '全て') {
    return items.value;
  }
  return items.value.filter(item => item.status === statusFilter.value);
});

// 新しいタスクを追加する関数
const handleSubmit = async (newItem) => {
  const docRef = await addDoc(collection(db, 'tasks'), newItem);
  items.value.unshift({ ...newItem, id: docRef.id });
};

// タスクを更新する関数
const handleUpdate = async (updatedItem) => {
  const refDoc = doc(db, 'tasks', updatedItem.id);
  await updateDoc(refDoc, updatedItem);
  const index = items.value.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) items.value[index] = updatedItem;
};

// タスクを削除する関数
const handleDelete = async (id) => {
  await deleteDoc(doc(db, 'tasks', id));
  items.value = items.value.filter(item => item.id !== id);
};
</script>

<template>
  <v-container>
    <!-- ステータスで絞り込むためのv-select -->
    <v-select
      v-model="statusFilter"
      :items="['全て', '在校生', '卒業生', 'トランスファー']"
      label="ステータスで絞り込み"
      class="mx-auto"
      style="max-width: 300px"
    />

    <!-- 件数表示 -->
    <div class="text-center mb-4">
      <div>{{ filteredItems.length }}件見つかりました</div>
    </div>

    <!-- フィルタリングされたタスクのリスト -->
    <TopList :items="filteredItems" @update="handleUpdate" @delete="handleDelete" />

    <!-- タスクフォーム -->
    <TopForm @submit="handleSubmit" />
  </v-container>
</template>
