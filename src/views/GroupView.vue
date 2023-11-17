<script setup lang="ts">
import { useCurrentGroup, useCachedCumulatedGroups, useLeaveGroup, useJoinGroup } from '@/utils/groupUtils';
import { computed, reactive } from 'vue';
import GroupList from './groupChildren/GroupList.vue';
import MyGroup from './groupChildren/MyGroup.vue';
import type { ButtonConfig } from '@/components/types';
import { useModal, type ModalConfig } from '@/utils/modalUtils';
import type { Group } from '@/utils/backendTypes';

const { showModal, closeModal } = useModal();
const modalState = reactive<ModalConfig>({ onConfirm: closeModal });
const { isJoiningGroup, joinGroup } = useJoinGroup();
const { isCurrentGroupLoading, currentGroup, getCurrrentGroup } = useCurrentGroup();
const { isLeavingGroup, leaveGroup } = useLeaveGroup();
const { isLoading: isLoadingGroups, data: groupData, getData: getGroupData, reset: resetGroupData, hasMore: hasMoreGroup } = useCachedCumulatedGroups();
getCurrrentGroup();
getGroupData();

function handleLeaveGroup() {
    leaveGroup((resp: any) => {
        if (resp.status === 200) {
            modalState.message = resp?.data ?? "leave group success!";
        }
        else {
            modalState.message = resp?.data ?? "leave group failed!";
        }
        showModal(modalState);
        getCurrrentGroup();
        resetGroupData();
        getGroupData();
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
    return {
        text: "Join",
        htmlClass: "normalButton",
        disabled: groupId === currentGroup.value?.id ? () => true : () => {
            return isJoiningGroup.value === true;
        },
        onClick: () => {
            joinGroup(groupId, (group: Group) => {
                if (group !== null)
                    modalState.message = "join group success!";
            },
                (msg: string) => {

                    modalState.message = msg ?? "join group failed!";

                    showModal(modalState);
                    getCurrrentGroup();
                    resetGroupData();
                    getGroupData();
                });
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