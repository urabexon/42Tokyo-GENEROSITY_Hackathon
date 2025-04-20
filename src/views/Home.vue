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
const jobFilter = ref('全て')
const internFilter = ref('全て')

const minSalary = ref<number | null>(null);
const maxSalary = ref<number | null>(null);

const clearFilters = () => {
  statusFilter.value = '全て'
  jobFilter.value = '全て'
  internFilter.value = '全て';
  minSalary.value = null;  // 修正: refのvalueを直接変更
  maxSalary.value = null;
}


// タスクデータを取得する関数
const fetchData = async () => {
  const q = query(collection(db, 'tasks'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  items.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

onMounted(fetchData);

// フィルタリングされたタスクリストを返すcomputedプロパティ
const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchStatus =
      statusFilter.value === '全て' || item.status === statusFilter.value;

    const matchJob =
      jobFilter.value === '全て' ||
      jobFilter.value === null ||
      item.currentJob === jobFilter.value;

    const matchIntern =
        internFilter.value === '全て' ||
        internFilter.value === null ||
        item.internship === internFilter.value;
    // annualIncome が undefined/null の場合は 0 として扱う
    const income = item.annualIncome;
    console.log("maxSalary.value:", maxSalary.value);
    const matchMinSalary = 
        minSalary.value === null || income >= minSalary.value;
    const matchMaxSalary =
      maxSalary.value === null || income <= maxSalary.value;
    return matchStatus && matchIntern && matchJob && matchMinSalary && matchMaxSalary;
  });
});

const statistics = computed(() => {
  console.log("filteredItems.value:", filteredItems.value);

  const incomes = filteredItems.value
    .map(item => Number(item.annualIncome)) // ← 数値に変換
    .filter(i => !isNaN(i));                // ← NaNは除外

  const total = incomes.reduce((sum, val) => sum + val, 0);
  const count = incomes.length;
  const average = count > 0 ? Math.round(total / count) : 0;
  const max = count > 0 ? Math.max(...incomes) : 0;
  const min = count > 0 ? Math.min(...incomes) : 0;

  return {
    count,
    average,
    max,
    min
  };
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
    <v-combobox
    v-model="internFilter"
    :items="['GENEROSITY', 'MIXI', 'REAZON HOLDINGS', 'aws']"
    label="インターン経験で絞り込み（自由入力OK）"
    class="mx-auto"
    style="max-width: 300px"
    />
    <v-combobox
    v-model="jobFilter"
    :items="['GENEROSITY', 'MIXI', 'REAZON HOLDINGS', 'aws']"
    label="今の職場で絞り込み（自由入力OK）"
    class="mx-auto"
    style="max-width: 300px"
    />
    <v-text-field
    v-model.number="minSalary"
    label="最低年収（万円）"
    type="number"
    class="mx-auto"
    style="max-width: 300px"
    />

    <v-text-field
    v-model.number="maxSalary"
    label="最高年収（万円）"
    type="number"
    class="mx-auto"
    style="max-width: 300px"
    />

    <v-btn @click="clearFilters" color="primary" class="mt-4">
    検索条件をクリア
    </v-btn>
    <!-- 件数表示 -->
    <div class="text-center mb-4">
      <div>{{ filteredItems.length }}件見つかりました</div>
    </div>
    <!-- 件数表示の下あたりに追加 -->
    <div class="text-center mb-4">
  <div>📈 統計情報</div>
  <div v-if="statistics.count > 0">
    平均年収：{{ statistics.average }} 万円<br />
    最高年収：{{ statistics.max }} 万円<br />
    最低年収：{{ statistics.min }} 万円
  </div>
  <div v-else>
    該当する年収データがありません
  </div>
</div>



    <!-- フィルタリングされたタスクのリスト -->
    <TopList :items="filteredItems" @update="handleUpdate" @delete="handleDelete" />

    <!-- タスクフォーム -->
    <TopForm @submit="handleSubmit" />
  </v-container>
</template>
