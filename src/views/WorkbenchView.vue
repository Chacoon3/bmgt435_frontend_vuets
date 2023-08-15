<script setup lang="ts">
import { ref } from 'vue';
import router, { routePaths } from '@/router';
import { useCurrentUser } from '../utils/userUtils'
import { useCumulatedCases } from '../utils/caseUtils'
import FoodCenter from './workbenchChildren/FoodCenter.vue'

const caseSelection = ref<number | null>(null);
const { currentUser } = useCurrentUser();
const { isLoading: isCasesLoading, data: cases, getData: getCases } = useCumulatedCases();
getCases();

</script>


<template>
    <div id="workbenchContainer">
        <div v-if="caseSelection === null">
            <div class="workbenchContent" v-if="currentUser && currentUser.group_id !== null">
                <div v-if="isCasesLoading === true">
                    Fetching Data...
                </div>
                <div v-else-if="cases !== null && cases !== null && cases.length > 0">
                    <h3>Your Case : {{ cases[0].name }}</h3>
                    <div>
                        <button class="normalButton" @click="() => caseSelection = cases[0].id">Click to enter
                            simulation</button>
                    </div>
                </div>
                <div v-else>
                    <h3>No case currently available to you!</h3>
                </div>
            </div>

            <div class="workbenchContent" v-else>
                <h2>It appears you are not in a group yet. Please join or create a group first.</h2>
                <button class="normalButton" @click="router.push({ name: routePaths.grouping })">Okay!</button>
            </div>
        </div>

        <FoodCenter v-else-if="caseSelection === 1"></FoodCenter>

    </div>
</template>


<style scoped>
#workbenchContainer {
    text-align: center;
    padding-right: var(--width-whitespace-right);  /* white space for mudule page at the right side */
}

.normalButton {
    width: 200px;
    height: 50px;
}
</style>