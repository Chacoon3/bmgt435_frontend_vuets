<script setup lang="ts">
import { type InLineMsgConfig } from './types';

const props = withDefaults(defineProps<InLineMsgConfig>(),
    {
        show: false,
        content: "",
        type: "error"
    }
);

</script>

<template>
    <div class="inLineMsg" :msgState="props.type">
        <span v-if="props.show" class="inline-msg">
            <span>{{ props.content }}</span>
        </span>
    </div>
</template>

<style scoped>
.inLineMsg {
    display: block;
    text-align: center;
    margin: 1em;
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