import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import { getToken } from "../util";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//路由拦截
router.beforeEach(async (to, from, next) => {
  // 如果已登录一次
  if (getToken()) {
    if (to.path === "/") {
      next("/home/article");
    } else {
      next();
    }
  } else {
    if (to.path === "/") {
      next();
    } else {
      // 否则重定向到登录页面
      next("/");
    }
  }
});

export default router;
