<script setup lang="ts">
import { type CustomSelectConfig } from './types';
import { ref} from 'vue';

defineProps<CustomSelectConfig>();

defineEmits<{
    (event: 'input', value: string): void
}>();

const isOn = ref<boolean>(false);
</script>

<template>
    <div class="customSelectContainer">
        <button class="normalButton" :selectState="isOn" @click="isOn = ! isOn">{{ $props.name }}</button>
        <div class="customSelectOptionDiv" v-if="isOn === true">
            <div v-for="(item, index) in $props.options" :key="index">
                <button class="customSelectOptionButton" @click="() => {$emit('input', item); isOn = false;}">{{ item }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.customSelectContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 25px 0 0;
    z-index: 999;
}

.normalButton {
    width: 175px;
    margin: 0;
}

.normalButton[selectState="true"] {
    background-color: var(--color-red-umd-dark);
}

.customSelectOptionDiv {
    top: 40px;
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    padding: 5px 0 0 0;
}

.customSelectOptionButton {
    width: 125px;
    height: 30px;
    margin: 0 0 5px 0;
    border-radius: 10px;
    border-color: transparent;
    background-color: var(--color-red-umd);
    color: white;
    text-align: center;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
}

.customSelectOptionButton:hover {
    background-color: var(--color-red-umd-slight-light);
}

</style>