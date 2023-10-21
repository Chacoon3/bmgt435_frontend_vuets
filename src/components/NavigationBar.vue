<script setup lang="ts">
import { type NavigationConfig } from './types';
import { ref } from 'vue';

defineProps<NavigationConfig>();
defineEmits<{
    (event: 'update:focus', value: number): void
}>();

const currentUrl = ref<string>("");
</script>

<template>
    <nav id="navigationBar">

        <div id="naviWrapper">
            <div v-for="(item, index) in $props.items" :key="index" :to="{ name: item.url }" class="navigationItemDiv"
                :isCurrent="currentUrl === item.url" @click="$emit('update:focus', index)">
                <img v-bind:src="item.imgSource" class="naviImg">
                <span class="naviText">{{ item.text }}</span>
            </div>
        </div>
    </nav>
</template>

<style scoped>
#navigationBar {
    width: 220px;
}

#naviWrapper {
    position: sticky;
    width: 220px;
    top: 0%;
}

.navigationItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 10px 0 10px;
    height: calc(max(100vh / v-bind("$props.items.length"), 100px));
    background-color: var(--color-red-umd);
    transition: var(--transition-button);
    box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.5);
}

.navigationItemDiv:hover {
    background-color: palevioletred;
    cursor: pointer;
}

.navigationItemDiv[isCurrent="true"] {
    background-color: palevioletred;
}

img.naviImg {
    width: 25%;
    height: 25%;
}

.naviText {
    width: 45%;
    padding-left: 10%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: "";
}
</style>