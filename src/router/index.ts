import { createRouter, createWebHistory } from "vue-router";

export const routePaths = {
  loading: "loading",
  portal: "portal",
  workbench: "workbench",
  grouping: "grouping",
  leaderBoard: "leader-board",
  records: "records",
  manage: "management",
  errorPage: "error",
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/${routePaths.loading}`,
      name: routePaths.loading,
      component: () => import("../views/LoadingView.vue"),
      meta: {
        requireAuth: false,
      }
    },
    {
      path: `/${routePaths.portal}`,
      name: routePaths.portal,
      component: () => import("../views/PortalView.vue"),
      alias: "/",
      meta: {
        requireAuth: false,
      },
    },
    {
      path: `/${routePaths.errorPage}`,
      name: routePaths.errorPage,
      component: () => import("../views/ErrorView.vue"),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: `/${routePaths.workbench}`,
      component: () => import("../views/WorkbenchView.vue"),
      name: routePaths.workbench,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: `/${routePaths.grouping}`,
      name: routePaths.grouping,
      component: () => import("../views/GroupView.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: `/${routePaths.records}`,
      name: routePaths.records,
      component: () => import("../views/RecordsView.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: `/${routePaths.manage}`,
      name: routePaths.manage,
      component: () => import("../views/ManageView.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: `/${routePaths.leaderBoard}`,
      name: routePaths.leaderBoard,
      component: () => import("../views/LeaderBoardView.vue"),
      meta: {
        requireAuth: true,
      },
    },
  ],
});

export default router;