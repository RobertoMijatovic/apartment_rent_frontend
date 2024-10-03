import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./components/LandingPage.vue";
import DailyRents from "./components/daily_rents.vue";
import LongTermRents from "./components/long_term_rents.vue";
import Markets from "./components/marketpage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import LoginPage from "./components/LoginPage.vue";

const routes = [
  { path: "/", component: LandingPage, name: "landing" },
  { path: "/daily-rents", component: DailyRents, name: "daily_rents" },
  {
    path: "/long-term-rents",
    component: LongTermRents,
    name: "long_term_rents",
  },
  { path: "/markets", component: Markets, name: "marketpage" },
  { path: "/register", component: RegisterPage, name: "register" },
  { path: "/login", component: LoginPage, name: "login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token"); 

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
