<script setup lang="ts">
import { type ButtonConfig } from './types';

defineProps<{config: ButtonConfig}>();
</script>

<template>
    <button v-if="config.htmlClass" :class="config.htmlClass" :disabled="config.disabled?.() ?? false" @click="config.onClick">
        {{ config.text }}
    </button>
    <button v-else :disabled="config.disabled()" @click="config.onClick">
        {{ config.text }}
    </button>
</template>
