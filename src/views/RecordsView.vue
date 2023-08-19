<script setup lang="ts">
import { useCumulatedCaseRecords } from '@/utils/caseRecordsUtils'
import TableView from '@/components/TableView.vue';
import { type TableConfig, type TableItemConfig } from '@/components/types';
import { computed } from 'vue';
import { type CaseRecord } from '@/utils/backendTypes';

const viewMoreButtonText = computed(() => {
    if (isLoading.value === true) {
        return "Fetching..."
    } else if (hasMoreRecords.value === true) {
        return "View More"
    } else {
        return "No More Records"
    }
})
const { data: records, isLoading, clearCache: clearCachedRecords, getData: getRecords, hasMore: hasMoreRecords } = useCumulatedCaseRecords()
const recordTableConfig = computed<TableConfig>(() => {
    return {
        headers: ["Case Name", "Submitted by", "Time", "Score"],
        rows: Array.from(records.value, (record) => {
            return toTableRow(record);
        })
    }
})
getRecords();

function toTableRow(record: CaseRecord): TableItemConfig[] {
    return [
        {
            type: "text",
            value: record.case_name,
        },
        {
            type: "text",
            value: record.user_name,
        },
        {
            type: "text",
            value: record.create_time,
        },
        {
            type: "text",
            value: record.score?.toString() ?? "N/A",
        },
    ]
}
</script>

<template>
    <div>
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