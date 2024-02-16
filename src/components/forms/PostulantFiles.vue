<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card class="mx-auto" width="700">
      <v-container>
        <v-row class="mt-4">
          <v-col cols="12">
            <span class="text-caption text-uppercase">
              Titulo universitario ó superior pedagogico
            </span>
            <v-file-input label="Titulo" show-size counter></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" variant="flat" block>Guardar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const emit = defineEmits(["onSuccess"]);

const form = ref([
  {
    title: "solcitud de inscripcion",
    file: null,
    accept: "application/pdf",
    hitAccept: "Seleccione un archivo PDF",
  },
  {
    title: "titulo universitario o superior pedagogico",
    file: null,
    accept: "application/pdf",
    hitAccept: "Seleccione un archivo PDF",
  },
  {
    title: "dni",
    file: null,
    accept: "image/*, application/pdf",
    hitAccept: "Seleccione un archivo PDF o imagen",
  },
  {
    title: "declaracion jurada de no tener antecedentes penales",
    file: null,
    accept: "application/pdf",
    hitAccept: "Seleccione un archivo PDF",
  },
  {
    title: "carta de compromiso",
    file: null,
    accept: "application/pdf",
    hitAccept: "Seleccione un archivo PDF",
  },
  {
    title: "voucher de pago",
    file: null,
    accept: "image/*, application/pdf",
    hitAccept: "Seleccione un archivo PDF o imagen",
  },
]);

const submit = async () => {
  console.log(form.value);

  emit("onSuccess");

  return;

  //convertir a formdata con
  const formData = new FormData();

  form.value.forEach((item) => {
    formData.append(item.title, item.file);
  });

  console.log(formData);

  let res = await axios.post(
    "http://unap.specialty2.files.test/api/v1/files/",
    formData
  );
};
//C:/laragon/www/unap.specialty2.files/
</script>
