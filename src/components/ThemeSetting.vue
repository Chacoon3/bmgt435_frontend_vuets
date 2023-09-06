<script setup lang="ts">
import { ref } from 'vue';
import useTheme from '@/utils/themeUtils';

const state = ref<number>(0);
const { themeConfig} = useTheme();
</script>

<template>
    <div id="themeSetting">
        <div>Color mode</div>
        <button class="normalButton" @click="state = 0; themeConfig.colorMode = 'light'"
            :disabled="state === 0">Light</button>
        <button class="normalButton" @click="state = 1; themeConfig.colorMode = 'dark'"
            :disabled="state === 1">Dark</button>
    </div>
</template>

<style scoped>
#themeSetting {
    position: absolute;
    background-color: transparent;
    top: 10px;
    right: 10px;
    text-align: center;
}

button {
    width: 50px;
}
</style>