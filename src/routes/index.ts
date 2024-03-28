import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
// import sede from "./sede.ts";
// import routes_convocatorias from "./convocatoria.ts";
// import routes_institucionorigen from "./institucionorigen.ts";
// import routes_vacantes from "./vacante.ts";
// import routes_entrevistas from "./entrevistas.ts";

import AuthService from "@/services/AuthService";

//de authService usar e current user para verificar si el usuario esta autenticado en las rutas protegidas /a

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Auth",
    component: () => import("@/views/auth/login.vue"),
  },

  {
    path: "/resultados",
    name: "Resultados",
    component: () => import("@/views/results.vue"),
  },

  {
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    children: [
      //redureccion a la pagina de inicio cuando no se encuentra la ruta
      {
        path: "/:pathMatch(.*)*",
        redirect: { name: "home" },
      },
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
    name: "a",
    component: AdminLayout,
    meta: { requiresAuth: true },
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
        //path: "postulants/show/:id/?:tab",
        path: "postulants/show/:id/:tab?",
        name: "postulant.show",
        component: () => import("@/views/admin/postulants/show.vue"),
      },
      {
        //path: "postulants/show/:id/?:tab",
        path: "postulants/edit/:id",
        name: "postulant.edit",
        component: () => import("@/views/admin/postulants/edit.vue"),
      },

      {
        path: "results",
        name: "Results",
        component: () => import("@/views/admin/results/index.vue"),
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

router.beforeEach(async (to, from, next) => {
  console.log(from);

  const authService = new AuthService();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = await authService.validateToken();

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.name === "Auth" && isAuthenticated) {
    next("/a");
  } else {
    next();
  }
});

export default router;
