import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initAuth, user } from "./stores/auth";

const app = createApp(App);
app.use(router);

initAuth().then(() => {
  if (user.value && router.currentRoute.value.path === "/login") {
    router.replace("/home");
  }

  app.mount("#app");
});
