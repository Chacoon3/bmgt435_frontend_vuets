<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{text:string}>();

const dynamicWidth = computed(() => {
    return props.text.length + "em";
});
</script>

<template>
    <button class="normalButton">
        {{ props.text }}
    </button>
</template>

<style scoped>
button {
    width: v-bind(dynamicWidth);
    height: 2em;
}
</style>