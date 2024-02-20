import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import sede from "./sede.ts";
import routes_convocatorias from "./convocatoria.ts";
import routes_institucionorigen from "./institucionorigen.ts";
import routes_vacantes from "./vacante.ts";

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
      ...sede,
      ...routes_convocatorias,
      ...routes_institucionorigen,
      ...routes_vacantes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
