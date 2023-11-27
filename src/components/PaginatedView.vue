<script setup lang="ts">
import TableView from '@/components/TableView.vue';
import { type TableConfig } from '@/components/types';
import { useDebouncedRef} from '@/utils/debounceRef';
import { watch } from 'vue';


defineProps<{
    config: TableConfig,
    isLoading: boolean,
    disableGetData: boolean,
}>();

const emits = defineEmits<{
    (event: 'next'): void,
    (event: 'prev'): void,
    (event: 'to', page:number): void,
}>();

const page = useDebouncedRef(1, 1000);

watch(page, (newPage) => {
    emits('to', newPage);
})
</script>

<template>
    <div>
        <div>
            <div v-if="config.rows && config.rows.length > 0">
                <TableView :table-config="config">
                </TableView>
                <button class="normalButton" @click="$emit('prev')" :disabled="disableGetData">{{ "prev" }}</button>
                <form @submit.prevent="">
                    <label> to page </label>
                    <input type="number" v-model="page" />
                </form>
                <button class="normalButton" @click="$emit('next')" :disabled="disableGetData">{{ "next" }}</button>
            </div>
            <div v-else-if="isLoading">Fetching Data...</div>
            <div v-else>No data available at this time.</div>
        </div>
    </div>
</template>

<style scoped>
form {
    display: inline-block;
}

input[type=number] {
    width: 50px;
}

input[type=submit] {
    width: 75px;
}
</style>