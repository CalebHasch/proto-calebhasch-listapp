import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initAuth } from "./stores/auth";

const app = createApp(App);
app.use(router);

initAuth().then(() => {
  app.mount("#app");
});
