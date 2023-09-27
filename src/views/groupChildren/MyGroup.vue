<script setup lang="ts">
import type { Group } from '@/utils/backendTypes';
import GroupItem from './GroupItem.vue';
import type { ButtonConfig } from '@/components/types';

defineProps<{ group: Group; buttonConfig:ButtonConfig; }>();
</script>

<template>
    <h3>Your Group</h3>
    <GroupItem :group="group" :button-config="buttonConfig"></GroupItem>
</template>

<style scoped>
#userGroupInfo {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: left
}

.groupUser {
    list-style: none;
    margin-right: 2em;
}
</style>