<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card max-width="450" class="mx-auto my-5" rounded="lg" elevation="2">
      <v-container>
        <v-row class="mt-2">
          <v-col cols="12" md="4">
            <v-select
              v-model="form.documentType"
              :items="documentTypes"
              label="Tipo de documento"
              item-title="shortName"
              item-value="id"
              :rules="[isRequired]"
              density="compact"
              @update:model-value="searchPreinscription(form.documentNumber)"
            />
          </v-col>

          <v-col cols="12" md="8" class="pb-0">
            <v-text-field
              v-model="form.documentNumber"
              label="N° de documento"
              required
              :rules="[form.documentType === '001' ? isDni : isCE]"
              @update:model-value="searchPreinscription"
              autocomplete="off"
              :counter="form.documentType === '001' ? 8 : 12"
              :maxLength="form.documentType === '001' ? 8 : 12"
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
              :rules="[isRequired, isDecimal]"
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
            <v-btn type="submit" variant="flat" block :loading="loading">
              Iniciar preinscripción
            </v-btn>
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

  <!-- Se muestra el modal si el ya inicio la preinscripcion -->
  <v-dialog v-model="dialogContinue">
    <v-card width="300px" class="mx-auto">
      <v-card-title class="bg-primary">
        <small>Ya inicio la preinscripcion</small>
      </v-card-title>
      <v-container>
        <p>Ya inicio la preinscripcion, desea continuar?</p>
      </v-container>
      <v-card-actions>
        <v-btn color="red" @click="dialogContinue = false">No</v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" @click="continuePreinscription">Si</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import CropCompressImage from "@/components/CropCompressImage.vue";
import {
  isDni,
  isCE,
  isRequired,
  isNumber,
  isDecimal,
} from "@/helpers/validations";
import { PostulantInitPreInscription } from "@/types/postulantTypes";
import PostulantService from "@/services/PostulantService";
import PaymentService from "@/services/PaymentService";
import FileService from "@/services/FileService";

const router = useRouter();

const loading = ref(false);

const postulantService = new PostulantService();
const paymentService = new PaymentService();
const fileService = new FileService();

const emit = defineEmits(["onSuccess"]);
const previewImg = ref(null);
const dialogExample = ref(false);

const dialogContinue = ref(false);

const idHash: Ref<string> = ref("");

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

const form: Ref<PostulantInitPreInscription> = ref({
  documentType: "001",
  documentNumber: "",
  paymentId: "",
  paymentDate: "",
  paymentAmount: "",
  paymentVoucher: null,
  postulantId: null,
  fileId: null,
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

const searchPreinscription = async (e: string) => {
  idHash.value = "";
  if (e.length === 8 && form.value.documentType === "001") {
    let preinscription = await postulantService.searchPostulantByDocument(
      form.value.documentType,
      e
    );
    if (preinscription) {
      idHash.value = preinscription;
      dialogContinue.value = true;
    }
  } else if (e.length === 12 && form.value.documentType === "004") {
    let preinscription = await postulantService.searchPostulantByDocument(
      form.value.documentType,
      e
    );
    if (preinscription) {
      idHash.value = preinscription;
      dialogContinue.value = true;
    }
  }
};

const continuePreinscription = () => {
  router.push(`/convocatoria-2024/preinscripcion/${idHash.value}`);
};

const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (form.value.paymentVoucher === null) {
    errorValidationImage.value = "El archivo es requerido";
    return;
  }
  errorValidationImage.value = validateImage(form.value.paymentVoucher);
  if (!valid) return;

  loading.value = true;
  try {
    let postulant = await postulantService.startPreinscription(form.value);
    if (postulant.error) {
      console.log(postulant);
      loading.value = false;
      return;
    }
    form.value.postulantId = postulant.id;

    let file = await fileService.store(form.value);
    if (file.error) {
      console.log(file);
      loading.value = false;
      return;
    }
    form.value.fileId = file.FileId;

    let payment = await paymentService.updateImageUrl(
      postulant.paymentId,
      file.Path
    );

    if (payment.error) {
      console.log(payment);
      rollBack(postulant.id, payment.paymentId, file.Id);
      loading.value = false;
      return;
    }

    console.log(payment);
    if (payment !== true) {
      loading.value = false;
      rollBack(postulant.id, payment.paymentId, file.Id);
    } else {
      loading.value = false;
      router.push(
        `/convocatoria-2024/preinscripcion/${form.value.postulantId}`
      );
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};

const rollBack = (postulant: string, payment: string, file: string) => {
  //eliminar al postulante
  //eliminar el archivo
  //eliminar el pago
  console.log("rollback", postulant, payment, file);
  console.log("rollback");
};
</script>
