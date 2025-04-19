// src/composables/useTaskManager.ts
import { ref, computed, onMounted, reactive } from 'vue';
import { db } from '@/firebase/firebase.ts';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';

export function useTaskManager() {
  const statusFilter = ref('全て');
  const todoList = reactive<any[]>([]);

  const filteredList = computed(() => {
    if (statusFilter.value === '全て') {
      return todoList;
    }
    return todoList.filter((item) => item.status === statusFilter.value);
  });

  const clearFilter = () => {
    statusFilter.value = '全て';
  };

  const taskInput = ref('');
  const taskDescription = ref('');
  const internshipInput = ref('');
  const statusInput = ref('');
  const currentJobInput = ref('');
  const annualIncomeInput = ref<number | null>(null);

  // データ取得
  onMounted(async () => {
    try {
      const chatRef = collection(db, 'tasks');
      const chatQuery = query(chatRef, orderBy('timestamp', 'desc'));
      const snapShot = await getDocs(chatQuery);
      snapShot.forEach((doc) => {
        todoList.push({ ...doc.data(), id: doc.id });
      });
    } catch (error) {
      console.error('Firestoreのデータ取得に失敗しました:', error);
    }
  });

  const handleSubmit = async () => {
    if (taskInput.value.trim() !== '' || taskDescription.value.trim() !== '') {
      const newPeople = {
        title: taskInput.value,
        internship: internshipInput.value,
        status: statusInput.value,
        currentJob: currentJobInput.value,
        annualIncome: annualIncomeInput.value,
        timestamp: new Date(),
      };

      try {
        const docRef = await addDoc(collection(db, 'tasks'), newPeople);
        todoList.unshift({ ...newPeople, id: docRef.id });
        taskInput.value = '';
        taskDescription.value = '';
        internshipInput.value = '';
        statusInput.value = '';
        currentJobInput.value = '';
        annualIncomeInput.value = null;
      } catch (error) {
        console.error('Firestoreへのメッセージ保存に失敗しました:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      const index = todoList.findIndex((tsk) => tsk.id === id);
      if (index !== -1) {
        todoList.splice(index, 1);
      }
    } catch (error) {
      console.error('Firestoreからのタスク削除に失敗しました:', error);
    }
  };

  const handleEdit = (item: any) => {
    item.originalTitle = item.title;
    item.isEditing = true;

    taskInput.value = item.title;
    internshipInput.value = item.internship || '';
    statusInput.value = item.status || '';
    currentJobInput.value = item.currentJob || '';
    annualIncomeInput.value = item.annualIncome || null;
  };

  const handleSave = async (item: any) => {
    try {
      const taskDoc = doc(db, 'tasks', item.id);
      await updateDoc(taskDoc, {
        title: item.title,
        internship: internshipInput.value,
        status: statusInput.value,
        currentJob: currentJobInput.value,
        annualIncome: annualIncomeInput.value,
      });

      item.isEditing = false;
      delete item.originalTitle;
    } catch (error) {
      console.error('Firestoreのタスク更新に失敗しました:', error);
    }
  };

  const handleCancelEdit = (item: any) => {
    item.title = item.originalTitle;
    delete item.originalTitle;
    item.isEditing = false;
  };

  return {
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
    cards: ['該当者リスト'],
  };
}
