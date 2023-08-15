<script setup lang="ts">
import { useCumulatedCases } from '@/utils/caseUtils'
import { type TableConfig } from '@/components/types';
import TableView from '@/components/TableView.vue';
import { type Case } from '@/utils/ORMTypes';
import { computed } from 'vue';

const { isLoading: isCasesLoading, data: cases, hasMore: hasMoreCases, getData: getCases } = useCumulatedCases();
getCases();
const caseTableState = computed<TableConfig>(():TableConfig => {
    return {
        title: "Cases",
        headers: ["Name", "Created At"],
        rows: cases.value.map((caseItem) => {
            return [{
                type:"text",
                value: caseItem.name,                
            }, {
                type:"text",
                value: caseItem.create_time,
            }, {
                type:"button",
                value: "Config",
                eventKey: caseItem.id.toString(),
            }];
        }
        )
    }
}
)
</script>

<template>
    <div>
        <div v-if="isCasesLoading">Fetching Data..</div>
        <div v-else>
            <TableView :title="caseTableState.title" :headers="caseTableState.headers" :rows="caseTableState.rows">
            </TableView>
        </div>
    </div>
</template>
