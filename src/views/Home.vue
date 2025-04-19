<!-- src/views/Home.vue -->
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import TopForm from '@/components/TopForm.vue';
import TopList from '@/components/TopList.vue';

const todoList = reactive([]);

const handleSubmit = async (newItem) => {
  const docRef = await addDoc(collection(db, "tasks"), newItem);
  todoList.unshift({ ...newItem, id: docRef.id });
};

const handleDelete = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
  const index = todoList.findIndex((tsk) => tsk.id === id);
  if (index !== -1) {
    todoList.splice(index, 1);
  }
};

const handleUpdate = async (item) => {
  await updateDoc(doc(db, "tasks", item.id), item);
};

onMounted(async () => {
  const q = query(collection(db, "tasks"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    todoList.push({ ...doc.data(), id: doc.id });
  });
});
</script>

<template>
  <v-container class="py-8 px-6" fluid>
    <TopList :items="todoList" @delete="handleDelete" @update="handleUpdate" />
    <TopForm @submit="handleSubmit" />
  </v-container>
</template>
