<script setup lang="ts">
import { type InLineMsgConfig } from './types';

defineProps<{config:InLineMsgConfig}>();

</script>

<template>
    <div class="inLineMsg" :msgState="config?.type ?? 'error'">
        <span v-if="config.show === true" class="inline-msg">
            <span>{{ config.content }}</span>
        </span>
    </div>
</template>

<style scoped>
.inLineMsg {
    display: block;
    margin: 1em;
    text-align: v-bind(config?.textAlign ?? 'left');
}

.inLineMsg[msgState=error] {
    color: var(--color-red-umd);
}

.inLineMsg[msgState="normal"] {
    color: black;
}

.inLineMsg[msgState="warning"] {
    color: var(--color-red-umd)
}

</style>