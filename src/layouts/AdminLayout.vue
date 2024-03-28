<template>
  <v-app id="inspire">
    <v-app-bar color="grey-lighten-3" flat>
      <v-avatar rounded="0" class="ms-3 pa-1" size="55">
        <img
          width="100%"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo_UNAP.png"
          alt=""
        />
      </v-avatar>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            variant="tonal"
            density="comfortable"
            v-bind="props"
            class="ms-2"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list nav>
          <v-list-item title="Cerrar sesión" @click="signOut()">
            <template #append>
              <v-icon color="red"> mdi-logout </v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer floating>
      <v-list nav color="primary" density="compact">
        <template v-for="item in menu" :key="item.title">
          <v-list-item
            v-if="item.children.length === 0"
            :to="item.to"
            :title="item.title"
            :prepend-icon="item.icon"
          />
          <v-list-group v-else :value="item.title">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="item.title"
                :prepend-icon="item.icon"
              />
            </template>
            <v-list-item
              v-for="(subItem, i) in item.children"
              :key="i"
              :title="subItem.title"
              :value="subItem.title"
              :to="subItem.to"
            />
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    <!-- <v-footer app absolute color="grey" height="44"></v-footer> -->
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AuthService from "@/services/AuthService";

import { useRouter } from "vue-router";

const router = useRouter();

const authService = new AuthService();
const signOut = async () => {
  await authService.signOut();
  router.push("/login");
};

// const listMenuAccount = [
//   {
//     title: "Perfil",
//     icon: "mdi-account",
//     color: "grey",
//     to: "/a/profile",
//     action: null,
//   },
//   {
//     title: "Configuración",
//     icon: "mdi-cog",
//     color: "grey",
//     to: "/a/settings",
//     action: null,
//   },
//   {
//     title: "Cerrar sesión",
//     icon: "mdi-logout",
//     color: "red",
//     to: null,
//     action: signOut,
//   },
// ];



const menu = ref([
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard",
    to: "/a",
    children: [],
  },
  {
    title: "Postulantes",
    icon: "mdi-account-group",
    to: "/a/postulants",
    children: [],
  },

  // {
  //   title: "Resultados",
  //   icon: "mdi-file-check",
  //   to: "/a/results",
  //   children: [],
  // },
  // {
  //   title: "Usuarios",
  //   icon: "mdi-account-group",
  //   to: "/a/users",
  //   children: [],
  // },

  // {
  //   title: "Seguridad",
  //   icon: "mdi-lock",
  //   to: "/a/security",
  //   children: [
  //     {
  //       title: "Roles",
  //       icon: "mdi-account-group",
  //       to: "/a/security",
  //     },
  //     {
  //       title: "Permisos",
  //       icon: "mdi-account-group",
  //       to: "/a/security",
  //     },
  //   ],
  // },
  // {
  //   title: "Configuración",
  //   icon: "mdi-cog",
  //   to: "/a/settings",
  //   children: [
  //     {
  //       title: "Tipos de documentos",
  //       icon: "mdi-account-group",
  //       to: "/a/document-types",
  //     },
  //   ],
  // },
]);
</script>
