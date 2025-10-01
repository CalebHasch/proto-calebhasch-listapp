import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://isqxxuuspycxnycyagnj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcXh4dXVzcHljeG55Y3lhZ25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjEyMzcsImV4cCI6MjA3NDczNzIzN30.XdyW6kt0t3FRm1sFlnVkBBHUN7C5863aA5O1gdsI4Vk"
);

const app = createApp(App);
app.use(router);
app.mount("#app");
