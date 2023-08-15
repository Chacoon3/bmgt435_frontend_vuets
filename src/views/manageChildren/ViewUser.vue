<script setup lang="ts">
import { useCachedCumulatedUsers } from '@/utils/manageUtils';
import { formatUserName } from '@/utils/userUtils';
import TableView from '@/components/TableView.vue';
import { type TableConfig } from '@/components/types';
import { computed } from 'vue';

const { isLoading: isLoadingUsers, data: users, getData: getUsers, clearCache, hasMore } = useCachedCumulatedUsers();
getUsers();
const userTableState = computed<TableConfig>(():TableConfig => {
    return {
        title: "Users",
        headers: ["Name", "Directory ID", "Group", "Role"],
        rows: users.value.map((user) => {
            return [{
                type:"text",
                value: formatUserName(user),
            }, {
                type:"text",
                value: user.did,
            }, {
                type:"text",
                value: user.group_name ?? "No roup",
            }, {
                type:"text",
                value: user.role,
            }];
        }
        )
    };
});


</script>

<template>
    <div>
        <div>
            <div v-if="isLoadingUsers === true">Fetching Data...</div>
            <div v-else-if="users && users.length > 0">
                <TableView :title="userTableState.title" :headers="userTableState.headers" :rows="userTableState.rows">
                </TableView>
                <button class="normalButton" @click="getUsers" :disabled="hasMore === false">{{ hasMore ? "View more": "No more records"}}</button>
            </div>
            <div v-else>No user data available at this time.</div>
        </div>
    </div>
</template>