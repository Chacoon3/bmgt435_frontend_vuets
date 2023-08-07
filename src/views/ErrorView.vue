<script setup lang="ts">
import useErrorUtil from '../utils/errorUtils';

const { errorContext } = useErrorUtil();
</script>

<template>
    <div>
        <h2 class="errPageH2">Application crashed ...</h2>
        <p class="errorP">{{errorContext?.message}}</p>
        <p class="errorP"> {{ errorContext?.error }}</p>
        <p class="errorP"> {{ errorContext?.error?.status }}</p>
    </div>
</template>

<style scoped>
.errPageH2 {
    text-align: center;
}

.errorP {
    margin-left: 5vw;
}
</style>
