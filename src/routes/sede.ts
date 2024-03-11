const routes = [
    {
        path: "places",
        name: "places", 
        component: () => import("@/views/admin/place/index.vue"),
    },
  ];

export default routes;