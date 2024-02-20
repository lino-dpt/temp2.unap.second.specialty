<template>
  <v-toolbar>
    <v-list-item title="Institucion de origen" subtitle="" />
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="newRecord">
      Nuevo
    </v-btn>
  </v-toolbar>
  <v-data-table-server class="border" v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
    :items="serverItems" :loading="loading" :search="search" item-value="Name"
    :items-per-page-options="[1, 5, 10, 25, 50]" @update:options="loadItems">

    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="editItem(item)" class="mr-2" color="green darken-4" density="compact" variant="tonal">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm @onConfirm="deleteItem(item)" :title="`Eliminar ${item.nombre}`"
          :text="`¿Está seguro de que desea eliminar el tipo de documento ${item.nombre}?`"></DialogConfirm>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table-server>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ editedIndex === -1 ? "Nuevo" : "Editar" }}
        </span>
      </v-card-title>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
            <v-text-field v-model="editedItem.codigo" label="codigo"></v-text-field>
            <v-text-field v-model="editedItem.ubigeo" label="ubigeo"></v-text-field>
            <v-text-field v-model="editedItem.pais_id" label="pais_id"></v-text-field>
            <v-text-field v-model="editedItem.tipo" label="tipo"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
        <v-btn variant="tonal" text @click="saveRecord">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import DialogConfirm from "@/components/DialogConfirm.vue";
import { ref } from "vue";

const listDocumentTypes = ref([]);
const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const dialog = ref(false);
const editedItem = ref({});
const defaultItem = ref({
  id: "",
  nombre: "",
  codigo: "",
  ubigeo: "",
  tipo: "",
  pais_id: ""
});
const editedIndex = ref(-1);

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  // let res = await axios.get("http://segundas.unap.pe/api/institucionesOrigen", {
  let res = await axios.post("http://servicio_institucionorigen.test/api/institucionorigens", {
    page,
    itemsPerPage,
    sortBy,
    search,
  });
  let data = await res.data;

  console.log("data", data);

  headers.value = data.headers;
  totalItems.value = data.length;
  serverItems.value = data.items.data;

  console.log("page", page);
  console.log("itemsPerPage", itemsPerPage);
  console.log("sortBy", sortBy);

  loading.value = false;
};
const editItem = (item) => {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const newRecord = () => {
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem.value);
  dialog.value = true;
};

const close = () => {
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem.value);
  dialog.value = false;
};

const saveRecord = async () => {
  if (editedIndex.value === -1) {
    // let res = await axios.post("http://segundas.unap.pe/api/institucionOrigen", {
    let res = await axios.post("http://servicio_institucionorigen.test/api/institucionorigensstore", {
      nombre: editedItem.value.nombre,
      codigo: editedItem.value.codigo,
      ubigeo: editedItem.value.ubigeo,
      pais_id: editedItem.value.pais_id,
      tipo: editedItem.value.tipo
    });
    serverItems.value.push({ ...res.data.data });

    dialog.value = false;
  } else {
    console.log("editedItem", editedItem.value);

    let res = await axios.patch(
      // "http://segundas.unap.pe/api/institucionOrigen/" + editedItem.value.id,
      "http://servicio_institucionorigen.test/api/institucionorigens/" + editedItem.value.id,
      {
        nombre: editedItem.value.nombre,
        codigo: editedItem.value.codigo,
        ubigeo: editedItem.value.ubigeo,
        pais_id: editedItem.value.pais_id,
        tipo: editedItem.value.tipo
      }
    );

    serverItems.value[editedIndex.value] = res.data.data;
    dialog.value = false;
    console.log("update record");
  }
};

const deleteItem = async (item) => {
  let res = await axios.delete(
    // "http://segundas.unap.pe/api/institucionOrigen/" + item.id
    "http://servicio_institucionorigen.test/api/institucionorigens/" + item.id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};

</script>
