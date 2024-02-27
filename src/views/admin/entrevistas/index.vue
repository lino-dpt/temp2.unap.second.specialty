<template>
  <v-toolbar>
    <v-list-item title="Entrevista" subtitle="Gestión de entrevista" />
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="newRecord">
      Nuevo
    </v-btn>
  </v-toolbar>
  <v-card-title>
    <v-col cols="12">
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-col>
  </v-card-title>
  <v-data-table-server class="border" v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
    :items="serverItems" :loading="loading" :search="search" item-value="Name"
    :items-per-page-options="[1, 5, 10, 25, 50]" @update:options="loadItems">
    <template v-slot:[`item.Status`]="{ item }">
      <v-chip :color="item.Status ? 'blue' : 'error'" dark label small>
        {{ item.Status ? "Entrevistado" : "Pendiente" }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="editItem(item)" class="mr-2" color="green darken-4" density="compact" variant="tonal">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm @onConfirm="deleteItem(item)" :title="`Eliminar ${item.nombre}`"
          :text="`¿Está seguro de que desea eliminar este registro: ${item.nombre}?`"></DialogConfirm>
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
            <v-autocomplete v-model="editedItem.id_convocatoria" :items="convocatorias" label="Convocatoria"
              itemTitle="nombre" itemValue="id" variant="outlined">
            </v-autocomplete>
            <v-autocomplete v-model="editedItem.id_programa" :items="programas" label="Programa" itemTitle="nombre"
              itemValue="id" variant="outlined" :clearable="false">
            </v-autocomplete>
            <v-autocomplete v-model="editedItem.id_postulante" :items="postulantes" label="Postulante"
              itemTitle="nombre_completo" itemValue="dni" variant="outlined">
            </v-autocomplete>
            <v-checkbox v-model="editedItem.Status" label="Activo" />
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
  id_convocatoria: "",
  id_programa: "",
  id_postulante: "",
  Status: true
});
const editedIndex = ref(-1);

const programas = ref([]);


const convocatorias = [
  { nombre: "CONVOCATORIA 2024 - I", id: 1 },
];

const postulantes = [
  { nombre_completo: "ANDY MAMANI VEGA", dni: "11112222" },
  { nombre_completo: "YABIA OIDO DELLOS", dni: "22223333" },
  { nombre_completo: "ERO ERADEJA USARLA", dni: "33334444" },
];


const loadProgramas = async () => {
  try {
    const response = await axios.get('http://segundas.unap.pe/api/programas');
    programas.value = response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

loadProgramas();

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  // let res = await axios.post("http://segundas.unap.pe/api/convocatorias", {
  let res = await axios.post("http://segunda_especialidad_felix.test/api/entrevista", {
    // let res = await axios.post("http://174.138.178.194:8081/api/mostrar_todos_convocatoria", {
    page,
    itemsPerPage,
    sortBy,
    search,
  });
  let data = await res.data;
  // let res = await res;


  headers.value = data.headers;
  totalItems.value = data.total;
  let data_items = data.items.data;

  const baseURL = 'http://segundas.unap.pe/api/programa/';

  // Iterate through each item in the data array
  data_items.forEach(item => {
    const endpoint = baseURL + item.id_programa;

    // Make the GET request to the API for each item
    fetch(endpoint)
      .then(response => response.json())
      .then(apiResponse => {
        // Assuming the response structure matches your API response
        const nombreFromApi = apiResponse.nombre;

        // Replace id_programa with the nombre obtained from the API
        item.id_programa = nombreFromApi;

        // Now you can use the updated item as needed
        // console.log(item);
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });
  });

  serverItems.value = data_items;
  console.log("data_items", data_items);
  console.log("serverItems.value", serverItems.value);
  console.log("data", data.items.data);
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
  console.log("editedItem.value", editedItem.value);
  if (editedIndex.value === -1) {
    // let res = await axios.post("http://segundas.unap.pe/api/convocatoria", {
      // let res = await axios.post("http://servicio_convocatorias.test/api/crear_convocatoria", {
    let res = await axios.post("http://segunda_especialidad_felix.test/api/entrevistastore", {
      id_convocatoria: editedItem.value.id_convocatoria,
      id_programa: editedItem.value.id_programa,
      id_postulante: editedItem.value.id_postulante,
      estado: editedItem.value.estado
    });
    serverItems.value.push({ estado: 1, ...res.data.data });

  } else {
    console.log("editedItem", editedItem.value);

    let res = await axios.patch(
      // "http://segundas.unap.pe/api/convocatoria/" + editedItem.value.id,
      // "http://servicio_convocatorias.test/api/actualizar_convocatoria/" + editedItem.value.id,
      "http://segunda_especialidad_felix.test/api/entrevista/" + editedItem.value.id,
      {
        id_convocatoria: editedItem.value.id_convocatoria,
        id_programa: editedItem.value.id_programa,
        id_postulante: editedItem.value.id_postulante,
        estado: editedItem.value.estado
      }
    );
    console.log(res);

    dialog.value = false;
    serverItems.value[editedIndex.value] = res.data.data;
    dialog.value = false;
    console.log("update record");
  }
};

const deleteItem = async (item) => {
  let res = await axios.delete(
    "http://segunda_especialidad_felix.test/api/entrevista/" + item.id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};
</script>
