<script setup lang="ts">
import { reactive, computed } from 'vue';
import { type CenterItemConfig } from './types'

defineProps<{name?:string}>()

const state = reactive<CenterItemConfig>({
    isOn: true,
    smallS: 0,
    bigS: 0
});

const buttonColor = computed(() => {
    return state.isOn ? "green" : "red";
});

</script>

<template>
    <div class="centerConfigPanel">
        <div>
            {{ $props.name ?? "Unnamed Center" }}
        </div>
        <div>
            <button class="normalButton" :buttonColor=buttonColor @click="() => { state.isOn = !state.isOn; }">
                {{ state.isOn ? "Selected" : "Deselected" }}
            </button>
        </div>

        <div>
            <label>
                s value
            </label>
                <input class="foodcenterInputNumber" type="number" v-model="state.smallS" :disabled="state.isOn === false">
        </div>
        <div>
            <label>
                S value
            </label>
                <input class="foodcenterInputNumber" type="number" v-model="state.bigS" :disabled="state.isOn === false">
        </div>



    </div>
</template>

<style scoped>
.centerConfigPanel {
    border-style: solid;
    border-width: 1px;
    border-color: gray;

    width: 160px;
    height: 150px;
}

.foodcenterInputNumber {
    width: 75px;
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

slot {
    text-align: center;
}
</style>