<template>
  <v-form ref="formRef" class="w-full" @submit.prevent="submit">
    <v-card width="450" class="mx-auto" rounded="0" elevation="0">
      <v-container>
        <v-row class="mt-2">
          <v-col cols="12" md="4" class="py-1">
            <v-select
              v-model="form.documentType"
              :items="documentTypes"
              label="Tipo de documento"
              item-title="shortName"
              item-value="id"
              :rules="[isRequired]"
              density="compact"
            />
          </v-col>

          <v-col cols="12" md="8" class="py-1">
            <v-text-field
              v-model="form.documentNumber"
              label="N° de documento"
              required
              :rules="[form.documentType === '001' ? isDni : isCE]"
            />
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.paymentId"
              label="Serie"
              :rules="[isRequired, isNumber]"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.paymentDate"
              label="Fecha"
              type="date"
              :rules="[isRequired]"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.paymentAmount"
              label="Monto"
              :rules="[isRequired]"
            />
          </v-col>

          <v-col cols="12" md="12">
            <v-toolbar density="compact">
              <v-toolbar-title>
                <small> Voucher </small>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                prepend-icon="mdi-information-variant-circle-outline"
                density="compact"
                @click="dialogExample = true"
              >
                <small> Ejemplo</small>
              </v-btn>
            </v-toolbar>

            <v-card variant="tonal" rounded="0">
              <CropCompressImage
                :aspect-ratio="1"
                @onCropper="
                  (previewImg = $event.blob),
                    (form.paymentVoucher = $event.file)
                "
              />
              <v-img
                :aspect-ratio="16 / 9"
                v-if="previewImg"
                :src="previewImg"
                height="250"
                class="border"
              />
            </v-card>
            <small v-if="errorValidationImage" class="text-error ms-2">
              {{ errorValidationImage }}
            </small>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" variant="flat" block> Guardar </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>

  <v-dialog v-model="dialogExample">
    <v-card width="300px" class="mx-auto">
      <v-img
        src="http://www.osce.gob.pe/consultasenlinea/rnp/images/ClaveBANBIF.gif"
      />
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { isDni, isCE, isRequired, isNumber } from "@/helpers/validations";
import CropCompressImage from "@/components/CropCompressImage.vue";

import PostulantService from "@/services/PostulantService";

const postulantService = new PostulantService();

const emit = defineEmits(["onSuccess"]);
const previewImg = ref(null);
const dialogExample = ref(false);

const documentTypes = [
  {
    id: "001",
    name: "DOCUMENTO NACIONAL DE IDENTIDAD",
    shortName: "DNI",
  },
  {
    id: "004",
    name: "CARNET/CARNÉ DE EXTRANJERÍA",
    shortName: "CE",
  },
];

const formRef = ref(null);

const form = ref({
  documentType: "001",
  documentNumber: "",

  paymentId: "",
  paymentDate: "",
  paymentAmount: "",
  paymentVoucher: null,
});

const errorValidationImage = ref("");

const validateImage = (file: File) => {
  errorValidationImage.value = "";
  if (!file) return "El archivo es requerido";
  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/svg",
    "image/webp",
  ];
  //validar el tipo
  if (!validImageTypes.includes(file.type)) {
    return "Solo se permiten archivos de imagen (jpeg, png)";
  }
  //validar el tamaño
  if (file.size > 2000000) {
    return "El tamaño de la imagen no debe superar los 2MB";
  }

  return "";
};

const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (form.value.paymentVoucher === null) {
    errorValidationImage.value = "El archivo es requerido";
    return;
  }
  errorValidationImage.value = validateImage(form.value.paymentVoucher);
  if (!valid) return;

  let res = postulantService.initzializePreinscription(form.value);

  console.log(res);


  //  emit("onSuccess");
  console.log("submit");
};
</script>
