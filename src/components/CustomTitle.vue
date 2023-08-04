<script setup lang="ts">

defineProps({
    title: String
})
</script>

<template>
    <div id="titleDiv">
        <h1>{{ title }}</h1>
        <hr class="titleHr">
    </div>
</template>

<style scoped>
#titleDiv {
    position: relative;
    top: 5vh;
}

.titleHr {
    min-width: 50vw;
    max-width: 60vw;
}
</style>