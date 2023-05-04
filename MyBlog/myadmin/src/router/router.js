export const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../view/LoginL.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../view/MainM.vue"),
    children: [
      {
        path: "article",
        name: "article",
        component: () => import("../view/articleA.vue"),
      },
      {
        path: "result",
        name: "result",
        component: () => import("../view/result.vue"),
      },
      {
        path: "editE",
        name: "editE",
        component: () => import("../view/editE.vue"),
      },
      {
        path: "photoEdit",
        name: "photoEdit",
        component: () => import("../view/photoEdit.vue"),
      },
      {
        path: "dataBorder",
        name: "dataBorder",
        component: () => import("../view/dataBorder.vue"),
      },
    ],
  },
];
