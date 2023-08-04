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
    <div>
        <h4>{{ props.name }}</h4>
        <button class="groupItem" @click="handleExpand">{{ buttonExpand ? "Collapse" : "Expand" }}</button>
    </div>
    <div v-if="buttonExpand === true">
        <li v-for="user in props.users" :key="user.id">
            {{ user.first_name }} {{ user.last_name }}
        </li>
    </div>
</template>

<style scoped>

</style>