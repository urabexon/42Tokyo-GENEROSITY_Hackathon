<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    item: Object
});

const emit = defineEmits(['delete', 'update']);
const isEditing = ref(false);
const edited = ref({ ...props.item });

// props.itemが変わったらeditedも更新
watch(() => props.item, (newVal) => {
    edited.value = { ...newVal };
});

const save = () => {
    emit('update', { ...edited.value });
    isEditing.value = false;
};

const cancel = () => {
    edited.value = { ...props.item };
    isEditing.value = false;
};
</script>

<template>
    <v-list-item>
        <div v-if="isEditing">
            <v-text-field v-model="edited.nickname" label="ニックネーム" class="custom-input" />
            <v-text-field v-model="edited.age" label="年齢" type="number" class="custom-input" />
            <v-select
                v-model="edited.gender"
                :items="['男性', '女性', 'その他', '未回答']"
                label="性別"
                class="custom-input"
            />
            <v-select
                v-model="edited.status"
                :items="['在校生', '卒業生', 'トランスファー']"
                label="ステータス"
                class="custom-input"
            />
            <v-text-field v-model="edited.internship" label="インターン経験" class="custom-input" />
            <v-text-field v-model="edited.currentJob" label="今の職場" class="custom-input" />
            <v-select
                v-model="edited.jobType"
                :items="['Web系', 'SIer', 'フリーランス', 'スタートアップ', '未定']"
                label="職種"
                class="custom-input"
            />
            <v-text-field v-model="edited.annualIncome" label="年収(万円)" type="number" class="custom-input" />
            <v-textarea v-model="edited.message" label="自由コメント" class="custom-input" auto-grow />

            <v-btn color="success" @click="save" class="custom-button">保存</v-btn>
            <v-btn color="error" @click="cancel" class="custom-button">キャンセル</v-btn>
        </div>
        <div v-else>
            <v-card class="pa-4 my-3" elevation="2">
                <v-card-title>
                    {{ item.nickname }}（{{ item.status }}）
                    <v-spacer />
                    <v-btn icon @click="isEditing = true" class="custom-icon-button">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="$emit('delete', item.id)" class="custom-icon-button">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-subtitle>
                    年齢: {{ item.age ?? '未設定' }} / 性別: {{ item.gender ?? '未設定' }}
                </v-card-subtitle>
                <v-card-text>
                    <div>インターン経験: {{ item.internship || 'なし' }}</div>
                    <div>現在の職場: {{ item.currentJob || '未設定' }}</div>
                    <div>職種: {{ item.jobType || '未設定' }}</div>
                    <div>年収: {{ item.annualIncome ? item.annualIncome + '万円' : '未設定' }}</div>
                    <div class="mt-2">コメント:<br />{{ item.message || '（コメントなし）' }}</div>
                </v-card-text>
            </v-card>
        </div>
    </v-list-item>
</template>

<style scoped>
.custom-input {
    margin-bottom: 10px;
}

.custom-button {
    margin-right: 10px;
}
</style>
