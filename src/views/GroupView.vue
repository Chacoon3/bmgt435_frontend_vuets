<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue';
import GroupItem from './groupChildren/GroupItem.vue';
import { useCurrentGroup, usePaginatedGroups, useCreateGroup } from '@/utils/groupUtils';
import { reactive } from 'vue';
import InLineMsg from '@/components/InLineMsg.vue';
import { validateText } from '@/utils/formUtils';

const createGroupForm = reactive({
    groupName: ''
})
const inlineMsgState = reactive({
    show: false,
    msg: '',
})
const { isCreatingGroup, createGroup } = useCreateGroup();
const { isCurrentGroupLoading, currentGroup } = useCurrentGroup();
const { isLoading: isLoadingGroups, data, fetchData } = usePaginatedGroups();

function handleCreateGroup() {
    if (!validateText(createGroupForm.groupName)) {
        inlineMsgState.msg = "Please enter a group name!"
        inlineMsgState.show = true;
    }
    else {
        inlineMsgState.show = false;
        createGroup(
            createGroupForm.groupName,
            (resp: any) => {
                if (resp.status === 201) {
                    fetchData();
                    inlineMsgState.msg = "create group success!"
                }
                else {
                    inlineMsgState.msg = resp.message;
                }
                inlineMsgState.show = true;
            });
    }
}
</script>

<template>
    <CustomTitle title="Groups"></CustomTitle>

    <div id="groupBaseDiv">

        <div v-if="isCurrentGroupLoading">
            <h2 class="groupDivH2">Loading Data...</h2>
        </div>

        <div v-else-if="!isCurrentGroupLoading && currentGroup === undefined" class="groupDiv">
            <h2 class="groupDivH2">Create a new group</h2>
            <div id="createGroupDiv">
                <form @submit.prevent="handleCreateGroup">
                    <div>
                        <InLineMsg :show="inlineMsgState.show" :content="inlineMsgState.msg"></InLineMsg>
                    </div>
                    <div class="createTeamEle">
                        <label for="groupName">Group name</label>
                        <input id="groupNameInput" type="text" name="groupName" v-model="createGroupForm.groupName">
                    </div>

                    <div class="createTeamEle">
                        <input id="createTeamButton" type="submit" :value="isCreatingGroup ? 'Creating...' : 'Create!'"
                            :disabled="isCreatingGroup">
                    </div>
                </form>
            </div>
        </div>

        <div v-else-if="!isCurrentGroupLoading && currentGroup !== undefined" class="groupDiv">
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
                        <GroupItem v-for="item in data" :key="item.id" :id="item.id" :name="item.name" :users="item.users"></GroupItem>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
#groupBaseDiv {
    padding-top: 5vh;
    display: flex;
    flex-direction: row;
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
    width: 420px;
    min-width: 300px;
}

.groupDivH2 {
    text-align: center;
}
</style>