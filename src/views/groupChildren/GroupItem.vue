<script setup lang="ts">
import { type Group } from '../../utils/ORMTypes';
import { ref } from 'vue';

const props = defineProps<Group>();

const buttonExpand = ref<boolean>(false);

function handleExpand() {
    buttonExpand.value = !buttonExpand.value;
}
</script>

<template>
    <div id="groupItemContainer">
        <span class="groupName">{{ props.name }}</span>
        <button class="groupItem" @click="handleExpand">{{ buttonExpand ? "Collapse" : "Expand" }}</button>
        <div v-if="buttonExpand === true">
            <li class="groupUser" v-for="user in props.users" :key="user.id">
                {{ user?.first_name }} {{ user?.last_name }}
            </li>
        </div>
    </div>
</template>

<style scoped>
#groupItemContainer{
    margin-bottom: 15px;
}
.groupName {
    display: inline-block;
    min-width: 140px;
}

.groupUser{
    list-style: none;
}
</style>