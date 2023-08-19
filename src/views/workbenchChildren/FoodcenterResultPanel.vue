<script setup lang="ts">
import { type SubmissionResult, type FoodCenterSummary } from '@/utils/caseUtils';
import { useDownloadCaseRecord } from '@/utils/caseRecordsUtils';

const props = defineProps<{ result: SubmissionResult<FoodCenterSummary> | null }>();
const { isDownloading, downloadCaseRecord } = useDownloadCaseRecord();
function handleDownload() {
    if (props.result === null) {
        return;
    }
    downloadCaseRecord(props.result.case_record_id);
}
</script>

<template>
    <div class="foodcentrResultContainer">
        <div v-if="result === null">
            <p class="caseDescription">
                Please submit the simulation first.
            </p>
        </div>
        <div v-else>
            <ul class="foodcenterResultList">
                <li>
                    <span>Total profit</span>
                    <span>$ {{ result.summary.perf_metric.toLocaleString() }}</span>
                </li>

                <li>
                    <span>Total shortage</span>
                    <span>{{ result.summary.total_shortage_count.toLocaleString() }}</span>
                </li>

                <li>
                    <span>Total shortage penalty</span>
                    <span>$ {{ result.summary.total_shortage_amount.toLocaleString() }}</span>
                </li>

                <li>
                    <span>Total holding cost</span>
                    <span>$ {{ result.summary.total_holding_cost.toLocaleString() }}</span>
                </li>

            </ul>
            <button class="normalButton" @click="handleDownload">{{
                isDownloading === true ? "Downloading..." : "Download detailed record" }}</button>
        </div>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

li {
    padding: 0;
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: left;
    padding-bottom: 10px;
    /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); */
}

.normalButton {
    height: 35px;
    width: 200px;
}
</style>