<script setup lang="ts">
import { type Group } from '@/utils/backendTypes';
import { useJoinGroup } from '@/utils/groupUtils';
import { useCurrentUser } from '@/utils/userUtils';

const props = defineProps<{
    group: Group;
}>();
const { isJoiningGroup, joinGroup } = useJoinGroup();
const { currentUser } = useCurrentUser();

function handleJoinGroup() {
    if (props.group.id === null) {
        throw new Error("group id is null");
    }
    else {
        joinGroup(props.group.id);
    }
}
</script>

<template>
    <div id="groupItemContainer">
        <span class="groupName">{{ group.name }}</span>
        <button class="normalButton" v-if="currentUser && currentUser.group_id === null" @click="handleJoinGroup"
            :disabled="isJoiningGroup === true">
            {{ isJoiningGroup === true ? "Joining..." : "Join" }}
        </button>

        <ul class="groupUserList">
            <li class="groupUser" v-for="user in group.users" :key="user.id">
                {{ user?.first_name }} {{ user?.last_name }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
#groupItemContainer {
    margin-bottom: 15px;
}

.groupName {
    display: inline-block;
    font-weight: bold;
    min-width: 140px;
}

.groupUserList {
    flex-direction: row;
    display: flex;
    justify-content:left;
}

.groupUser {
    list-style: none;
    margin-right: 2em;
}
</style>