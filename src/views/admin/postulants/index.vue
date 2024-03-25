<template>
  <v-toolbar>
    <v-list-item subtitle="Gestion de postulantes" title="Postulantes" />
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-card rounded="0" elevation="0" class="bg-light border">
    <v-row class="pa-2">
      <v-col cols="4">
        <v-btn
          color="green"
          @click="exportExcel"
          prepend-icon="mdi-file-excel"
          class="mr-2"
        >
          Excel
        </v-btn>
      </v-col>
      <v-col cols="8">
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
    :items-per-page-options="[5, 10, 25, 50, 100, 1000, 10000]"
    @update:options="loadItems"
  >
    <template v-slot:[`item.AcademicProgramName`]="{ item }">
      <v-btn
        @click="(dialogChangeAcademicProgram = true), (editItem = item)"
        color="surface-variant"
        variant="flat"
        icon="mdi-swap-horizontal"
        size="small"
        class="mr-2"
        v-if="role === 'ADMIN'"
      ></v-btn>

      {{ item.AcademicProgramName }}
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="d-flex">
        <v-btn
          icon="mdi-plus"
          size="small"
          color="primary"
          variant="tonal"
          link
          :to="`/a/postulants/show/${item.Id}/generals`"
        >
        </v-btn>

        <v-btn
          color="info"
          variant="tonal"
          icon="mdi-pencil"
          size="small"
          class="mr-2"
          v-if="role === 'ADMIN'"
          link
          :to="`/a/postulants/edit/${item.Id}`"
        ></v-btn>
      </div>
    </template>
  </v-data-table-server>

  <v-dialog max-width="500" persistent v-model="dialogChangeAcademicProgram">
    <v-form @submit.prevent="changeAcademicProgram" ref="formRef">
      <v-card title="Actualizar programa académico" :loading="loadingForm">
        <v-card-text>
          <v-combobox
            v-model="formChangeAcademicProgram.programId"
            :items="academicsPrograms"
            item-title="Name"
            item-value="Id"
            label="Programa académico"
            :return-object="false"
            :rules="[
              () =>
                !!formChangeAcademicProgram.programId ||
                'Seleccione un programa académico',
            ]"
            outlined
            dense
          ></v-combobox>
        </v-card-text>

        <v-card-actions>
          <v-btn
            variant="tonal"
            text="Cancelar"
            color="red"
            @click="dialogChangeAcademicProgram = false"
            class="px-4"
          ></v-btn>
          <v-spacer></v-spacer>

          <v-btn type="submit" text="Guardar"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import ExportJsonExcel from "js-export-excel";

const loading = ref(false);
const loadingForm = ref(false);

const headers = ref([]);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const role = ref(null);
const academicsPrograms = ref([]);

const dialogChangeAcademicProgram = ref(false);
const formRef = ref(null);

const exportExcel = async () => {
  var option: any = {};
  option.fileName = "Postulantes";

  let data = serverItems.value.map((item) => {
    return {
      Nombres: item.FullName,
      DNI: item.DocumentType + "-" + item.DocumentNumber,
      "F. Nacimiento": item.BirthDate,
      Género: item.Gender,
      Celular: item.PhoneNumber,
      Correo: item.Email,
      "Programa académico": item.AcademicProgramName,
    };
  });

  option.datas = [
    {
      sheetData: data,
      sheetHeader: [
        "Nombres",
        "DNI",
        "F. Nacimiento",
        "Género",
        "Celular",
        "Correo",
        "Programa académico",
      ],
      sheetFilter: [
        "Nombres",
        "DNI",
        "F. Nacimiento",
        "Género",
        "Celular",
        "Correo",
        "Programa académico",
      ],
      sheetName: "Postulantes",
    },
  ];

  var toExcel = new ExportJsonExcel(option);

  toExcel.saveExcel();

  return;
};

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;
  //si search es menor de 3 caracteres no se realiza la busqueda
  search = search === null ? "" : search;
  if (search.length < 3 && search.length > 0) {
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
  let _items_ = [];

  //agrupalos los que tengan el mismo id  y a una se le agrega el email y el phone number
  for (let i = 0; i < data.items.data.length; i++) {
    let item = data.items.data[i];
    let _item_ = _items_.find((x) => x.Id === item.Id);

    if (_item_) {
      if (item.PhoneNumber) {
        _item_.PhoneNumber = item.PhoneNumber;
      } else {
        _item_.Email = item.Email;
      }
    } else {
      _items_.push(item);
    }
  }

 

  headers.value = data.headers;
  totalItems.value = data.items.total;
  serverItems.value = _items_;
  role.value = data.role;
  academicsPrograms.value = data.academicsPrograms;

  loading.value = false;
};

const formChangeAcademicProgram = ref({
  programId: null,
  postulantId: null,
});

const editItem = ref(null);

const changeAcademicProgram = async () => {
  let item = editItem.value;
  let { valid } = await formRef.value.validate();

  if (!valid) return;
  loadingForm.value = true;
  dialogChangeAcademicProgram.value = true;

  formChangeAcademicProgram.value.postulantId = item.Id;
  let res = await axios.post(
    `https://data.segundas.unap.edu.pe/api/update-academic-program`,
    formChangeAcademicProgram.value,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log(res.data);
  if (res.data) {
    dialogChangeAcademicProgram.value = false;
    formChangeAcademicProgram.value.programId = null;
    formChangeAcademicProgram.value.postulantId = null;

    await loadItems({ page: 1, itemsPerPage: 10, sortBy: [], search: "" });
  }

  loadingForm.value = false;
};
</script>
