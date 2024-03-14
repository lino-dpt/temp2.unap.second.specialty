<template>
  <v-toolbar dense>
    <v-toolbar-title>
      <small>
        {{ data?.FullName }}
      </small>
    </v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card rounded="0" elevation="0">
          <v-card-title class="d-flex justify-space-between">
            Datos Generales
            <v-btn
              prepend-icon="mdi-pencil"
              variant="tonal"
              color="primary"
              @click="(dialogGenerals = true), setFormGenerals()"
            >
              Editar
            </v-btn>
          </v-card-title>
          <v-list-item>
            <v-list-item-subtitle>Nombre Completo</v-list-item-subtitle>
            <v-list-item-title>
              {{ data?.FullName }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-subtitle>Fecha de nacimiento</v-list-item-subtitle>
            <v-list-item-title>
              {{ data?.BirthDate }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-subtitle>Documento de identidad</v-list-item-subtitle>
            <v-list-item-title>
              {{ data?.DocumentType === "001" ? "DNI" : "CE" }} -
              {{ data?.DocumentNumber }}
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card title="Datos del Programa" rounded="0" elevation="0">
          <v-list-item>
            <v-list-item-subtitle>Programa academico</v-list-item-subtitle>
            <v-list-item-title>
              {{ data?.AcademicProgramName }}
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card title="Medios de contacto" rounded="0" elevation="0">
          <v-list-item v-for="item in data?.media_contacts" :key="item.id">
            <v-list-item-subtitle>
              {{
                item.Type === "001" ? "Correo Personal" : "Telefono Personal"
              }}
            </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.Value }}
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card title="Ubigeos" rounded="0" elevation="0">
          <v-list-item v-for="item in data?.places" :key="item.id">
            <v-list-item-subtitle>
              {{
                item.Type === "001"
                  ? "Lugar de nacimiento"
                  : "Lugar de residencia"
              }}
            </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.Ubigeo }} -
              {{
                `${item.UbigeoData.departamento}, ${item.UbigeoData.provincia}, ${item.UbigeoData.distrito}`
              }}
            </v-list-item-title>
            <v-list-item-title v-if="item.Address">
              <v-icon>mdi-map-marker</v-icon>
              {{ item.Address }}
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialogGenerals" width="auto">
    <v-form ref="formGenerals" @submit.prevent="submitGenerals">
      <v-card
        max-width="600"
        prepend-icon="mdi-pencil"
        title="Editar datos generales"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="fromGeneral.name"
                label="Nombre completo"
                :rules="[(v) => !!v || 'El nombre es requerido']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="fromGeneral.fatherSurname"
                label="Apellido paterno"
                :rules="[(v) => !!v || 'El nombre es requerido']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="fromGeneral.motherSurname"
                label="Apellido materno"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="fromGeneral.marriedSurname"
                label="Apellido de casada"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="fromGeneral.birthDate"
                label="Fecha de nacimiento"
                :rules="[(v) => !!v || 'El nombre es requerido']"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :disabled="true"
                v-model="fromGeneral.documentType"
                :items="[
                  { title: 'DNI', value: '001' },
                  { title: 'CE', value: '004' },
                ]"
                label="Tipo de documento"
                :rules="[(v) => !!v || 'El nombre es requerido']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :disabled="true"
                v-model="fromGeneral.documentNumber"
                label="Número de documento"
                :rules="[(v) => !!v || 'El nombre es requerido']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <template v-slot:actions>
          <v-btn
            color="red"
            variant="tonal"
            class="ms-auto px-4"
            text="cancelar"
            @click="dialogGenerals = false"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn type="submit" class="ms-auto px-4" text="guardar"></v-btn>
        </template>
      </v-card>
    </v-form>
  </v-dialog>
  
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const emit = defineEmits(["onUpdate"]);

const props = defineProps({
  data: Object,
});

const formGenerals = ref(null);

const dialogGenerals = ref(false);

const fromGeneral = ref({
  id: props.data?.Id,
  name: null,
  fatherSurname: null,
  motherSurname: null,
  marriedSurname: null,
  birthDate: null,
  documentType: null,
  documentNumber: null,
});

const setFormGenerals = async () => {
  fromGeneral.value = {
    id: props.data?.Id,
    name: props.data?.Name,
    fatherSurname: props.data?.FatherSurname,
    motherSurname: props.data?.MotherSurname,
    marriedSurname: props.data?.MarriedSurname,
    birthDate: props.data?.BirthDate,
    documentType: props.data?.DocumentType,
    documentNumber: props.data?.DocumentNumber,
  };
};

const submitGenerals = async () => {
  console.log(fromGeneral.value);

  let { valid } = await formGenerals.value.validate();
  if (!valid) return;

  console.log(fromGeneral.value);

  let res = await axios.post(
    `https://data.segundas.unap.edu.pe/api/postulants/update-generals`,
    fromGeneral.value,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (res.data === true) {
    dialogGenerals.value = false;
    emit("onUpdate", true);
  } else {
    alert(res.data.details);
  }


  //   await updatePostulantGenerals(fromGeneral.value);
};
</script>
