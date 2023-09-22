<script setup lang="ts">
import type { Group } from '@/utils/backendTypes';
import GroupItem from './GroupItem.vue';

defineProps<{
    groupList: Group[];
}>();

</script>

<template>
    <div class="groupDiv">
        <h2 class="groupDivH2">Group List</h2>
        <div>
            <ul>
                <GroupItem v-for="item in groupList" :key="item.id" :group="item">
                </GroupItem>
            </ul>
        </div>
    </div>
</template>