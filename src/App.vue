<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router';
import NavigationBar from '@/components/NavigationBar.vue'

</script>

<template>
  <body id="appContainer">
    <KeepAlive>
      <NavigationBar v-if="router.currentRoute.value.meta.requireAuth === true"></NavigationBar>
    </KeepAlive>
    <div id="viewContainer">
    <RouterView />
  </div>
  </body>
</template>

<style scoped>
#appContainer {
  display: flex;
  flex-direction: row;
  min-height: 500px;
  min-width: 800px;
}

</style>