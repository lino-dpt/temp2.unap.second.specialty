const routes_entrevistas = [
    {
        path: "entrevistas",
        name: "entrevistas", 
        component: () => import("@/views/admin/entrevistas/index.vue"),
    },
  ];

export default routes_entrevistas;