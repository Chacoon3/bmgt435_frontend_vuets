<script setup lang="ts">
import TableView from '@/components/TableView.vue';
import { type TableConfig } from '@/components/types';

defineProps<{
    config: TableConfig,
    isLoading: boolean,
    disableGetData: boolean,
}>();

defineEmits<{
    (event: 'get-data'): void
}>();

</script>

<template>
    <div>
        <div>
            <div v-if="isLoading">Fetching Data...</div>
            <div v-else-if="config.rows && config.rows.length > 0">
                <TableView :table-config="config">
                </TableView>
                <button class="normalButton" @click="$emit('get-data')" :disabled="disableGetData">{{
                    disableGetData === false ? "View more" : "No more records" }}</button>
            </div>
            <div v-else>No data available at this time.</div>
        </div>
    </div>
</template>