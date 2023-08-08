<script setup lang="ts">
import { RouterView } from 'vue-router'
import CustomTitle from './components/CustomTitle.vue';
import router from './router';
import NavigationBar from '@/components/NavigationBar.vue'
import { watch, ref } from 'vue';

const moduleTitle = ref<string>('')

function setModuleTitle(newVal: any, oldVal: any) {
  if (newVal !== oldVal) {
    switch (newVal.name?.toString()) {
      case 'workbench':
        moduleTitle.value = 'Workbench'
        break;
      case 'groups':
        moduleTitle.value = 'Groups'
        break;
      case 'records':
        moduleTitle.value = 'Records'
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
        <RouterView />
      </div>

    </div>

  </body>
</template>

<style scoped>
#appContainer {
  display: flex;
  flex-direction: row;
  min-height: var(--app-min-height);
  min-width: var(--app-min-width);
  align-items: stretch;
}

#moduleContainer {
  position: relative;
  display: block;
  min-height: var(--app-min-height);
  flex: 1;
}

#moduleContent {
  position: relative;
  display: block;
}
</style>