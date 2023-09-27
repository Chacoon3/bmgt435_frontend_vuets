<script setup lang="ts">
import { useCurrentGroup, useCachedCumulatedGroups, useLeaveGroup, useJoinGroup } from '@/utils/groupUtils';
import { computed, reactive } from 'vue';
import GroupList from './groupChildren/GroupList.vue';
import MyGroup from './groupChildren/MyGroup.vue';
import InLineMsg from '@/components/InLineMsg.vue';
import type { ButtonConfig } from '@/components/types';


const inlineMsgState = reactive({
    show: false,
    msg: '',
})
const { isJoiningGroup, joinGroup } = useJoinGroup();
const { isCurrentGroupLoading, currentGroup, getCurrrentGroup } = useCurrentGroup();
const { isLeavingGroup, leaveGroup } = useLeaveGroup();
const { isLoading: isLoadingGroups, data: groupData, getData: getGroupData, reset: resetGroupData, hasMore: hasMoreGroup } = useCachedCumulatedGroups();
getCurrrentGroup();
getGroupData();

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

const myGroupButtonConfig: ButtonConfig = {
    text: computed(() => isLeavingGroup.value === true ? "Leaving..." : "Leave Group").value,
    htmlClass: "normalButton",
    disabled: () => {
        return isLeavingGroup.value === true;
    },
    onClick: handleLeaveGroup
}

function mapButtonConfig(groupId: number): ButtonConfig | null {
    if (currentGroup.value?.id === groupId) {
        return null;
    }
    return {
        text: "Join",
        htmlClass: "normalButton",
        disabled: () => {
            return isJoiningGroup.value === true;
        },
        onClick: () => {
            joinGroup(groupId);
        }
    }
}

const groupItemButtonConfig = computed<Array<ButtonConfig | null>>(() => {
    return Array.from(groupData.value, (group) => {
        return mapButtonConfig(group.id);
    })
})
</script>

<template>
    <div class="contentViewContainer">

        <div v-if="isCurrentGroupLoading" class="groupDiv">
            <h2>Fetching Data...</h2>
        </div>

        <div v-else>
            <div v-if="currentGroup !== null">
                <MyGroup :group="currentGroup" :button-config="myGroupButtonConfig" />
            </div>

            <hr v-if="currentGroup !== null">

            <div>
                <GroupList :group-list="groupData" :button-config="groupItemButtonConfig" />
                <button class="normalButton" :disabled="hasMoreGroup === false" @click="getGroupData">{{ hasMoreGroup ?
                    'View more' : 'No more groups' }}</button>
            </div>
        </div>

    </div>
</template>