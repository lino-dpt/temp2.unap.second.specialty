<template>
  <v-toolbar>
    <v-list-item
      subtitle="Gestion de tipos de documentos"
      title="Tipo de documentos"
    />
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="newRecord">
      Nuevo
    </v-btn>
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
        icon
        @click="editItem(item)"
        class="mr-2"
        color="teal darken-1"
        density="compact"
        variant="tonal"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm
          @onConfirm="deleteItem(item)"
          :title="`Eliminar ${item.Name}`"
          :text="`¿Está seguro de que desea eliminar el tipo de documento ${item.Name}?`"
        ></DialogConfirm>
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
            <v-text-field v-model="editedItem.Name" label="Nombre" />
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
  Name: "",
  Status: true,
});
const editedIndex = ref(-1);

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  let res = await axios.post(`http://127.0.0.1:8000/api/document-types/data`, {
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
    let res = await axios.post("http://127.0.0.1:8000/api/document-types/", {
      Name: editedItem.value.Name,
      Status: editedItem.value.Status,
    });
    serverItems.value.push({ Status: 1, ...res.data.documentType });

    dialog.value = false;
  } else {
    console.log("editedItem", editedItem.value);

    let res = await axios.put(
      "http://127.0.0.1:8000/api/document-types/" + editedItem.value.Id,
      {
        Name: editedItem.value.Name,
        Status: editedItem.value.Status,
      }
    );

    serverItems.value[editedIndex.value] = res.data.documentType;
    dialog.value = false;
    console.log("update record");
  }
};

const deleteItem = async (item) => {
  let res = await axios.delete(
    "http://127.0.0.1:8000/api/document-types/" + item.Id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};
</script>
