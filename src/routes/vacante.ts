const routes_vacantes = [
  {
    path: "vacantes",
    name: "vacantes",
    component: () => import("@/views/admin/vacantes/index.vue"),
  },
];

export default routes_vacantes;