<script setup lang="ts">
import { ref } from 'vue';
import { type CustomSelectGroupConfig } from './types';

const props = defineProps<CustomSelectGroupConfig>();

defineEmits<{ (event: 'update:value', value: string): void }>();

const selectStates = ref<boolean[]>(Array.from(props.selectConfigs, () => false));

function handleClickCustomSelect(index: number) {
    if (selectStates.value[index] === true) {
        selectStates.value[index] = false;
    }
    else {
        selectStates.value.forEach((item, arrIndex) => {
            selectStates.value[arrIndex] = arrIndex === index;
        })
    }
}
</script>

<template>
    <div id="customSelectGroupDiv" :flexDir="$props.flexDirection ?? 'column'">

        <div class="customSelectContainer" v-for="(item, index) in selectConfigs" :key="index">
            <button class="normalButton" :selectState="selectStates[index]" @click="() => handleClickCustomSelect(index)">{{
                item.name }}</button>
            <div class="customSelectOptionDiv" v-if="selectStates[index] === true">
                <div v-for="(subItem, subIndex) in item.options" :key="subIndex">
                    <button class="customSelectOptionButton"
                        @click="() => { $emit('update:value', subItem); selectStates[index] = false; }">{{ subItem }}</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
#customSelectGroupDiv {
    display: flex;
    z-index: 999;
}

#customSelectGroupDiv[flexDir="row"] {
    flex-direction: row;
    justify-content: center;
}

#customSelectGroupDiv[flexDir="column"] {
    flex-direction: column;
}



.customSelectContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 25px 0 0;
    z-index: 999;
}

.normalButton {
    min-width: 10em;
    min-height: 2.5em;
    margin: 0;
}

.normalButton[selectState="true"] {
    background-color: var(--color-red-umd-dark);
}

.customSelectOptionDiv {
    position: relative;
    top: 5px;
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
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