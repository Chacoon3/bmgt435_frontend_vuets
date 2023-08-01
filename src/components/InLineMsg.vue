<script setup lang="ts">
import { InLineMsgConfig } from './types';

const props = withDefaults(defineProps<InLineMsgConfig>(),
    {
        show: false,
        content: ""
    }
);

</script>

<template>
    <div class="inLineMsg">
        <span v-if="props.show" class="inline-msg">
            <span>{{ props.content }}</span>
        </span>
    </div>
</template>

<style scoped>
.inLineMsg {
    display: block;
    color: red;
    text-align: center;
    margin: 1em;
}


</style>../types