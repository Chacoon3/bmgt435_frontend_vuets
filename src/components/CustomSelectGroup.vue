<script setup lang="ts">
import { ref } from 'vue';
import { type CustomSelectGroupConfig } from './types';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<CustomSelectGroupConfig>();

defineEmits<{
    (event: 'update:value', value: string): void
}>();

const selectStates = ref<boolean[]>(Array.from(props.selectConfigs, () => false));
</script>

<template>
    <div id="customSelectGroupDiv" :flexDir="$props.flexDirection ?? 'column'">
        <CustomSelect v-for="(item, index) in $props.selectConfigs" :key="index" :name="item.name"
            v-model:options="item.options" ></CustomSelect>

    </div>
</template>

<style scoped>
#customSelectGroupDiv {
    display: flex;
    z-index: 999;
}

#customSelectGroupDiv[flexDir="row"] {
    flex-direction: row;
}

#customSelectGroupDiv[flexDir="column"] {
    flex-direction: column;
}
</style>