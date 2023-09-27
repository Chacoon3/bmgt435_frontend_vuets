<script setup lang="ts">

defineProps({
    title: String
})
</script>

<template>
    <div id="customTitleDiv">
        <h1 id="titleH1">{{ title }}</h1>
        <hr class="titleHr" align="left">
    </div>
</template>

<style scoped>
#customTitleDiv {
    padding-left: 9em;
}


#titleH1 {  
    margin: 3% 0 1% 0;
}

.titleHr {
    position: relative;
    width: 85%;
    margin-bottom: 5px;
}
</style>