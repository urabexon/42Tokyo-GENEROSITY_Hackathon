<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const fetchData = async () => {
  const q = query(collection(db, 'tasks'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  items.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

onMounted(fetchData);

const handleSubmit = async (newItem) => {
  const docRef = await addDoc(collection(db, 'tasks'), newItem);
  items.value.unshift({ ...newItem, id: docRef.id });
};

const handleUpdate = async (updatedItem) => {
  const refDoc = doc(db, 'tasks', updatedItem.id);
  await updateDoc(refDoc, updatedItem);
  const index = items.value.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) items.value[index] = updatedItem;
};

const handleDelete = async (id) => {
  await deleteDoc(doc(db, 'tasks', id));
  items.value = items.value.filter(item => item.id !== id);
};
</script>

<template>
  <v-container>
    <TopList :items="items" @update="handleUpdate" @delete="handleDelete" />
    <TopForm @submit="handleSubmit" />
  </v-container>
</template>
