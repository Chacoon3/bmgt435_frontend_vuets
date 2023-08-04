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

watch(isCurrentUserLoading, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        if (newVal === true) {
            naviItems.value = Array.from([1, 2, 3, 4, 5], () => {
                return {
                    url: '',
                    imgSource: '/icons/navigationBar/exit.svg',
                    text: 'Loading..'
                }
            })
        }
        else {
            if (currentUser.value?.role_id === 1) {
                naviItems.value = navigationItemAdmin
            }
            else {
                naviItems.value = naviItemsBase
            }
        }
    }
});

function tryNavigate(url: string) {
    if (isCurrentUserLoading.value === false)
        router.push({ name: url })
}

function handleSignOut() {
    signOut();
    router.push({ name: routePaths.portal })
}

type NavigationItemConfig = {
    url: string,
    imgSource: string,
    text: string,
};

</script>

<template>
    <div id="navigationBar">
        <div v-for="item in naviItems" :key="item.text" :to="{ name: item.url }" class="navigationItemDiv"
            @click="tryNavigate(item.url)">
            <img v-bind:src="item.imgSource" class="naviImg">
            <span class="naviText">{{ item.text }}</span>
        </div>
        <div class="navigationItemDiv" @click="handleSignOut()">
            <img v-bind:src="'/icons/navigationBar/exit.svg'" class="naviImg">
            <span class="naviText">Sign Out</span>
        </div>
    </div>
</template>

<style scoped>
#navigationBar {
    margin-right: 5vw;
    width: 15vw;
    height: 100vh;
    background-color: var(--color-red-umd);
}

.navigationItemDiv {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 10px 0 10px;
    height: calc(100vh / v-bind("naviItems.length + 1"));
    margin: 0;
    border: 0;
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