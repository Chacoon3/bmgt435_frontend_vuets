<script setup lang="ts">
import { type Group } from '@/utils/backendTypes';
import type { ButtonConfig } from '@/components/types';

defineProps<{ 
    group: Group; 
    buttonConfig: ButtonConfig | null;
}>();
</script>

<template>
    <div id="groupItemContainer">
        <span class="groupName">{{ group.name }}</span>
        <button v-if="buttonConfig" :class="buttonConfig.htmlClass" :disabled="buttonConfig.disabled()" @click="buttonConfig.onClick">
            {{ buttonConfig?.text }}
        </button>

        <hr>

        <ul class="groupUserList">
            <div v-if="group.users.length > 0">
            <li class="groupUser" v-for="user in group.users" :key="user.id">
                {{ user?.first_name }} {{ user?.last_name }}
            </li>
        </div>
        <div v-else>
            Group is empty
        </div>
        </ul>
    </div>
</template>

<style scoped>
#groupItemContainer {
    margin-bottom: 1em;
    border: 1px solid grey;
    padding: 2px 10px;
}

.groupName {
    display: inline-block;
    font-weight: bold;
    min-width: 140px;
}

.groupUserList {
    flex-direction: row;
    display: flex;
    justify-content: left;
    padding: 0%;
}

.groupUser {
    list-style: none;
    margin-right: 2em;
}
</style>