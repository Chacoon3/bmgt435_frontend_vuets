import { createRouter, createWebHistory } from 'vue-router'

export const routePaths = {
  signIn: 'sign-in',
  signUp: 'sign-up',
  forgetPassword: 'forget-password',
  workbench: 'workbench',
  grouping:'grouping',
  leaderBoard:'leader-board',
  management:'management',
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/${routePaths.signIn}`,
      name: routePaths.signIn,
      component: () => import('../views/SignInView.vue'),
      alias: '/',
      meta: {
        requireAuth: false
      }
    },
    {
      path: `/${routePaths.signUp}`,
      name: routePaths.signUp,
      component: () => import('../views/SignUpView.vue'),
      meta: {
        requireAuth: false
      }
    },
    // {
    //   path: `/${routePaths.forgetPassword}`,
    //   name: routePaths.forgetPassword,
    //   component: () => import('../views/portal/ForgetPasswordView.vue'),
    //   meta: {
    //     requireAuth: false
    //   }
    // },


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