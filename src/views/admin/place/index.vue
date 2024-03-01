<template>
  <v-toolbar>
    <v-list-item title="Sedes" subtitle="Gestion de sedes" />
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
        {{ item.Status ? "Activo" : "Inactivo" }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="editItem(item)" class="mr-2" color="teal darken-1" density="compact" variant="tonal">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm @onConfirm="deleteItem(item)" :title="`Eliminar ${item.Id}`"
          :text="`¿Está seguro de que desea eliminar el tipo de documento ${item.Id}?`"></DialogConfirm>
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
            <v-text-field v-model="editedItem.Code" label="Code" />
            <v-text-field v-model="editedItem.Name" label="Name" />
            <v-text-field v-model="editedItem.Address" label="Address" />
            <v-text-field v-model="editedItem.Status" label="Status" />
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
import { ref } from "vue";
import DialogConfirm from "@/components/DialogConfirm.vue";

const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const dialog = ref(false);
const editedItem = ref({
  Id: "",
  Code: "",
  Name: "",
  Address: "",
  Status: "",
});
const defaultItem = ref({
  Id: "",
  Code: "",
  Name: "",
  Address: "",
  Status: "",
  // Status: true,
});
const editedIndex = ref(-1);

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  
  loading.value = true;

  // let res = await axios.post(`http://servicio_sedes.test/api/mostrar_todos_sede`, {
  let res = await axios.post('https://segundas.unap.pe/api/sedes', {
    page,
    itemsPerPage,
    sortBy,
    search,
  });

  let data = await res.data;

  headers.value = data.headers;
  totalItems.value = data.items.total;
  serverItems.value = data.items.data;

  console.log("page", page);
  console.log("itemsPerPage", itemsPerPage);
  console.log("sortBy", sortBy);

  loading.value = false;
};

const editItem = (item: typeof defaultItem) => {
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
    let res = await axios.post("http://servicio_sedes.test/api/crear_sede", {
      Code: editedItem.value.Code,
      Name: editedItem.value.Name,
      Address: editedItem.value.Address,
      Status: editedItem.value.Status
    });
    serverItems.value.push({ Status: 1, ...res.data.data });

    dialog.value = false;
  } else {
    console.log("editedItem", editedItem.value);

    let res = await axios.patch(
      "http://servicio_sedes.test/api/actualizar_sede/" + editedItem.value.Id,
      {
        Code: editedItem.value.Code,
        Name: editedItem.value.Name,
        Address: editedItem.value.Address,
        Status: editedItem.value.Status
      }
    );

    serverItems.value[editedIndex.value] = res.data.data;
    dialog.value = false;
    console.log("update record");
  }
};

const deleteItem = async (item: typeof defaultItem) => {
  await axios.delete(
    "http://servicio_sedes.test/api/eliminar_un_sede/" + item.Id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};
</script>
