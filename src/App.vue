<script setup lang="ts">
import { watch, ref } from 'vue';
import { RouterView } from 'vue-router'
import router, { routePaths } from './router';
import { useCurrentUser, formatUserName } from './utils/userUtils';
import CustomTitle from './components/CustomTitle.vue';
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
const moduleTitle = ref<string>('')
const { getModalStack } = useModal();
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

const naviItemsBase: NavigationConfig = {
  items: [
    { url: routePaths.workbench, imgSource: '/icons/navigationBar/workbench.svg', text: 'Workbench' },
    { url: routePaths.grouping, imgSource: '/icons/navigationBar/groups.svg', text: 'Groups' },
    { url: routePaths.records, imgSource: '/icons/navigationBar/records.svg', text: 'Case Records' },
    { url: routePaths.leaderBoard, imgSource: '/icons/navigationBar/leaderBoard.svg', text: 'Leader  Board' },
  ]
}
const navigationItemAdmin: NavigationConfig = {
  items: [
    { url: routePaths.workbench, imgSource: '/icons/navigationBar/workbench.svg', text: 'Workbench' },
    { url: routePaths.grouping, imgSource: '/icons/navigationBar/groups.svg', text: 'Groups' },
    { url: routePaths.records, imgSource: '/icons/navigationBar/records.svg', text: 'Case Records' },
    { url: routePaths.leaderBoard, imgSource: '/icons/navigationBar/leaderBoard.svg', text: 'Leader  Board' },
    { url: routePaths.manage, imgSource: '/icons/navigationBar/manage.svg', text: 'Manage' },]
}
const naviItems = ref<NavigationConfig>(naviItemsBase);

watch(currentUser, (user) => {
  if (user !== null) {
    if (isAdmin() === true) {
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

const { isFeedbackModalOpen } = useFeedbackModal();
</script>

<template>
  <body id="appContainer">
    <KeepAlive>
      <NavigationBar v-if="router.currentRoute.value.meta.requireAuth === true" :items="naviItems.items"></NavigationBar>
    </KeepAlive>

    <div id="moduleContainer">

      <div id="moduleTitle" v-if="router.currentRoute.value.meta.requireAuth === true">
        <CustomTitle :title="moduleTitle"></CustomTitle>
      </div>

      <!-- <div id="moduleContent"> -->
        <!-- <KeepAlive> -->
          <RouterView />
        <!-- </KeepAlive> -->
      <!-- </div> -->
    </div>
    
    <FeedbackIcon v-if="router.currentRoute.value.meta.requireAuth === true"></FeedbackIcon>
    <FeedbackForm v-if="isFeedbackModalOpen === true"></FeedbackForm>
    <ModalBox v-for="(modal, index) in getModalStack" :key="index" :modal-config="modal"></ModalBox>
    <ProgressBox v-for="(progBox, index) in getProgBoxStack" :key="index" :config="progBox"></ProgressBox>
  </body>
</template>