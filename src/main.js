import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useAuth } from "./composables/useAuth";

const app = createApp(App);
app.use(router);

const { user, loading, initAuth } = useAuth();

initAuth().then(() => {
  if (user.value && router.currentRoute.value.path === "/login") {
    router.replace("/home");
  }

  app.mount("#app");
});
