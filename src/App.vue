<script setup lang="ts">
import { watch, ref } from 'vue';
import { RouterView } from 'vue-router'
import router, { routePaths } from './router';
import { useCurrentUser, formatUserName, useSignOut } from './utils/userUtils';
import ViewPageTitle from './components/ViewPageTitle.vue';
import NavigationBar from '@/components/NavigationBar.vue'
import { type NavigationConfig } from './components/types';
import FeedbackIcon from './components/FeedbackIcon.vue';
import { useModal } from './utils/modalUtils';
import ModalBox from './components/ModalBox.vue';
import { useProgressBox } from './utils/progressBoxUtils';
import ProgressBox from './components/ProgressBox.vue';
import { useFeedbackModal } from './utils/feedbackUtils';
import FeedbackForm from './components/FeedbackForm.vue';

const { currentUser, isAdmin } = useCurrentUser()
const {signOut} = useSignOut();
const moduleTitle = ref<string>('')
const { getModalStack, showModal, closeModal } = useModal();
const { getitemStack: getProgBoxStack } = useProgressBox();
function setModuleTitle(newVal: any, oldVal: any) {
  if (newVal !== oldVal) {
    switch (newVal.name?.toString()) {
      case 'workbench':
        moduleTitle.value = `Welcome, ${formatUserName(currentUser.value)}!`
        break;
      case 'groups':
        moduleTitle.value = 'Groups'
        break;
      case 'records':
        moduleTitle.value = 'Case Records'
        break;
      case 'leader-board':
        moduleTitle.value = 'Leader Board'
        break;
      case 'manage':
        moduleTitle.value = 'Manage'
        break;
      case 'portal':
        moduleTitle.value = 'Portal'
        break;
      default:
        moduleTitle.value = ''
        break;
    }
  }
}

watch(router.currentRoute, setModuleTitle, { immediate: true })

const naviItemBase: NavigationConfig = {
  items: [
    { url: routePaths.workbench, imgSource:  '/icons/navigationBar/workbench.svg', text: 'Workbench' },
    { url: routePaths.grouping, imgSource: '/icons/navigationBar/groups.svg', text: 'Groups' },
    { url: routePaths.records, imgSource: '/icons/navigationBar/records.svg', text: 'Case Records' },
    { url: routePaths.leaderBoard, imgSource: '/icons/navigationBar/leaderBoard.svg', text: 'Leader Board' },
    { url: routePaths.portal, imgSource: '/icons/navigationBar/exit.svg', text: 'Sign Out' }
  ]
}

const naviItemAdmin: NavigationConfig = {
  items: [
    { url: routePaths.workbench, imgSource: '/icons/navigationBar/workbench.svg', text: 'Workbench' },
    { url: routePaths.grouping, imgSource: '/icons/navigationBar/groups.svg', text: 'Groups' },
    { url: routePaths.records, imgSource: '/icons/navigationBar/records.svg', text: 'Case Records' },
    { url: routePaths.leaderBoard, imgSource: '/icons/navigationBar/leaderBoard.svg', text: 'Leader  Board' },
    { url: routePaths.manage, imgSource: '/icons/navigationBar/manage.svg', text: 'Manage' },
    { url: routePaths.portal, imgSource: '/icons/navigationBar/exit.svg', text: 'Sign Out' }]
}

if (import.meta.env.PROD === true) {
  naviItemBase.items = naviItemBase.items.map((item) => {
    item.imgSource = `/~zizheng/${item.imgSource}`
    return item;
  })

  naviItemAdmin.items = naviItemAdmin.items.map((item) => {
    item.imgSource = `/~zizheng/${item.imgSource}`
    return item;
  })
}

const naviItems = ref<NavigationConfig>(naviItemBase);

watch(currentUser, (user) => {
  if (user !== null) {
    if (isAdmin() === true) {
      naviItems.value = naviItemAdmin;
    }
    else {
      naviItems.value = naviItemBase
    }
  }
  else {
    naviItems.value = naviItemBase;
  }
}, { immediate: true });

function handleClickNavigation(clickedIndex: number) {
  if (clickedIndex === naviItems.value.items.length - 1) {
    showModal({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      confirmText: 'Sign Out',
      cancelText: 'Cancel',
      onConfirm: () => {
        closeModal();
        router.push(naviItems.value.items[clickedIndex].url);
        signOut();
      },
      onCancel: () => { 
        closeModal();
      }      
    })
  }
  else {
    router.push(naviItems.value.items[clickedIndex].url);
  }
}

const { isFeedbackModalOpen } = useFeedbackModal();
</script>

<template>
  <body id="appContainer">
    <KeepAlive>
      <NavigationBar v-if="router.currentRoute.value.meta.requireAuth === true" :items="naviItems.items" @update:focus="handleClickNavigation"></NavigationBar>
    </KeepAlive>

    <div id="moduleContainer">

      <div id="moduleTitle" v-if="router.currentRoute.value.meta.requireAuth === true">
        <ViewPageTitle :title="moduleTitle"></ViewPageTitle>
      </div>


      <RouterView />
    </div>

    <FeedbackIcon v-if="router.currentRoute.value.meta.requireAuth === true"></FeedbackIcon>
    <FeedbackForm v-if="isFeedbackModalOpen === true"></FeedbackForm>
    <ModalBox v-for="(modal, index) in getModalStack" :key="index" :modal-config="modal"></ModalBox>
    <ProgressBox v-for="(progBox, index) in getProgBoxStack" :key="index" :config="progBox"></ProgressBox>
  </body>
</template>