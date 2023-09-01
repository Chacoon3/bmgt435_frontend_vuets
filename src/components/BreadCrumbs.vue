<script setup lang="ts">
import { ref } from 'vue';

defineProps<string[]>();

const state = ref<number>(0);

defineEmits<{
  (event: 'update', index: number): void
}>()
</script>

<template>
    <div id="breadcrumbsContainer">
        <div v-for="(item, index) in $props" :key="index">
            <button :disabled="index > state" @click="() => {state = index; $emits('update', index)}">{{ item }}</button>
            <img src="icons/breadcrumbs/breadcrumbs_arrow">
        </div>
    </div>
</template>

<style scoped>
#breadcrumbsContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>