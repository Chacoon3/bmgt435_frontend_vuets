<script setup lang="ts">
import { watch, ref } from 'vue';
import { RouterView } from 'vue-router'
import router from './router';

import { useCurrentUser, formatUserName } from './utils/userUtils';

import CustomTitle from './components/CustomTitle.vue';
import NavigationBar from '@/components/NavigationBar.vue'

const { currentUser } = useCurrentUser()
const moduleTitle = ref<string>('')

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
</script>

<template>
  <body id="appContainer">
    <KeepAlive>
      <NavigationBar v-if="router.currentRoute.value.meta.requireAuth === true"></NavigationBar>
    </KeepAlive>

    <div id="moduleContainer">

      <div id="moduleTitle" v-if="router.currentRoute.value.meta.requireAuth === true">
        <CustomTitle :title="moduleTitle"></CustomTitle>
      </div>

      <div id="moduleContent">
        <KeepAlive>
        <RouterView />
      </KeepAlive>
      </div>
    </div>
    <ThemeSetting></ThemeSetting>
  </body>
</template>