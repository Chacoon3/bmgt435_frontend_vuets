<script setup lang="ts">
import { ref } from 'vue';
import { type Group } from '@/utils/ORMTypes';
import { useJoinGroup } from '@/utils/groupUtils';
import { useCurrentUser } from '@/utils/userUtils';

const props = defineProps<Group>();
const emits = defineEmits<{ (e: "joinGroupOutcome", id: number): void }>();
const isExpand = ref<boolean>(false);
const { isJoiningGroup, joinGroup } = useJoinGroup();
const { httpGetUser, currentUser } = useCurrentUser();

function handleJoinGroup() {
    if (props.id === null) {
        throw new Error("group id is null");
    }
    else {
        isJoiningGroup.value = true;
        joinGroup(props.id, () => {
            emits("joinGroupOutcome", props.id);
        });
    }
}
</script>

<template>
    <div id="groupItemContainer">
        <span class="groupName">{{ $props.name }}</span>
        <button class="groupItem" @click="() => isExpand = !isExpand">{{ isExpand ? "Collapse" : "Expand" }}</button>
        <button class="groupItem" v-if="currentUser?.group_id === null" @click="handleJoinGroup" :disabled="isJoiningGroup === true">Join</button>
        <div v-if="isExpand === true">
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
    min-width: 140px;
}

.groupUser {
    list-style: none;
}
</style>