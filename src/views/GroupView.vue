<script setup lang="ts">
import GroupItem from './groupChildren/GroupItem.vue';
import { useCurrentGroup, usePaginatedGroups, useCreateGroup } from '@/utils/groupUtils';
import { reactive } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';


const inlineMsgState = reactive({
    show: false,
    msg: '',
})
const { isCreatingGroup, createGroup } = useCreateGroup();
const { isCurrentGroupLoading, currentGroup } = useCurrentGroup();
const { isLoading: isLoadingGroups, data: paginatedGroups, fetchData } = usePaginatedGroups();

function handleCreateGroup() {
    inlineMsgState.show = false;
    createGroup(
        (resp: any) => {
            if (resp.status === 201) {
                fetchData();
                inlineMsgState.msg = "create group success!"
            }
            else {
                inlineMsgState.msg = resp?.data ?? "create group failed!";
            }
            inlineMsgState.show = true;
        });
}
</script>

<template>
    <div class="groupContent">

        <div v-if="isCurrentGroupLoading" class="groupDiv">
            <h2 class="groupDivH2">Loading Data...</h2>
        </div>

        <div v-else-if="currentGroup === null" class="groupDiv">
            <h2 class="groupDivH2">Create a new group</h2>
            <div id="createGroupDiv">
                <form @submit.prevent="handleCreateGroup">
                    <div>
                        <InLineMsg :show="inlineMsgState.show" :content="inlineMsgState.msg"></InLineMsg>
                    </div>
                    <div class="createGroupEle">
                        <input id="createGroupButton" type="submit" :value="isCreatingGroup ? 'Creating...' : 'Create!'"
                            :disabled="isCreatingGroup">
                    </div>
                </form>
            </div>
        </div>

        <div v-else class="groupDiv">
            <h2 class="groupDivH2">Group Info</h2>
            <div>
                <ul id="userGroupInfo">
                    <li v-for="item in currentGroup.users" :key="item.id">
                        <span>{{ item.first_name + ' ' + item.last_name }}</span>
                    </li>
                </ul>
            </div>
        </div>


        <div id="splitLine"></div>

        <div class="groupDiv">
            <h2 class="groupDivH2">Join a group</h2>
            <div>
                <h3 v-if="isLoadingGroups">Fetching data...</h3>
                <ul>
                    <GroupItem v-for="item in paginatedGroups?.data" :key="item.id" :id="item.id" :name="item.name"
                        :users="item.users"></GroupItem>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
#groupContent {
    display: flex;
    flex-direction: row;
    padding-top: 5vh;
    justify-content: left;
}

#splitLine {
    width: 3px;
    background: black;
    height: 60vh;
}

.groupDiv {
    position: relative;
    display: block;
    padding-left: 30px;
    width: 420px;
    min-width: 300px;
}

.groupDivH2 {
    text-align: center;
}
</style>