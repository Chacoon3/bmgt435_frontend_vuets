<script setup lang="ts">
import { useCumulatedCaseRecords, useDownloadCaseRecord } from '@/utils/caseRecordsUtils'
import TableView from '@/components/TableView.vue';
import { type TableConfig, type TableItemConfig } from '@/components/types';
import { computed } from 'vue';
import { type CaseRecord } from '@/utils/backendTypes';
import { useProgressBox } from '@/utils/progressBoxUtils';


const { show: showProgBox, close: closeProgBox } = useProgressBox();
const viewMoreButtonText = computed(() => {
    if (isLoading.value === true) {
        return "Fetching..."
    } else if (hasMoreRecords.value === true) {
        return "View More"
    } else {
        return "No More Records"
    }
})
const { data: records, isLoading, reset: resetCaseRecords, getData: getRecords, hasMore: hasMoreRecords } = useCumulatedCaseRecords()
const recordTableConfig = computed<TableConfig>(() => {
    return {
        headers: ["Case Name", "Submitted by", "Time", "Score"],
        rows: Array.from(records.value, (record) => {
            return toTableRow(record);
        })
    }
})
getRecords();


const { isDownloading, downloadCaseRecord } = useDownloadCaseRecord();
function handleDownloadCaseRecord(record_id:number) {
    //
    if (isDownloading.value === true) {
        return;
    }

    showProgBox({
        title: "Downloading",
    });
    downloadCaseRecord(record_id, (resp: any) => {
        closeProgBox();
    })
}

function toTableRow(record: CaseRecord): TableItemConfig[] {
    return [
        {
            elementType: "text",
            value: record.case_name,
        },
        {
            elementType: "text",
            value: record.user_name,
        },
        {
            elementType: "text",
            value: record.create_time,
        },
        {
            elementType: "text",
            value: record.score?.toString() ?? "N/A",
        },
        {
            elementType:"button",
            elementClass:"aLikeButton",
            value:"download detailed record",
            onClick:()=>handleDownloadCaseRecord(record.id),
        }
    ]
}
</script>

<template>
    <div class="contentViewContainer">
        <div v-if="isLoading === true && records.length === 0">Fetching Data..</div>
        <div v-else-if="records.length > 0">

            <TableView :table-config="recordTableConfig" />
            <div>
                <button class="normalButton" @click="getRecords()"
                    :disabled="hasMoreRecords === false || isLoading === true">
                    {{ viewMoreButtonText }}
                </button>
            </div>
        </div>
        <div v-else>No records available at this time</div>
    </div>
</template>