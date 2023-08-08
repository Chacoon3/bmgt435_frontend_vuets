<script setup lang="ts">
import { useCurrentUser, useSignOut } from '@/utils/userUtils';
import { watch, ref } from 'vue';
import router, { routePaths } from '@/router';


const { isCurrentUserLoading, currentUser } = useCurrentUser();
const { signOut } = useSignOut();
const naviItemsBase: NavigationItemConfig[] = [
    { url: routePaths.workbench, imgSource: '/icons/navigationBar/workbench.svg', text: 'Workbench' },
    { url: routePaths.grouping, imgSource: '/icons/navigationBar/groups.svg', text: 'Groups' },
    { url: routePaths.records, imgSource: '/icons/navigationBar/records.svg', text: 'Records' },
    { url: routePaths.leaderBoard, imgSource: '/icons/navigationBar/leaderBoard.svg', text: 'Leader  Board' },
]

const navigationItemAdmin: NavigationItemConfig[] = [
    { url: routePaths.workbench, imgSource: '/icons/navigationBar/workbench.svg', text: 'Workbench' },
    { url: routePaths.grouping, imgSource: '/icons/navigationBar/groups.svg', text: 'Groups' },
    { url: routePaths.records, imgSource: '/icons/navigationBar/records.svg', text: 'Records' },
    { url: routePaths.leaderBoard, imgSource: '/icons/navigationBar/leaderBoard.svg', text: 'Leader  Board' },
    { url: routePaths.manage, imgSource: '/icons/navigationBar/manage.svg', text: 'Manage' },
]
const naviItems = ref<NavigationItemConfig[]>(naviItemsBase);

watch(currentUser, (newVal) => {
    if (newVal !== null) {
        if (newVal.role === 111) {
            naviItems.value = navigationItemAdmin;
        }
        else {
            naviItems.value = naviItemsBase
        }
    }
    else {
        naviItems.value = naviItemsBase;
    }
}, { immediate: true });

function tryNavigate(url: string) {
    if (isCurrentUserLoading.value === false)
        router.push(url)
}

function handleSignOut() {
    router.push({ name: routePaths.portal })
    signOut();
}

type NavigationItemConfig = {
    url: string,
    imgSource: string,
    text: string,
};

</script>

<template>
    <nav id="navigationBar">

        <div v-for="(item, index) in naviItems" :key="index" :to="{ name: item.url }" class="navigationItemDiv"
            @click="tryNavigate(item.url)">
            <img v-bind:src="item.imgSource" class="naviImg">
            <span class="naviText">{{ item.text }}</span>
        </div>

        <div class="navigationItemDiv" @click="handleSignOut()">
            <img v-bind:src="'/icons/navigationBar/exit.svg'" class="naviImg">
            <span class="naviText">Sign Out</span>
        </div>

    </nav>
</template>

<style scoped>
#navigationBar {
    min-height: var(--app-min-height);
    width: 220px;
    margin-right: 150px;
}

.navigationItemDiv {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 10px 0 10px;
    height: calc(max(100vh / v-bind("naviItems.length + 1"), 100px));
    background-color: var(--color-red-umd);
    transition: var(--transition-button);
}

.navigationItemDiv:hover {
    background-color: palevioletred;
}

img.naviImg {
    width: 25%;
    height: 25%;
}

.naviText {
    width: 45%;
    padding-left: 10%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: "";
}
</style>