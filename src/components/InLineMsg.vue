<script setup lang="ts">
import { InLineMsgConfig } from './componentTypes';

const props = withDefaults(defineProps<InLineMsgConfig>(),
    {
        show: false,
        content: ""
    }
);

</script>

<template>
    <span>
        <span v-if="props.show" class="inline-msg">
            <span>{{ props.content }}</span>
        </span>
    </span>
</template>

<style scoped>
.inline-msg {
    display: block;
    color: red;
    text-align: center;
}
</style>