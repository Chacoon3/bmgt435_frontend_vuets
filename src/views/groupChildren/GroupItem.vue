<script setup lang="ts">
import { type Group } from '@/utils/backendTypes';
import { useJoinGroup } from '@/utils/groupUtils';
import { useCurrentUser } from '@/utils/userUtils';

const props = defineProps<Group>();
const { isJoiningGroup, joinGroup } = useJoinGroup();
const { currentUser } = useCurrentUser();

function handleJoinGroup() {
    if (props.id === null) {
        throw new Error("group id is null");
    }
    else {
        joinGroup(props.id);
    }
}
</script>

<template>
    <div id="groupItemContainer">
        <span class="groupName">{{ $props.name }}</span>
        <button class="normalButton" v-if="currentUser && currentUser.group_id === null" @click="handleJoinGroup" :disabled="isJoiningGroup === true">
            {{ isJoiningGroup === true ? "Joining..." : "Join" }}
        </button>
        <div>
            <li class="groupUser" v-for="user in $props.users" :key="user.id">
                {{ user?.first_name }} {{ user?.last_name }}
            </li>
        </div>
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

.groupUser {
    list-style: none;
}
</style>