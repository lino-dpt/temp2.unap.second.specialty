<template>
  <v-toolbar>
    <v-list-item title="Convocatorias" subtitle="Gestión de convocatorias" />
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
    <template v-slot:[`item.Status`]="{ item }">
      <v-chip :color="item.estado ? 'blue' : 'error'" dark label small>
        {{ item.estado ? "Activo" : "Inactivo" }}
      </v-chip>
    </template>
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
              v-model="editedItem.nombre"
              label="nombre"
            ></v-text-field>
            <v-text-field v-model="editedItem.anio" label="anio"></v-text-field>
            <v-text-field
              v-model="editedItem.estado"
              label="estado"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.ciclo"
              label="ciclo"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.ciclo_oti"
              label="ciclo_oti"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.fecha_inicio"
              label="fecha_inicio"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.fecha_fin"
              label="fecha_fin"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.observacion"
              label="observacion"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.modalidad_estudio"
              label="modalidad_estudio"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.id_sede"
              label="id_sede"
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

// const listDocumentTypes = ref([]);
const loading = ref(false);

interface IItem {
  id: string;
  nombre: string;
  anio: string;
  estado: string;
  ciclo: string;
  ciclo_oti: string;
  fecha_inicio: string;
  fecha_fin: string;
  observacion: string;
  modalidad_estudio: string;
  id_sede: string;
}

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const dialog = ref(false);
const editedItem: Ref<IItem | null> = ref(null);
const defaultItem = ref({
  id: "",
  nombre: "",
  anio: "",
  estado: "",
  ciclo: "",
  ciclo_oti: "",
  fecha_inicio: "",
  fecha_fin: "",
  observacion: "",
  modalidad_estudio: "",
  id_sede: "",
});
const editedIndex = ref(-1);

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  // let res = await axios.post("http://segundas.unap.pe/api/convocatorias", {
  // let res = await axios.post("http://servicio_convocatorias.test/api/mostrar_todos_convocatoria", {
  let res = await axios.post(
    "http://174.138.178.194:8081/api/mostrar_todos_convocatoria",
    {
      page,
      itemsPerPage,
      sortBy,
      search,
    }
  );
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
    let res = await axios.post("http://segundas.unap.pe/api/convocatoria", {
      // let res = await axios.post("http://servicio_convocatorias.test/api/crear_convocatoria", {
      nombre: editedItem.value.nombre,
      anio: editedItem.value.anio,
      estado: editedItem.value.estado,
      ciclo: editedItem.value.ciclo,
      ciclo_oti: editedItem.value.ciclo_oti,
      fecha_inicio: editedItem.value.fecha_inicio,
      fecha_fin: editedItem.value.fecha_fin,
      observacion: editedItem.value.observacion,
      modalidad_estudio: editedItem.value.modalidad_estudio,
      id_sede: editedItem.value.id_sede,
    });
    serverItems.value.push({ estado: 1, ...res.data.data });
  } else {
    console.log("editedItem", editedItem.value);

    let res = await axios.patch(
      "http://segundas.unap.pe/api/convocatoria/" + editedItem.value.id,
      // "http://servicio_convocatorias.test/api/actualizar_convocatoria/" + editedItem.value.id,
      {
        nombre: editedItem.value.nombre,
        anio: editedItem.value.anio,
        estado: editedItem.value.estado,
        ciclo: editedItem.value.ciclo,
        ciclo_oti: editedItem.value.ciclo_oti,
        fecha_inicio: editedItem.value.fecha_inicio,
        fecha_fin: editedItem.value.fecha_fin,
        observacion: editedItem.value.observacion,
        modalidad_estudio: editedItem.value.modalidad_estudio,
        id_sede: editedItem.value.id_sede,
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
   await axios.delete(
    "http://servicio_convocatorias.test/api/eliminar_un_convocatoria/" + item.id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};
</script>
