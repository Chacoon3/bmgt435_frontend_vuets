<script setup lang="ts">
import { type TableConfig } from './types';

defineProps<{tableConfig:TableConfig}>();
defineEmits<{
    (event:"clickItem", eventKey: string): void
}>();
</script>

<template>
    <table class="tableViewContainer">
        <div class="tableViewTitle" v-if="tableConfig.title">
            {{ tableConfig.title }}
        </div>
        <tbody class="tableViewBody">
            <tr class="tableViewRow" v-if="tableConfig.headers">
                <th class="tableViewHead" v-for="(item, index) in tableConfig.headers" :key="index">{{ item }}</th>
            </tr>
            <tr class="tableViewRow" v-for="(row, rowIndex) in tableConfig.rows" :key="rowIndex">
                <td class="tableViewData" v-for="(rowItem, valIndex) in row" :key="valIndex">
                    <span v-if="rowItem.elementType === 'text'">{{ rowItem.value }}</span>
                    <button v-else-if="rowItem.elementType === 'button'" :class="rowItem.elementClass ?? 'normalButton'" @click="rowItem.onClick">{{ rowItem.value }}</button>
                    <a v-else-if="rowItem.elementType == 'a'" :href="rowItem.href">{{ rowItem.value }}</a>         
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