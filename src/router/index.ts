import { createRouter, createWebHistory } from 'vue-router'

export const routePaths = {
  portal:'portal',
  workbench: 'workbench',
  grouping:'grouping',
  leaderBoard:'leader-board',
  management:'management',
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/${routePaths.portal}`,
      name: routePaths.portal,
      component: () => import('../views/PortalView.vue'),
      alias: '/',
      meta: {
        requireAuth: false
      }
    },
    // {
    //   path: `/${routePaths.workbench}`,
    //   component: () => import('../views/system/WorkspaceView.vue'),
    //   name: routePaths.workbench,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: `/${routePaths.grouping}`,
    //   name: routePaths.grouping,
    //   component: () => import('../views/system/GroupingView.vue'),
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: `/${routePaths.records}`,
    //   name: routePaths.records,
    //   component: () => import('../views/system/RecordsView.vue'),
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: `/${routePaths.management}`,
    //   name: routePaths.management,
    //   component: () => import('../views/system/ManagementView.vue'),
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    // {
    //   path: `/${routePaths.leaderBoard}`,
    //   name: routePaths.leaderBoard,
    //   component: () => import('../views/system/LeaderBoardView.vue'),
    //   meta: {
    //     requireAuth: true
    //   }
    // },
  ]
})

export default router