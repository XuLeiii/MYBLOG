import VueRouter from "vue-router";

import Vue from "vue";
Vue.use(VueRouter);

const routes = [
  // {
  //   path:"/",
  //   redirect:"/list/blog"
  // },
  {
    path: "/list/:type",
    component: () => import("@/views/ListL.vue"),
  },
  {
    path: "/article",
    component: () => import("@/views/ArticleA.vue"),
  },
  {
    path: "/photo",
    component: () => import("@/views/PhotoP.vue"),
  },
  {
    path: "/MessageBoard",
    component: () => import("@/views/MessageBoard"),
  },
  {
    path: "/about",
    component: () => import("@/views/AboutA"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
