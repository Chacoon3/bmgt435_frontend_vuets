<script setup lang="ts">
import type { DropdownConfig } from './types';

defineProps<{ config: DropdownConfig }>();
defineEmits<{ (event: 'update:value', value: string): void }>();
</script>

<template>
    <div class="customDropdown">
        <label>{{ config.name }}</label>
        <select autocomplete="off" @change="$emit('update:value', $event.target.value)">
            <option v-for="(item, index) in config.options" :key="index" class="customOption">{{ item }}</option>
        </select>
    </div>
</template>

<style scoped>
.customDropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
    width: v-bind($props.config.width ?? '10em');
}

.customOption {
    min-width: 50px;
    max-width: 150px;
}
</style>