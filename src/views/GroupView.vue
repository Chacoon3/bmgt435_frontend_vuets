<script setup lang="ts">
import { useCurrentGroup, useCachedCumulatedGroups, useCreateGroup, useLeaveGroup } from '@/utils/groupUtils';
import { reactive } from 'vue';
import GroupList from './groupChildren/GroupList.vue';
import MyGroup from './groupChildren/MyGroup.vue';
import InLineMsg from '@/components/InLineMsg.vue';


const inlineMsgState = reactive({
    show: false,
    msg: '',
})
// const { isCreatingGroup, createGroup } = useCreateGroup();
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
</script>

<template>
    <div class="contentViewContainer">

        <div v-if="isCurrentGroupLoading" class="groupDiv">
            <h2>Fetching Data...</h2>
        </div>

        <div v-else>
            <div v-if="currentGroup !== null">
                <MyGroup :group="currentGroup" />
                <button class="normalButton" :disabled="isLeavingGroup" @click="handleLeaveGroup()">{{ isLeavingGroup ?
                    'Leaving...' : 'Leave group' }}
                </button>
            </div>

            <hr>

            <div>
                <GroupList :group-list="groupData" />
                <button class="normalButton" :disabled="hasMoreGroup === false" @click="getGroupData">{{ hasMoreGroup ?
                    'View more' : 'No more groups' }}</button>
            </div>
        </div>

    </div>
</template>

<style scoped>

.groupDiv {
    position: relative;
    padding-left: 30px;
    width: 375px;
    height: auto;
}
</style>