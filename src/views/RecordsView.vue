<script setup lang="ts">
import { useCumulatedCaseRecords } from '@/utils/caseRecordsUtils'

const { records, isLoading, clearCachedRecords, getData } = useCumulatedCaseRecords()
</script>

<template>
    <div>
        <div v-if="isLoading === true">Fetching Data..</div>
        <div v-else-if="records && records.length > 0">
            <div v-for="(record, index) in records" :key="index">
                <div>{{ record.id }}</div>
                <div>{{ record.group_id }}</div>
            </div>

            <div>
                <button @click="getData()">View more</button>
            </div>
        </div>
        <div v-else>No records available</div>
    </div>
</template>>