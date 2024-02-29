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

      <v-col cols="12 pt-0">
        <v-card class="pb-1" flat>
          <v-card-title class="pt-0">
            <small class="text-body-2">Lugar de nacimiento</small>
          </v-card-title>
          <v-row>
            <v-col cols="12" :md="form.birthCountry === 'PER' || form.birthCountry === null ? 4 : 12">
              <v-combobox
                :items="countriesJson"
                v-model="form.birthCountry"
                label="País"
                item-title="name"
                item-value="id"
                :clearable="true"
                :rules="[isRequired]"
                :return-object="false"
              />
            </v-col>

            <UbigeoTwoForm
              v-if="
                postulant.DocumentType === '001' &&
                (form.birthCountry === 'PER' || form.birthCountry === null)
              "
              v-model="form.birthPlace"
            />
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12 pt-0">
        <v-card class="pb-1" flat>
          <v-card-title class="pt-0">
            <small class="text-body-2">Lugar de residencia</small>
          </v-card-title>
          <v-row>
            <v-col cols="12" :md="form.residenceCountry === 'PER' || form.residenceCountry === null ? 4 : 12">
              <v-combobox
                :items="countriesJson"
                v-model="form.residenceCountry"
                label="País"
                item-title="name"
                item-value="id"
                :clearable="true"
                :rules="[isRequired]"
                :return-object="false"
              />
            </v-col>
            <UbigeoTwoForm v-model="form.residencePlace" v-if="form.residenceCountry === 'PER' || form.residenceCountry === null" />
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-text-field
          label="Dirección del lugar de residencia"
          v-model="form.address"
          :rules="[isRequired]"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-text-field
          label="Teléfono"
          v-model="form.phoneNumber"
          :rules="[isRequired, isNumber]"
        />
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-text-field
          label="Correo electrónico"
          v-model="form.email"
          :rules="[isRequired, isEmail]"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="Año de graduación"
          v-model="form.graduationYear"
          :rules="[isRequired, isNumber]"
          maxLength="4"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-radio-group
          v-model="form.hasDisability"
          column
          label="¿Tiene discapacidad?"
        >
          <v-radio
            label="Si"
            :value="true"
            :rules="[isRequired]"
            class="text-body-2"
          >
          </v-radio>
          <v-radio
            label="No"
            :value="false"
            :rules="[isRequired]"
            class="text-body-2"
          >
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12" v-if="form.hasDisability === true">
        <v-combobox
          v-model="form.disabilityType"
          :items="disabilityItems"
          label="Tipo de discapacidad"
          itemTitle="title"
          itemValue="value"
          :clearable="false"
          :rules="[isRequired]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { PostulantPreInscription, Postulant } from "@/types/postulantTypes";

import { isRequired, isNumber, isEmail } from "@/helpers/validations";

import UbigeoTwoForm from "@/components/UbigeoTwoForm.vue";
import documentTypesJson from "@/assets/data/json/documentTypes.json";
import countriesJson from "@/assets/data/json/countries.json";

const emit = defineEmits(["onSuccess"]);

defineProps<{
  postulant: Postulant;
  form: PostulantPreInscription;
}>();

const documentTypesItems = documentTypesJson;

const disabilityItems = [
  { title: "Discapacidad Motriz", value: "1" },
  { title: "Discapacidad Visual", value: "2" },
  { title: "Visual y Esquema Corporal", value: "3" },
  { title: "Disminuidos Visuales", value: "4" },
  { title: "Discapacidad Auditiva", value: "5" },
  { title: "Autismo", value: "6" },
  { title: "Discapacidad Mental", value: "7" },
  { title: "Parálisis Cerebral", value: "8" },
  { title: "Discapacidad Intelectual", value: "9" },
  { title: "Sordoceguera", value: "10" },
  { title: "No Cuenta con Información", value: "11" },
  { title: "Otros", value: "12" },
  { title: "Sindrome de Asperger", value: "13" },
  { title: "Hemiplejia no Identificada", value: "14" },
  { title: "Estenosis Congénita de la Válvula Aortica", value: "15" },
  { title: "Multidiscapacidad", value: "16" },
  { title: "Discapacidad Fisica", value: "17" },
  { title: "Transtorno del Espectro Autista", value: "18" },
  { title: "T. por Déficit de Atención con Hiperactividad", value: "19" },
  { title: "T. Especifico del Aprendizaje", value: "20" },
  { title: "T. Mentales y del Comportamiento", value: "21" },
  { title: "Enfermedades Raras", value: "22" },
  { title: "Talla Baja", value: "23" },
  { title: "Talento", value: "24" },
  { title: "Superdotación", value: "25" },
];

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
