<script setup lang="ts">


const centerNames = ["Center 1", "Center 2", "Center 3", "Center 4", "Center 5"];
</script>

<template>
    <div>
        Food Center
    </div>

    <div id="centerContainer">
        <div v-for="(item, index) in centerNames" :key="index">
         <button>{{ item }}</button>
         <input type="number" value="s Policy">
        </div>
    </div>

</template>

<style scoped>
#centerContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

input[type='number'] {
    margin: 0;
}
</style>