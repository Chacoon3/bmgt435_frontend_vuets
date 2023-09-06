<script setup lang="ts">
import { type ButtonConfig } from './types';

defineProps<ButtonConfig>();
</script>

<template>
    <button class="normalButton" :disabled="$props.disabled ?? false" @click="$props.onClick">
        {{ $props.text }}
    </button>
</template>
