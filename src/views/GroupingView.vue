<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue';
import { useCurrentUserGroup, usePaginatedGroup } from '@/utils/groupUtils';
import { reactive } from 'vue';

const createGroupForm = reactive({
    groupName: ''
})
const { isCurrentUserGroupLoading, currentUserGroup } = useCurrentUserGroup();
const paginatedGroup = usePaginatedGroup();

function handleCreateGroup() {

}
</script>

<template>

<CustomTitle title="Groups"></CustomTitle>

<div>

    <div v-if="!isCurrentUserGroupLoading && currentUserGroup === null">
        <h2>Create a new team</h2>
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

    <div v-if="!isCurrentUserGroupLoading && currentUserGroup !== null">
        <h2>Team info</h2>
        <div>
            <h3>{{ currentUserGroup.name }}</h3>
            <ul id="userGroupInfo">
                <li v-for="item in userGroupInfo.groupMembers" :key="item">
                    <span>{{ item.userName }}</span>
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
                <GroupInfoItem v-for="groupInfo in groupList" :key="groupInfo.groupId"
                    :groupName="groupInfo.groupName" :groupMembers="groupInfo.groupMembers">
                </GroupInfoItem>

            </ul>
        </div>
    </div>

</div>
</template>