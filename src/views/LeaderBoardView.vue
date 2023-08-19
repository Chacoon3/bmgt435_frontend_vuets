<script setup lang="ts">
import TableView from '@/components/TableView.vue';
import type { TableConfig, TableItemConfig } from '@/components/types';
import { computed } from 'vue';
import { useFoodcenterLeaderBoard } from '@/utils/caseRecordsUtils';
import type { CaseRecord } from '@/utils/backendTypes';


const viewMoreButtonText = computed(() => {
    if (isLoading.value === true) {
        return "Fetching..."
    } else if (hasMoreRecords.value === true) {
        return "View More"
    } else {
        return "No More Records"
    }
})
const { data: leaderBoard, isLoading, clearCache: clearLeaderBoard, getData: getLeaderBoard, hasMore: hasMoreRecords } = useFoodcenterLeaderBoard()
const recordTableConfig = computed<TableConfig>(() => {
    return {
        headers: ["Group", "Time", "Score"],
        rows: Array.from(leaderBoard.value, (record) => {
            return toTableRow(record);
        })
    }
})
getLeaderBoard();

function toTableRow(record: CaseRecord): TableItemConfig[] {
    return [
        {
            type: 'text',
            value: record.group_name,
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
    <div id="leaderboardContainer">
        <div v-if="isLoading === false && leaderBoard.length > 0">
            <TableView :table-config="recordTableConfig"></TableView>
            <button class="normalButton" @click="getLeaderBoard" :disabled="hasMoreRecords === false">{{ viewMoreButtonText
            }}</button>
        </div>
        <div v-else-if="isLoading === false">
            No records available at this time.
        </div>
        <div v-else>
            Fetching Data...
        </div>
    </div>
</template>