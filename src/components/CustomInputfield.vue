<script setup lang="ts">
import type {CustomInputConfig} from './types';

defineProps<{config: CustomInputConfig}>();
defineEmits<{(event: 'update:value', value: string): void}>();
</script>

<template>
    <div>
        <label v-if="config.label" class="customInputLable">{{ config.label }}</label>
        <input v-if="config.type === 'text'" type="text" :placeholder="config.placeholder ?? ''" :value="config.defaultValue ?? ''" @input="$emit('update:value', $event.target.value)">
    </div>
</template>

<style scoped>
.customInputLable {
    margin-right: 2em;
}
</style>