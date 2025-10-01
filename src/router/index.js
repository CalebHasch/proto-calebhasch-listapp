import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Home from "../components/Home.vue";
import { user } from "../stores/auth";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !user.value) {
    return next("/login");
  }
  next();
});

export default router;
