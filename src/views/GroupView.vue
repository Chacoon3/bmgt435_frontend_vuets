<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue';
import { useCurrentGroupInfo, usePaginatedGroupInfo } from '@/utils/groupUtils';
import { reactive } from 'vue';

const createGroupForm = reactive({
    groupName: ''
})
const { isCurrentGroupInfoLoading, currentGroupInfo } = useCurrentGroupInfo();
const paginatedGroupInfo = usePaginatedGroupInfo();

function handleCreateGroup() {

}
</script>

<template>

<CustomTitle title="Groups"></CustomTitle>

<div>

    <div v-if="!isCurrentGroupInfoLoading && currentGroupInfo === null">
        <h2>Create a new group</h2>
        <div id="createTeamDiv">
            <div class="createTeamEle">
                <label for="groupName">Team name</label>
                <input id="groupNameInput" type="text" name="groupName" v-model="createGroupForm.groupName">
            </div>

            <div class="createTeamEle">
                <input id="createTeamButton" type="button" value="Create!" @click="handleCreateGroup()">
            </div>
        </div>
    </div>

    <div v-if="!isCurrentGroupInfoLoading && currentGroupInfo !== null">
        <h2>Group Info</h2>
        <div>
            <h3>{{ currentGroupInfo.group.name }}</h3>
            <ul id="userGroupInfo">
                <li v-for="item in currentGroupInfo.users" :key="item.id">
                    <span>{{ item.first_name + ' ' + item.last_name }}</span>
                </li>
            </ul>
        </div>
    </div>

    <div>
        <div id="splitLine"></div>
    </div>

    <div class="subBlock">
        <h2>Join an existing team</h2>
        <div>
            <ul>
                <!-- <GroupInfoItem v-for="groupInfo in groupList" :key="groupInfo.groupId"
                    :groupName="groupInfo.groupName" :groupMembers="groupInfo.groupMembers">
                </GroupInfoItem> -->

            </ul>
        </div>
    </div>

</div>
</template>