import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router, { routePaths } from "./router";
import { globalErrorHandler } from "./utils/errorUtils";
import { useCurrentUser } from "./utils/userUtils";

const { currentUser, getCurrentUser } = useCurrentUser();

router.beforeEach((to, from, next) => {
  if (to.name === routePaths.loading) {
    // otherwise will cause infinite loop routing to loading page
    next();
    return;
  }

  if (currentUser.value === undefined || currentUser.value === null) {
    if (to.meta.requireAuth) {
      router.push({ name: routePaths.portal });
      localStorage.setItem("lastRoute", routePaths.portal);
    } else {
      next();
      localStorage.setItem("lastRoute", to.name as string);
    }
  } else {
    next();
    localStorage.setItem("lastRoute", to.name as string);
  }
});

const app = createApp(App);

app.use(router);

app.config.errorHandler = globalErrorHandler;

app.mount("#app");

router.push({ name: routePaths.loading });

getCurrentUser((resp: any) => {
  if (resp.status === 200 && currentUser.value !== null) {
    const lastRoute = localStorage.getItem("lastRoute");
    if (lastRoute !== null && lastRoute !== routePaths.loading && lastRoute !== routePaths.errorPage) {
      router.push({ name:lastRoute });
    } else {
    router.push({ name: routePaths.workbench });
    localStorage.setItem("lastRoute", routePaths.workbench);
    }
  } else {
    router.push({ name: routePaths.portal });
    localStorage.setItem("lastRoute", routePaths.portal);
  }
});