<script setup lang="ts">
import { type TableConfig } from './types';

defineProps<TableConfig>();
defineEmits<{
    (event:"clickItem", eventKey: string): void
}>();
</script>

<template>
    <table class="tableViewContainer">
        <div class="tableViewTitle" v-if="$props.title">
            {{ $props.title }}
        </div>
        <tbody class="tableViewBody">
            <tr class="tableViewRow" v-if="$props.headers">
                <th class="tableViewHead" v-for="(item, index) in $props.headers" :key="index">{{ item }}</th>
            </tr>
            <tr class="tableViewRow" v-for="(row, rowIndex) in $props.rows" :key="rowIndex">
                <td class="tableViewData" v-for="(rowItem, valIndex) in row" :key="valIndex">
                    <span v-if="rowItem.type === 'text'">{{ rowItem.value }}</span>
                    <button v-else-if="rowItem.type === 'button'" class="normalButton" @click="$emit('clickItem', rowItem.eventKey ?? rowItem.value)">{{ rowItem.value }}</button>                
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.tableViewContainer {
    display: block;
}

.tableViewTitle {
    position: relative;
    font-size: 1.5em;
    /* text-align: center; */
    padding: 0.5rem;
}

.tableViewRow {
    padding: 0.5rem;
}

.tableViewHead {
    font-size: 1em;
    font-weight: bold;
    text-align: left;
    padding: 0.5rem;
}

.tableViewData {
    text-align: left;
    padding: 0.5rem;
}
</style>