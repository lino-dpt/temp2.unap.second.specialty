<template>
  <v-toolbar>
    <v-list-item subtitle="Gestion de postulantes" title="Postulantes" />
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-card rounded="0" elevation="0" class="bg-light border">
    <v-row class="pa-2">
      <v-col cols="6"> </v-col>
      <v-col cols="6">
        <v-text-field v-model="search" label="Buscar" />
      </v-col>
    </v-row>
  </v-card>
  <v-data-table-server
    class="border"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    :search="search"
    item-value="Name"
    no-data-text="No se encontraron registros"
    items-per-page-text="Registros por página"
    loading-text="Cargando registros"
    multi-sort
    :items-per-page-options="[5, 10, 25, 50]"
    @update:options="loadItems"
  >
    <template v-slot:[`item.Status`]="{ item }">
      <v-chip :color="item.Status ? 'blue' : 'error'" dark label small>
        {{ item.Status ? "Activo" : "Inactivo" }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        icon="mdi-plus"
        size="small"
        color="primary"
        variant="tonal"
        link
        :to="`/a/postulants/show/${item.Id}/generals`"
      >
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;
  //si search es menor de 3 caracteres no se realiza la busqueda
  search = search === null ? "" : search; 
  if (   search.length < 3 && search.length > 0) {
    loading.value = false;
    return;
  }

  let res = await axios.post(
    `https://data.segundas.unap.edu.pe/api/postulants/list`,
    {
      page,
      itemsPerPage,
      sortBy,
      search,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  let data = await res.data;

  headers.value = data.headers;
  totalItems.value = data.items.total;
  serverItems.value = data.items.data;

  loading.value = false;
};
</script>
