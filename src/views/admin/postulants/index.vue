<template>
  <v-toolbar>
    <v-list-item subtitle="Gestion de postulantes" title="Postulantes" />
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-data-table-server
    class="border"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    :search="search"
    item-value="Name"
    :items-per-page-options="[1, 5, 10, 25, 50]"
    @update:options="loadItems"
  >
    <template v-slot:[`item.Status`]="{ item }">
      <v-chip :color="item.Status ? 'blue' : 'error'" dark label small>
        {{ item.Status ? "Activo" : "Inactivo" }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        prepend-icon="mdi-plus"
        color="primary"
        variant="tonal"
        link
        :to="`/a/postulants/show/${item.Id}/generals`"
      >
        Detalles
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

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

  // console.log("page", page);
  // console.log("itemsPerPage", itemsPerPage);
  // console.log("sortBy", sortBy);

  loading.value = false;
};
</script>
