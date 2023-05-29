import VueRouter from "vue-router";

import Vue from "vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/list/blog",
  },
  {
    path: "/list/:type",
    component: () => import("@/views/ListL.vue"),
  },
  {
    path: "/article/:type/:id",
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

// const router = new VueRouter({
//   routes,
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savePosition) => {
    // 动行为，每个页面切换时自动回到顶部
    if (savePosition) {
      return {
        savePosition,
        behavior: "smooth", // 	// return 期望滚动到哪个的位置
      };
    } else {
      return { behavior: "smooth", y: 0 };
    }
  },
});

export default router;
