<script setup lang="ts">
import { computed } from 'vue';
import { type FoodcenterCenterState } from '@/utils/caseUtils'

const props = defineProps<FoodcenterCenterState>()
defineEmits<{
     (event: 'update:isOn', data: boolean): void ,
     (event: 'update:smallS', data: number): void 
     (event: 'update:bigS', data: number): void 
}>()

const buttonColor = computed(() => {
    return props.isOn ? "green" : "red";
});


function validatePolicy() {
    if (props.smallS > props.bigS) {
        return false;
    }
    else {

        return true;
    }
}
</script>

<template>  
    <div class="centerConfigPanel">
        <div class="foodcenterCenterName">
            {{ $props.name ?? "Unnamed" }}
        </div>
        <div>
            <button class="normalButton" :buttonColor=buttonColor @click="() => { $emit('update:isOn', !props.isOn) }">
                {{ props.isOn ? "Selected" : "Deselected" }}
            </button>
        </div>

        <div>
            <label>
                s
            </label>
                <input class="foodcenterInputNumber" type="number" :v-model="props.smallS" :disabled="props.isOn === false"
                    :onInput="() => {validatePolicy(); $emit('update:smallS', props.smallS);}">
        </div>
        <div>
            <label>
                S
            </label>
                <input class="foodcenterInputNumber" type="number" :v-model="props.bigS" :disabled="props.isOn === false"
                :onInput="() => {validatePolicy(); $emit('update:bigS', props.bigS);}">
        </div>

    </div>
</template>

<style scoped>
.foodcenterCenterName {
    margin-top: 1em;
}
.centerConfigPanel {
    border-style: solid;
    border-width: 1px;
    border-color: gray;
    box-shadow: 0 0 2px 2px lightgray;

    width: 130px;
    min-height: 175px;
}

.foodcenterInputNumber {
    width: 50px;
}

[buttonColor="green"] {
    background-color: var(--color-green);
}

[buttonColor="green"]:hover {
    background-color: var(--color-green-dark);
}

[buttonColor="red"] {
    background-color: var(--color-red-umd);
}

[buttonColor="red"]:hover {
    background-color: var(--color-red-umd-dark);
}

label {
    display: inline-block;
    width: 1em;
    text-align: right;
    padding-right: 1em;
}
</style>