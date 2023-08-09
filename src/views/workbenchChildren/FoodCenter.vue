<script setup lang="ts">
import { ref } from 'vue';
import TextSection from '@/components/textual/TextSection.vue'
import CenterConfigPanel from './CenterConfigPanel.vue';


const showBrief = ref<boolean>(true);
const centerNames = ["Center 1", "Center 2", "Center 3", "Center 4", "Center 5"];

</script>

<template>
    <div>
        <div v-if="showBrief">
        <h2>Food Center - Introduction</h2>
        <hr>
        <p class="caseDescription">
            <TextSection>
                Terp Delivery Inc. is a food delivery company that operates in several cities across the states. It provides
                both food and delivery services to its customers.
            </TextSection>
            <TextSection>
                Currently, Terp Delivery is seeking expansion and has identified six potential locations, makred by
                numbers as 10, 13, 43, 52, 67, and 137.
            </TextSection>
            <TextSection>
                Apart from the ongoing expansion, Terp Delivery also wants to optimize its inventory management by applying
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
                Owing to cash flow issue, the maximum number of raw materials that Terp Delivery Inc. can buy and distribute
                to
                the new centers weekly cannot exceed $50,000.
            </li>
            <br />
            <li>
                <b>Your goals:</b>
                <br />
                Select the best location(s) to expand.
                <br />  
                Determine the optimal inventory policy for each selected location.
            </li>
        </ul>
        </p>
    </div>
        <button class="normalButton" @click="showBrief = ! showBrief">{{ showBrief === true ? "Collapse" : "Show introduction" }}</button>
        <hr >
        <h2>Parameter Setting</h2>
        <hr>
        <div id="foodcenterParamDiv">
            <CenterConfigPanel ></CenterConfigPanel>
            <CenterConfigPanel ></CenterConfigPanel>
            <CenterConfigPanel ></CenterConfigPanel>
            <CenterConfigPanel ></CenterConfigPanel>
            <CenterConfigPanel ></CenterConfigPanel>
        </div>
        
        <div>
            <button class="normalButton">Run one iteration</button>
            <button class="normalButton">Run and submit as final</button>
        </div>

        <h2>Simulation</h2>
        <hr>

    </div>

</template>

<style scoped>
#foodcenterParamDiv{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 100px;
}

.caseDescription {
    text-align: left;
}

.normalButton {
    width: 150px;
}

hr {
    width: 95%;
}
</style>