<script setup lang="ts">
import { ref } from 'vue';
import TextSection from '@/components/textual/TextSection.vue'
import CenterConfigPanel from './CenterConfigPanel.vue';
import { type FoodcenterCenterState, useFoodcenter } from '@/utils/caseUtils'
import { AxiosResponse } from 'axios';


const showBrief = ref<boolean>(true);
const paramState = ref<FoodcenterCenterState[]>(Array.from([1, 2, 3, 4, 5, 6],
    (index: number) => ({ isOn: true, smallS: 0, bigS: 0, name: `Center ${index}` })));
const { isLoading, result: foodcenterResult, submitCase: runFoodcenter } = useFoodcenter();
function handleRunOnce() {
    if (isLoading.value === true) {
        return;
    }
    runFoodcenter(paramState.value, (resp: AxiosResponse) => {
        if (resp.status !== 200) {
            //
        }
    });
}

function handleSubmit() {
    if (isLoading.value === true) {
        return;
    }
    runFoodcenter(paramState.value, (resp: AxiosResponse) => {
        if (resp.status !== 200) {
            //
        }
    });
}
</script>

<template>
    <div>
        <div v-show="showBrief">
            <h2>Food Center - Introduction</h2>
            <hr class="lv2Hr">
            <p class="caseDescription">
                <TextSection>
                    Terp Delivery Inc. is a food delivery company that operates in several cities across the states. It
                    provides
                    both food and delivery services to its customers.
                </TextSection>
                <TextSection>
                    Currently, Terp Delivery is seeking expansion and has identified six potential locations, makred by
                    numbers as 1, 2, 3, 4, 5 and 6.
                </TextSection>
                <TextSection>
                    Apart from the ongoing expansion, Terp Delivery also wants to optimize its inventory management by
                    applying
                    s-S
                    policy that decides how much raw materials its food delivery centers should buy weekly.
                </TextSection>
                <TextSection>
                    The marketing team has conducted market research and built a simulation model to bettter estimate the
                    performance
                    if a delivery center is built at the location.
                </TextSection>
                <TextSection>
                    The model is comprised of the following components:
                </TextSection>
            <ul id="foodcenterList">
                <li>
                    <b>Decision variables:</b>
                    <br />
                    Locations to expand.
                    <br />
                    Inventory policy (s, S), one for each selected locations.
                </li>
                <br />
                <li>
                    <b>Random inputs:</b>
                    <br />
                    Weekly demand: the number of orders observed at a center in a week.
                    <br />
                    Order amount: the total amount of an order.
                </li>
                <br />
                <li>
                    <b>Constraints:</b>
                    <br />
                    The number of raw materials that the company can buy and distribute weekly
                    to the new centers cannot exceed 50,000.
                    <br />
                    If the restock order across the new centers exceeds 50,000, 50,000 raw materials will be bought and
                    distributed to each center according to the relative proportion of the original restock plan.
                    <br />
                    A fixed weekly cost of $24,000 will be applied to each selected location.
                    <br />
                    The value of all the uncovered orders will be deducted from the revenue as a measure of penalty.
                </li>
                <br />
                <li>
                    <b>Performance metric:</b>
                    <br />
                    Total profit = Total revenue - Total cost
                </li>
                <br />
            </ul>
            <b>Your goals:</b>
            <br />
            Find the best location(s) to expand.
            <br />
            Determine the optimal inventory policy for each selected location.
            </p>
        </div>
        <button class="normalButton" @click="showBrief = !showBrief">{{ showBrief === true ? "Hide introduction" :
            "Show introduction" }}</button>
        <hr>
        <h2>Parameter Setting</h2>
        <hr>
        <div class="foodcenterParamDiv">
            <CenterConfigPanel v-for="(item, index) in paramState" :key="index" v-model:isOn="item.isOn"
                v-model:smallS="item.smallS" v-model:bigS="item.bigS" v-model:name="item.name"></CenterConfigPanel>
        </div>

        <div>
            <button class="normalButton" btnFeature="simulation">Run one iteration</button>
            |
            <button class="normalButton" btnFeature="simulation">Run and submit as final</button>
        </div>

        <h2>Simulation</h2>
        <hr>

    </div>
</template>

<style scoped>
.foodcenterParamDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 20px;
}

.normalButton {
    width: 150px;
}

.normalButton[btnFeature="simulation"] {
    margin-right: 10px;
    margin-left: 10px;
}
</style>