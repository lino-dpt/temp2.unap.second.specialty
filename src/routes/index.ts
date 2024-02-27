import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Auth",
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home.vue"),
      },
      {
        path: ":slug/preinscripcion",
        name: "Inizializar Preinscripcion",
        component: () => import("@/views/index.vue"),
      },
      {
        path: ":slug/preinscripcion/:postulant",
        name: "Preinscripcion",
        component: () => import("@/views/_postulant.vue"),
      },
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
