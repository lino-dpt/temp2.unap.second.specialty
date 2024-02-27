<template>
  <v-toolbar flat density="compact" title="Información personal" />
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          :items="documentTypesItems"
          :modelValue="postulant?.DocumentType"
          label="Tipo de documento"
          itemTitle="shortName"
          itemValue="id"
          :clearable="false"
          readonly
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Número de documento"
          :modelValue="postulant?.DocumentNumber"
          readonly
          :clearable="false"
        />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
          label="Nombres"
          v-model="form.name"
          :rules="[isRequired]"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Apellido paterno"
          v-model="form.fatherSurname"
          :rules="[isRequired]"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Apellido materno" v-model="form.motherSurname" />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="Fecha de nacimiento"
          v-model="form.birthDate"
          type="date"
          :rules="[isRequired]"
        />
      </v-col>

      <v-col cols="6" md="4">
        <v-select
          v-model="form.gender"
          :items="genderItems"
          label="Género"
          itemTitle="text"
          itemValue="value"
          :clearable="false"
          :rules="[isRequired]"
        />
      </v-col>
      <v-col cols="6" md="4">
        <v-select
          v-model="form.maritalStatus"
          :items="marriedStatusItems"
          label="Estado civil"
          itemTitle="text"
          itemValue="value"
          :clearable="false"
          :rules="[isRequired]"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
        v-if="
          form.gender === '2' &&
          (form.maritalStatus === '2' ||
            form.maritalStatus === '3' ||
            form.maritalStatus === '4')
        "
      >
        <v-text-field
          label="Apellido de casada"
          v-model="form.marriedSurname"
        />
      </v-col>

      <v-col cols="12 pt-0" v-if="postulant.DocumentType === '001'">
        <v-card class="pb-1" flat>
          <v-card-title class="pt-0">
            <small class="text-body-2">Lugar de nacimiento</small>
          </v-card-title>
          <v-row>
            <UbigeoForm v-model="form.birthPlace" />
          </v-row>
        </v-card>
      </v-col>

      <!-- <v-col cols="12 pt-0" v-else>
        <v-card class="pb-1" flat>
          <v-card-title class="pt-0">
            <small class="text-body-2">País de nacimiento</small>
          </v-card-title>
          <v-row>
            <v-col cols="12">
              <v-select
                :items="countriesItems"
                v-model="form.birthCountry"
                label="País"
                itemTitle="name"
                itemValue="id"
                :clearable="false"
                :rules="[isRequired]"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col> -->

      <v-col cols="12 pt-0">
        <v-card class="pb-1" flat>
          <v-card-title class="pt-0">
            <small class="text-body-2">Lugar de residencia</small>
          </v-card-title>
          <v-row>
            <UbigeoForm v-model="form.residencePlace" />
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Teléfono"
          v-model="form.phoneNumber"
          :rules="[isRequired, isNumber]"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="Correo electrónico"
          v-model="form.email"
          :rules="[isRequired, isEmail]"
        />
      </v-col>

      <v-col cols="12" md="12">
        <v-text-field
          label="Dirección de residencia"
          v-model="form.address"
          :rules="[isRequired]"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="Año de graduación"
          v-model="form.graduationYear"
          :rules="[isRequired, isNumber]"
          maxLength="4"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { PostulantPreInscription, Postulant } from "@/types/postulantTypes";

import { isRequired, isNumber, isEmail } from "@/helpers/validations";

import UbigeoForm from "@/components/UbigeoForm.vue";
import documentTypesJson from "@/assets/data/json/documentTypes.json";

const emit = defineEmits(["onSuccess"]);

defineProps<{
  postulant: Postulant;
  form: PostulantPreInscription;
}>();

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

const init = async () => {};
init();
</script>
<style lang="scss"></style>
