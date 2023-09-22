<script setup lang="ts">
import type { Group } from '@/utils/backendTypes';
import GroupItem from './GroupItem.vue';

defineProps<{
    group:Group;
}>();



</script>

<template>
    <h3 class="groupDivH2">Your Group: {{ group.name }}</h3>
    <div>
        <h3>Members:</h3>
    </div>
    <div>
        <ul id="userGroupInfo">
            <li v-for="item in group.users" :key="item.id">
                <span>{{ item.first_name + ' ' + item.last_name }}</span>
            </li>
        </ul>
    </div>
</template>