<!-- <script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { db } from '@/firebase/firebase.ts';
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

const cards = ['該当者リスト'];
const todoList = reactive([]);

const taskInput = ref('');
const taskDescription = ref('');
const internshipInput = ref('');
const statusInput = ref('');
const currentJobInput = ref('');
const annualIncomeInput = ref(null);

const handleSubmit = async () => {
  if (taskInput.value.trim() !== '' || taskDescription.value.trim() !== '') {
    const newPeople = {
      title: taskInput.value,
      internship: internshipInput.value,
      status: statusInput.value,
      currentJob: currentJobInput.value,
      annualIncome: annualIncomeInput.value,
      timestamp: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), newPeople);
      todoList.unshift({ ...newPeople, id: docRef.id });
      taskInput.value = '';
      taskDescription.value = '';
      internshipInput.value = '';
      statusInput.value = '';
      currentJobInput.value = '';
      annualIncomeInput.value = null;
    } catch (error) {
      console.error("Firestoreへのメッセージ保存に失敗しました:", error);
    }
  }
};

const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "tasks", id));
    const index = todoList.findIndex((tsk) => tsk.id === id);
    if (index !== -1) {
      todoList.splice(index, 1);
    }
  } catch (error) {
    console.error("Firestoreからのタスク削除に失敗しました:", error);
  }
};

const handleEdit = (item) => {
  item.originalTitle = item.title;
  item.isEditing = true;

  taskInput.value = item.title;
  internshipInput.value = item.internship || '';
  statusInput.value = item.status || '';
  currentJobInput.value = item.currentJob || '';
  annualIncomeInput.value = item.annualIncome || null;
};

const handleSave = async (item) => {
  try {
    const taskDoc = doc(db, "tasks", item.id);
    await updateDoc(taskDoc, {
      title: item.title,

    });

    item.isEditing = false;
    delete item.originalTitle;
    delete item.originalDescription;
  } catch (error) {
    console.error("Firestoreのタスク更新に失敗しました:", error);
  }
};

const handleCancelEdit = (item) => {
  item.title = item.originalTitle;
  item.description = item.originalDescription;
  delete item.originalTitle;
  delete item.originalDescription;
  item.isEditing = false;
};

const handleReset = () => {
  taskInput.value = '';
  taskDescription.value = '';
};

onMounted(async () => {
  try {
    const chatRef = collection(db, "tasks");
    const chatQuery = query(chatRef, orderBy("timestamp", "desc"));
    const snapShot = await getDocs(chatQuery);
    snapShot.forEach((doc) => {
      todoList.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.error("Firestoreのデータ取得に失敗しました:", error);
  }
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{ card }}</v-list-subheader>

                <template v-for="(item, index) in todoList" :key="index">
                  <v-list-item>
                    <template #prepend>
                      <v-avatar color="grey-darken-1" size="24"></v-avatar>
                    </template>
                    <div class="mcon">
                      <div v-if="item.isEditing">
                        <v-text-field
                          v-model="item.title"
                          label="ニックネームを編集"
                          dense
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
                  <v-divider v-if="index !== todoList.length - 1" :key="`divider-${index}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

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
          <v-btn size="55" class="submit-button" @click="handleSubmit" type="submit">送信</v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.task {
  text-align: left;
  font-weight: bold;
}
.mcon {
  margin-left: 20px;
}
.input-container {
  margin: 0;
}
.input-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
}
.todo-item {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
.text-content {
  flex-grow: 1;
}
</style> -->

<!-- src/views/Home.vue -->
<script setup lang="ts">
  import HomeList from '@/views/Home.vue';
</script>

<template>
	 <div class="logo-container">
    <pre class="logo-text"><span class="prompt">$</span> <span class="command">./careertracker</span> <span class="cursor"></span></pre>
    <div class="logo-subtitle">42生のキャリアを可視化する</div>
  </div>
  <HomeList/>
</template>