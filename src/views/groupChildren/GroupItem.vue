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

        <ul class="groupUserList">
            <li class="groupUser" v-for="user in group.users" :key="user.id">
                {{ user?.first_name }} {{ user?.last_name }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
#groupItemContainer {
    margin-bottom: 5px;
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