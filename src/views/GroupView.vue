<script setup lang="ts">
import GroupItem from './groupChildren/GroupItem.vue';
import { useCurrentGroup, useCachedCumulatedGroups, useCreateGroup, useLeaveGroup } from '@/utils/groupUtils';
import { reactive } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';


const inlineMsgState = reactive({
    show: false,
    msg: '',
})
const { isCreatingGroup, createGroup } = useCreateGroup();
const { isCurrentGroupLoading, currentGroup, getCurrrentGroup } = useCurrentGroup();
const { isLeavingGroup, leaveGroup } = useLeaveGroup();
const { isLoading: isLoadingGroups, data: groupData, getData: getGroupData, reset: resetGroupData, hasMore: hasMoreGroup } = useCachedCumulatedGroups();
getGroupData();

function handleCreateGroup() {
    inlineMsgState.show = false;
    createGroup(
        (resp: any) => {
            if (resp.status === 200) {
                inlineMsgState.msg = resp?.data ?? "create group success!"
                getCurrrentGroup();
                resetGroupData();
                getGroupData();
            }
            else {
                inlineMsgState.msg = resp?.data ?? "create group failed!";
            }
            inlineMsgState.show = true;
        });
    
}

function handleLeaveGroup() {
    leaveGroup((resp: any) => {
        if (resp.status === 200) {
            inlineMsgState.msg = resp?.data ?? "leave group success!";
            getCurrrentGroup();
            resetGroupData();
            getGroupData();
        }
        else {
            inlineMsgState.msg = resp?.data ?? "leave group failed!";
        }
        inlineMsgState.show = true;
    });
}
</script>

<template>
    <div id="groupViewContainer" class="contentViewContainer">

        <div v-if="isCurrentGroupLoading" class="groupDiv">
            <h2 class="groupDivH2">Fetching Data...</h2>
        </div>

        <div v-else-if="currentGroup === null" class="groupDiv">
            <h2 class="groupDivH2">Create a new group</h2>
            <div id="createGroupDiv">
                <form @submit.prevent="handleCreateGroup">
                    <div>
                        <InLineMsg :show="inlineMsgState.show" :content="inlineMsgState.msg"></InLineMsg>
                    </div>
                    <div class="createGroupEle">
                        <input type="submit" :value="isCreatingGroup ? 'Creating...' : 'Create!'"
                            :disabled="isCreatingGroup">
                    </div>
                </form>
            </div>
        </div>

        <div v-else class="groupDiv">
            <h2 class="groupDivH2">Your Group</h2>
            <div>
                <h3> {{ currentGroup.name }}</h3>
            </div>
            <div>
               <h3>Members:</h3>
            </div>
            <div>
                <ul id="userGroupInfo">
                    <li v-for="item in currentGroup.users" :key="item.id">
                        <span>{{ item.first_name + ' ' + item.last_name }}</span>
                    </li>
                </ul>

            </div>
                <input type="submit" :value="isLeavingGroup ? 'Leaving...' : 'Leave group'" :disabled="isLeavingGroup"
                    @click="handleLeaveGroup()">
        </div>


        <div id="splitLine"></div>

        <div class="groupDiv">
            <h2 class="groupDivH2">Group List</h2>
            <div>
                <h3 v-if="isLoadingGroups">Fetching data...</h3>
                <ul v-else>
                    <GroupItem v-for="item in groupData" :key="item.id" :name="item.name" :id="item.id"
                        :users="item.users"></GroupItem>
                </ul>
                <button class="normalButton" :disabled="hasMoreGroup === false" @click="getGroupData">{{ hasMoreGroup ? 'View more': 'No more groups'}}</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
#groupViewContainer {
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
    height: auto;
}

.groupDivH2 {
    text-align: center;
}
</style>