import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const routes = [
  {
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/index.vue"),
      },
      {
        path: "d/:postulant",
        name: "Postulante",
        component: () => import("@/views/_postulant.vue"),
      }
    ],
    
  },
  {
    path: "/a",
    name: "AdminLayout",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "Admin",
        component: () => import("@/views/admin/index.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/admin/users/index.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/admin/settings/index.vue"),
      },
      {
        path: "security",
        name: "Security",
        component: () => import("@/views/admin/security/index.vue"),
      },
      {
        path: "postulants",
        name: "Postulants",
        component: () => import("@/views/admin/postulants/index.vue"),
      },
      {
        path: "postulants/:id",
        name: "Postulant",
        component: () => import("@/views/admin/postulants/show.vue"),
      },

      {
        path: "document-types",
        name: "DocumentTypes",
        component: () => import("@/views/admin/documentTypes/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
