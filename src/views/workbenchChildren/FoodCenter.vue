<script setup lang="ts">
import { reactive, ref, unref } from 'vue';
import TextSection from '@/components/textual/TextSection.vue'
import CenterConfigPanel from './CenterConfigPanel.vue';
import { type FoodcenterCenterState, type CaseSubmissionResult, type FoodCenterSummary } from '@/utils/backendTypes'
import InLineMsg from '@/components/InLineMsg.vue';
import FoodcenterResultPanel from './FoodcenterResultPanel.vue';
import { useModal } from '@/utils/modalUtils';
import { useFoodcenter } from '@/utils/caseUtils';


const { showModal, closeModal } = useModal();
const inlineMsgState = reactive({ show: false, content: '', });
const fcResult = ref<CaseSubmissionResult<FoodCenterSummary> | null>(null);
const showBrief = ref<boolean>(true);
const paramState = ref<FoodcenterCenterState[]>(
    Array.from([1, 2, 3, 4, 5, 6],
        (index: number) => ({ isOn: false, smallS: 0, bigS: 0, name: `Hub ${index}` }))
);
const { isSubmitting, submitCase: submitFoodCenter, } = useFoodcenter();
const resultState = ref<boolean>(false);
function handleSubmit() {
    if (isSubmitting.value === true) {
        return;
    }


    inlineMsgState.content = '';
    inlineMsgState.show = false;
    const cachedParams: FoodcenterCenterState[] = unref(paramState);

    showModal({
        title: "Submit simulation",
        message: "Are you sure to submit the simulation?",
        onConfirm: () => {
            closeModal();
            submitFoodCenter(cachedParams,
                (res: CaseSubmissionResult) => {
                    resultState.value = res !== null;
                    inlineMsgState.content = "Simulation submitted successfully!";
                    inlineMsgState.show = true;
                    fcResult.value = res;

                },
                (err: string) => {
                    inlineMsgState.content = err ?? "Failed to submit simulation!";
                    inlineMsgState.show = true;
                });
        },
        onCancel: () => {
            closeModal();
        }
    });
}
</script>

<template>
    <div>
        <div v-show="showBrief">
            <h2>Food Delivery - Introduction</h2>
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
                    Apart from the expansion, Terp Delivery also wants to optimize its inventory management by
                    applying
                    s-S
                    policies that decides how much raw materials the selected food delivery hubs should buy weekly.
                </TextSection>
                <TextSection>
                    The marketing team has conducted market research and built a simulation model to estimate the
                    performance of possible expansion strategies.
                </TextSection>
                <TextSection>
                    The model is comprised of the following components:
                </TextSection>
            <ul id="foodcenterList">
                <li>
                    <b>Decision variables:</b>
                    <br />
                    Delivery hubs to be selected for expansion.
                    <br />
                    Inventory policy (s, S), one for each selected hub.
                </li>
                <br />
                <li>
                    <b>Random inputs:</b>
                    <br />
                    Weekly demand: the number of orders observed at a hub in a week.
                    <br />
                    Order amount: the total amount in dollar of a delivery order.
                </li>
                <br />
                <li>
                    <b>Constraints:</b>
                    <br />
                    The number of raw materials that the company can buy and distribute weekly
                    to the hubs cannot exceed 7,000.
                    <br />
                    If the total number of requested materials for restocking across the hubs exceeds 7,000, 7,000 raw materials will be bought and
                    distributed to each hub according to the relative proportion of the original restock plan.
                    <br />
                    A fixed weekly cost of $24,000 will be applied to each selected hub.
                    <br />
                    The value of all the uncovered orders will be deducted from the revenue as a measure of penalty.
                </li>
                <br />
                <!-- <li>
                    <b>Performance metric:</b>
                    <br />
                    Total profit = Total revenue - Total cost
                </li>
                <br /> -->
            </ul>
            <b>Your goals:</b>
            <br />
            <ul>
                <li>
                    Find the best hub(s) to expand.
                </li>
                <li>
                    Determine the optimal inventory policy for each selected hub.
                </li>
                <br />
            </ul>
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

        <InLineMsg :config="inlineMsgState"></InLineMsg>

        <div>
            <button class="normalButton" btnFeature="simulation" @click="handleSubmit" :disabled="isSubmitting === true">
                {{ isSubmitting ? "Submitting..." : "Submit!" }}
            </button>
        </div>

        <h2>Simulation Result</h2>
        <hr>
        <FoodcenterResultPanel :result="fcResult" :caseRecordId="1"></FoodcenterResultPanel>

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