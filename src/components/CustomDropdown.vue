<script setup lang="ts">
import type { DropdownConfig } from './types';

// options are required as will be displayed in the dropdown
// if values provided, they will be used instead of the options
defineProps<{ config: DropdownConfig }>();
defineEmits<{ (event: 'update:value', value: string): void }>();
</script>

<template>
    <div class="customDropdown">
        <label>{{ config.name }}</label>
        <select autocomplete="off" @change="$emit('update:value', $event.target.value)">
            <option v-for="(item, index) in config.options" :key="index" class="customOption" :value="config.values?.[index] ?? null">{{ item }}</option>
        </select>
    </div>
</template>

<style scoped>
.customDropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
    width: v-bind(config.width ?? "12.5em");
}

.customOption {
    min-width: 50px;
    max-width: 150px;
}
</style>