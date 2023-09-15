<script setup lang="ts">
import { useCurrentUser, useSignOut } from '@/utils/userUtils';
import router, { routePaths } from '@/router';
import { type NavigationConfig } from './types';

defineProps<NavigationConfig>();

const { isCurrentUserLoading, } = useCurrentUser();
const { signOut } = useSignOut();

function tryNavigate(url: string) {
    if (isCurrentUserLoading.value === false)
        router.push(url)
}

function handleSignOut() {
    router.push({ name: routePaths.portal })
    signOut();
}

</script>

<template>
    <nav id="navigationBar">

        <div id="naviWrapper">
            <div v-for="(item, index) in $props.items" :key="index" :to="{ name: item.url }" class="navigationItemDiv"
                @click="tryNavigate(item.url)">
                <img v-bind:src="item.imgSource" class="naviImg">
                <span class="naviText">{{ item.text }}</span>
            </div>

            <div class="navigationItemDiv" @click="handleSignOut()">
                <img v-bind:src="'/icons/navigationBar/exit.svg'" class="naviImg">
                <span class="naviText">Sign Out</span>
            </div>
        </div>
    </nav>
</template>

<style scoped>
#navigationBar {
    width: 220px;
    /* padding-right: 150px; */
}

#naviWrapper {
    position: sticky;
    width: 220px;
    top: 0%;
}

.navigationItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 10px 0 10px;
    height: calc(max(100vh / v-bind("$props.items.length + 1"), 100px));
    background-color: var(--color-red-umd);
    transition: var(--transition-button);
    box-shadow: 2px 0px 2px  rgba(0, 0, 0, 0.5);
}

.navigationItemDiv:hover {
    background-color: palevioletred;
    cursor: pointer;
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