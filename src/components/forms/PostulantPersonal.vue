<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card width="700" class="mx-auto">
      <v-container>
        <v-row>
          <!-- <v-col cols="12" md="6">
            <v-select
              v-model="form.typeDocument"
              :items="documentTypesItems"
              label="Tipo de documento"
              itemTitle="shortName"
              itemValue="id"
              :clearable="false"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Número de documento"
              v-model="form.documentNumber"
            />
          </v-col> -->
          <v-col cols="12" md="12">
            <v-text-field label="Nombres" v-model="form.name" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Apellido paterno"
              v-model="form.fatherSurname"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Apellido materno"
              v-model="form.motherSurname"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="Fecha de nacimiento"
              v-model="form.birthDate"
              type="date"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.gender"
              :items="genderItems"
              label="Tipo de documento"
              itemTitle="text"
              itemValue="value"
              :clearable="false"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.maritalStatus"
              :items="marriedStatusItems"
              label="Estado civil"
              itemTitle="text"
              itemValue="value"
              :clearable="false"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="Apellido de casada"
              v-model="form.marriedSurname"
            />
          </v-col>

          <v-col cols="12 pt-0">
            <v-card class="pb-1" flat>
              <v-card-title class="pt-0">
                <small class="text-body-2">Lugar de nacimiento</small>
              </v-card-title>
              <v-row>
                <UbigeoTwoForm v-model="form.birthPlace" />
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12 pt-0">
            <v-card class="pb-1" flat>
              <v-card-title class="pt-0">
                <small class="text-body-2">Lugar de residencia</small>
              </v-card-title>
              <v-row>
                <UbigeoTwoForm v-model="form.residencePlace" />
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Teléfono"
              v-model="form.phoneNumber"
              type="number"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="coreo electrónico"
              v-model="form.email"
              type="number"
            />
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              label="Dirección"
              v-model="form.address"
              type="number"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              label="Año de graduación"
              v-model="form.graduationYear"
              type="number"
            />
          </v-col>

          <!-- <v-col cols="12" md="6">
            <v-checkbox
              v-model="form.isDisability"
              label="¿Tiene discapacidad?"
            />
          </v-col>
          <v-col cols="12" md="12" v-if="form.isDisability">
            <v-text-field
              label="Tipo de discapacidad"
              v-model="form.disabilityType"
            />
          </v-col> -->
          <!-- <v-col cols="12" md="12">
            <v-textarea
              label="Observaciones"
              v-model="form.observations"
              rows="3"
            />
          </v-col> -->
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" variant="flat" block>Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

import UbigeoTwoForm from "@/components/UbigeoTwoForm.vue";
import documentTypesJson from "@/assets/data/json/documentTypes.json";

const emit = defineEmits(["onSuccess"]);

const documentTypesItems = documentTypesJson;

const genderItems = [
  { text: "Masculino", value: "1" },
  { text: "Femenino", value: "2" },
];

const marriedStatusItems = [
  { text: "Soltero", value: "1" },
  { text: "Casado", value: "2" },
  { text: "Divorciado", value: "3" },
  { text: "Viudo", value: "4" },
];

const form = ref({
  typeDocument: "001",
  documentNumber: "",
  name: "",
  motherSurname: "",
  fatherSurname: "",
  marriedSurname: "",
  gender: "",
  birthDate: "",
  birthPlace: "",
  residencePlace: "",
  graduationYear: "",

  phoneNumber: "",
  email: "",
  address: "",

  maritalStatus: "",
  observations: "",
  isDisability: false,
  disabilityType: "",
});

const submit = async () => {
  console.log(form.value);

  emit("onSuccess");
  return;

  // let res = await axios.post(
  //   "http://unap.specialty2.postulants.test/api/v1/postulants/",
  //   form.value
  // );

  // if (res.status === 'success') {
  //   emit("onSuccess");
  // }
  // console.log(res);
};

const init = async () => {
 
};
init();
</script>
<style lang="scss"></style>
