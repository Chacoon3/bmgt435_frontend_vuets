<script setup lang="ts">
import TableView from '@/components/TableView.vue';
import type { TableConfig, TableItemConfig } from '@/components/types';
import { computed } from 'vue';
import { useLeaderBoard } from '@/utils/caseRecordsUtils';
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
const { data: leaderBoard, isLoading, clearCache: clearLeaderBoard, getData: getLeaderBoard, hasMore: hasMoreRecords } = useLeaderBoard(1)
const recordTableConfig = computed<TableConfig>(() => {
    return {
        headers: [
            {
                elementType: "text",
                value: "Date",
            },
            {
                elementType: "text",
                value: "Score",
            },
        ],
        rows: Array.from(leaderBoard.value, (record) => {
            return toTableRow(record);
        })
    }
})
getLeaderBoard();

function toTableRow(record: CaseRecord): TableItemConfig[] {
    return [
        {
            elementType: "text",
            value: record.create_time,
        },
        {
            elementType: "text",
            value: record.score?.toString() ?? "N/A",
        },
    ]
}
</script>

<template>
    <div id="leaderboardContainer" class="contentViewContainer">
        <div v-if="leaderBoard.length > 0">
            <TableView :table-config="recordTableConfig"></TableView>
            <button class="normalButton" @click="getLeaderBoard"
                :disabled="isLoading === true || hasMoreRecords === false">{{
                    viewMoreButtonText
                }}</button>
        </div>

        <div v-else>
            {{ isLoading === false ? "No data available at this time." : "Fetching data..." }}
        </div>
    </div>
</template>