const routes_convocatorias = [
    {
        path: "convocatorias",
        name: "convocatorias", 
        component: () => import("@/views/admin/convocatoria/index.vue"),
    },
  ];

export default routes_convocatorias;