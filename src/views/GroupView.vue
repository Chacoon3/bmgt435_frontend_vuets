<script setup lang="ts">
import GroupItem from './groupChildren/GroupItem.vue';
import { useCurrentGroup, usePaginatedGroups, useCreateGroup, useLeaveGroup } from '@/utils/groupUtils';
import { reactive } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';
import { useCurrentUser } from '@/utils/userUtils';


const inlineMsgState = reactive({
    show: false,
    msg: '',
})
const { isCreatingGroup, createGroup } = useCreateGroup();
const { isCurrentGroupLoading, currentGroup } = useCurrentGroup();
const { isLoading: isLoadingGroups, data: paginatedGroups, fetchData: getPaginatedData } = usePaginatedGroups();
const { isLeavingGroup, leaveGroup } = useLeaveGroup();
const {httpGetUser} = useCurrentUser();

function handleCreateGroup() {
    inlineMsgState.show = false;
    createGroup(
        (resp: any) => {
            if (resp.status === 201) {
                inlineMsgState.msg = "create group success!"
                httpGetUser();
            }
            else {
                inlineMsgState.msg = resp?.data ?? "create group failed!";
            }
            inlineMsgState.show = true;
        });
}

function handleLeaveGroup() {
    leaveGroup((resp:any) => {
        if (resp.status === 200) {
            currentGroup.value= null;
        }
        else {
            inlineMsgState.msg = resp?.data ?? "leave group failed!";
            inlineMsgState.show = true;
        }
    });
}
</script>

<template>
    <div id="groupContent">

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
            <h2 class="groupDivH2">Your Group</h2>
            <div>
                <ul id="userGroupInfo">
                    <li v-for="item in currentGroup.users" :key="item.id">
                        <span>{{ item.first_name + ' ' + item.last_name }}</span>
                    </li>
                </ul>

                <button :disabled="isLeavingGroup" @click="handleLeaveGroup"> Leave Group </button>
            </div>
        </div>


        <div id="splitLine"></div>

        <div class="groupDiv">
            <h2 class="groupDivH2">Group List</h2>
            <div>
                <h3 v-if="isLoadingGroups">Fetching data...</h3>
                <ul>
                    <GroupItem v-for="item in paginatedGroups?.data" :key="item.id" :name="item.name" :id="item.id"
                        :users="item.users"></GroupItem>
                </ul>
            </div>
        </div>

    </div>
</template>

<style scoped>
#groupContent {
    display: flex;
    position: relative;
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
    padding-left: 30px;
    width: 375px;
    height: 400px;
}

.groupDivH2 {
    text-align: center;
}
</style>