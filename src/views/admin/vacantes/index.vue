<template>
  <v-toolbar>
    <v-list-item title="Vacantes" subtitle="Gestión de vacantes" />
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="newRecord">
      Nuevo
    </v-btn>
  </v-toolbar>
  <v-card-title>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
  </v-card-title>
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
    <!-- <template v-slot:[`item.Status`]="{ item }">
      <v-chip :color="item.estado ? 'blue' : 'error'" dark label small>
        {{ item.estado ? "Activo" : "Inactivo" }}
      </v-chip>
    </template> -->
    <template v-slot:item.actions="{ item }">
      <v-btn
        icon
        @click="editItem(item)"
        class="mr-2"
        color="green darken-4"
        density="compact"
        variant="tonal"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm
          @onConfirm="deleteItem(item)"
          :title="`Eliminar ${item.nombre}`"
          :text="`¿Está seguro de que desea eliminar el tipo de documento ${item.nombre}?`"
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
            <v-text-field
              v-model="editedItem.id_programa"
              label="id_programa"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.id_convocatoria"
              label="id_convocatoria"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.cantidad"
              label="cantidad"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" @click="close">Cancelar</v-btn>
        <v-btn variant="tonal" @click="saveRecord">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import DialogConfirm from "@/components/DialogConfirm.vue";
import { Ref, ref } from "vue";

interface Item {
  id: string;
  id_programa: string;
  id_convocatoria: string;
  cantidad: string;
}

// const listDocumentTypes = ref([]);
const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const dialog = ref(false);
const editedItem: Ref<Item | null> = ref(null);
const defaultItem = ref({
  id: "",
  id_programa: "",
  id_convocatoria: "",
  cantidad: "",
});
const editedIndex = ref(-1);

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  let res = await axios.post("http://servicio_vacantes.test/api/vacantes", {
    page,
    itemsPerPage,
    sortBy,
    search,
  });
  let data = await res.data;

  console.log("data", data);

  headers.value = data.headers;
  totalItems.value = data.total;
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
    // let res = await axios.post("http://segundas.unap.pe/api/convocatoria", {
    let res = await axios.post(
      "http://servicio_vacantes.test/api/vacantesstore",
      {
        id_programa: editedItem.value.id_programa,
        id_convocatoria: editedItem.value.id_convocatoria,
        cantidad: editedItem.value.cantidad,
      }
    );
    serverItems.value.push({ ...res.data.data });

    dialog.value = false;
  } else {
    console.log("editedItem", editedItem.value);

    let res = await axios.patch(
      // "http://segundas.unap.pe/api/convocatoria/" + editedItem.value.id,
      "http://servicio_vacantes.test/api/vacantes/" + editedItem.value.id,
      {
        id_programa: editedItem.value.id_programa,
        id_convocatoria: editedItem.value.id_convocatoria,
        cantidad: editedItem.value.cantidad,
      }
    );

    serverItems.value[editedIndex.value] = res.data.data;
    dialog.value = false;
    console.log("update record");
  }
};

const deleteItem = async (item) => {
  await axios.delete("http://servicio_vacantes.test/api/vacantes/" + item.id);

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};
</script>
