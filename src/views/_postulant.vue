<template>
  <div class="h-min-screen">
    <template v-if="loading">
      <div class="h-100 w-100 d-flex justify-center align-center">
        <div class="w-25 mx-auto">
          <v-progress-linear indeterminate color="primary" />
        </div>
      </div>
    </template>
    <template v-else-if="hasPreinscription && !loading">
      <v-card max-width="300px" class="mx-auto my-10">
        <v-container>
          <h4>Ya realizaste tu preinscripción</h4>
          <v-divider class="my-4"></v-divider>
          <a
            class="v-btn v-theme--light bg-primary v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-flat w-100"
            :href="`https://segundas.unap.pe/api/get-solicitud/${Preinscription_?.CallId}-${Preinscription_?.AcademicProgramId}-${Preinscription_?.PostulantId}`"
          >
            Descargar solicitud
          </a>
        </v-container>
      </v-card>
    </template>
    <template v-else>
      <v-form ref="formRef" @submit.prevent="submit">
        <v-card max-width="850px" class="mx-auto my-10">
          <PostulantPersonal :postulant="_postulant" :form="form" />
          <PostulantSpecialty :form="form" />
          <PostulantFiles :form="form" />
          <PostulantPhoto :form="form" />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              block
              variant="flat"
              @click="submit"
              :loading="loadingSubmit"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import PostulantPersonal from "@/components/forms/PostulantPersonal.vue";
import PostulantSpecialty from "@/components/forms/PostulantSpecialty.vue";
import PostulantPhoto from "@/components/forms/PostulantPhoto.vue";
import PostulantFiles from "@/components/forms/PostulantFiles.vue";

import { PostulantPreInscription, Postulant } from "@/types/postulantTypes";

import PostulantService from "@/services/PostulantService";
import FileService from "@/services/FileService";
import RegistrationService from "@/services/RegistrationService";

import { useRoute, useRouter } from "vue-router";

const postulantService = new PostulantService();
const fileService = new FileService();
const registrationService = new RegistrationService();

const route = useRoute();
const router = useRouter();

const loading = ref(true);

const loadingSubmit = ref(false);

const _postulant: Ref<Postulant> = ref(null);
const hasPreinscription = ref(false);

const formDefaults: PostulantPreInscription = {
  postulantId: null,
  name: "",
  motherSurname: "",
  fatherSurname: "",
  marriedSurname: "",
  gender: "",
  birthDate: "",
  birthCountry: "PER",
  birthPlace: null,
  residenceCountry: "PER",
  residencePlace: null,
  graduationYear: "",
  phoneNumber: "",
  email: "",
  address: "",
  maritalStatus: "",
  specialty: null,
  fileDocument: null,
  photoAvatar: null,

  hasDisability: false,
  disabilityType: null,
};

const form: Ref<PostulantPreInscription> = ref(formDefaults);

const formRef = ref(null);
const submit = async () => {
  return;
  loadingSubmit.value = true;

  try {
    const { valid } = await formRef.value.validate();
    if (!valid) return;

    //validar que tenga documentos
    if (!form.value.fileDocument) {
      alert("Debe subir los documentos");
      loadingSubmit.value = false;
      return;
    }

    //validar que tenga foto de postulante
    if (!form.value.photoAvatar) {
      alert("Debe subir una foto de postulante");
      loadingSubmit.value = false;
      return;
    }

    form.value.postulantId = route.params.postulant as string;
    let res = await postulantService.storePostulant(form.value);

    if (res.error) {
      alert(res.error);
      loadingSubmit.value = false;
      return;
    }
    form.value.postulantId = res;

    await fileService.storePreinscriptionFiles(form.value);
    Preinscription_.value = await registrationService.storeRegistration(
      form.value
    );

    if (Object.keys(Preinscription_.value).length > 0) {
      hasPreinscription.value = true;
    }
    loadingSubmit.value = false;
    return;
  } catch (error) {
    alert("Ocurrio un error");
    loadingSubmit.value = false;
  } finally {
    loadingSubmit.value = false;
  }
};

interface Preinscription {
  AcademicProgramId: number;
  PostulantId: number;
  CallId: number;
}
const Preinscription_: Ref<Preinscription | null> = ref(null);

const init = async () => {
  loading.value = true;
  let hash = route.params.postulant as string;
  let res = await postulantService.searchPostulantById(hash);
  if (res === "The payload is invalid.") {
    router.push("/p/convocatoria-2024/preinscripcion/");
    return;
  }
  _postulant.value = res;

  if (_postulant.value) {
    Preinscription_.value =
      await registrationService.searchRegistrationByPostulantId(
        _postulant.value.HashId
      );

    //que no sea un objeto vacio
    if (Object.keys(Preinscription_.value).length > 0) {
      hasPreinscription.value = true;
    }
  }

  loading.value = false;
};

init();
</script>
