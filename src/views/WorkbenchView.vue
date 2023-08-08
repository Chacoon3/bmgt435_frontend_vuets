<script setup lang="ts">
import { ref } from 'vue';
import router, { routePaths } from '@/router';
import { useCurrentUser } from '../utils/userUtils'
import { useCases } from '../utils/caseUtils'
import FoodCenter from './workbenchChildren/FoodCenter.vue'


const { currentUser } = useCurrentUser()
const { isCasesLoading, cases, getCases } = useCases()
getCases();
const caseSelection = ref<number | null>(null);
</script>


<template>
    <div id="workbenchContainer">

        <div class="workbenchContent" v-if="currentUser && currentUser.group_id !== null">
            <div v-if="caseSelection === null">
                <div v-if="isCasesLoading === true">
                    Fetching Data...
                </div>
                <div v-else-if="cases.length > 0">
                    <h3>Your Cases</h3>
                    <div v-for="item in cases" :key="item.id">
                        <button class="caseButton" @click="() => caseSelection = item.id">{{ item.name }}</button>
                    </div>
                </div>
                <div v-else>
                    <h3>No cases currently available to you!</h3>
                </div>
            </div>
            
            <FoodCenter v-else-if="caseSelection === 1"></FoodCenter>

        </div>

        <div class="workbenchContent" v-else>
            <h2>It appears you are not in a group yet. Please join or create a group first.</h2>
            <button id="okayButton" type="button" @click="router.push({ name: routePaths.grouping })">Okay!</button>
        </div>

    </div>
</template>


<style scoped>
#workbenchContainer {
    text-align: center;
}

.caseButton {
    width: 200px;
    height: 80px;
}
</style>