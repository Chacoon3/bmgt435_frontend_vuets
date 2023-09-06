import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router, { routePaths } from "./router";
import { globalErrorHandler } from "./utils/errorUtils";
import { useCurrentUser } from "./utils/userUtils";

const { currentUser, getCurrentUser } = useCurrentUser();

router.beforeEach((to, from, next) => {
  if (currentUser.value === undefined || currentUser.value === null) {
    if (to.meta.requireAuth) {
      router.push({ name: routePaths.portal });
    } else {
      next();
    }
  } else {
    next();
  }
});

const app = createApp(App);

app.use(router);

app.config.errorHandler = globalErrorHandler;

app.mount("#app");

router.push({ name: routePaths.loading });

getCurrentUser((resp: any) => {
  if (resp.status === 200 && currentUser.value !== null) {
    router.push({ name: routePaths.workbench });
  } else {
    router.push({ name: routePaths.portal });
  }
});
