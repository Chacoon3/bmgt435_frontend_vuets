<script setup lang="ts">
import type { Group } from '@/utils/backendTypes';
import GroupItem from './GroupItem.vue';
import type { ButtonConfig } from '@/components/types';

defineProps<{ groupList: Group[]; buttonConfig: Array<ButtonConfig | null> }>();
</script>

<template>
    <h3>Group List</h3>
    <GroupItem v-for="(item, index) in groupList" :key=index :group="item" :button-config="buttonConfig[index]">
    </GroupItem>
</template>