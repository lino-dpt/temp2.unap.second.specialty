<template>
  <template v-if="loading">
    <div class="h-100 w-100 d-flex justify-center align-center">
      <div class="w-25 mx-auto">
        <v-progress-linear indeterminate color="primary" />
      </div>
    </div>
  </template>
  <template v-else-if="hasPreinscription && !loading">
    <v-card max-width="300px" class="mx-auto">
      <v-container>
        <h4>Ya realizaste tu preinscripción</h4>
        <v-divider class="my-4"></v-divider>
        <v-btn class="mt-4" color="primary" block variant="flat">
          Descargar solicitud
        </v-btn>
      </v-container>
    </v-card>
  </template>
  <template v-else>
    <v-form ref="formRef" @submit.prevent="submit">
      <v-card max-width="700px" class="mx-auto">
        <PostulantPersonal :postulant="_postulant" :form="form" />
        <PostulantSpecialty :form="form" />
        <PostulantFiles :form="form" />
        <PostulantPhoto :form="form" />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" block variant="flat" @click="submit">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </template>
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
  birthPlace: "",
  residencePlace: "",
  graduationYear: "",
  phoneNumber: "",
  email: "",
  address: "",
  maritalStatus: "",
  specialty: null,
  fileDocument: null,
  photoAvatar: null,
};

const form: Ref<PostulantPreInscription> = ref(formDefaults);

const formRef = ref(null);
const submit = async () => {
  try {
    const { valid } = await formRef.value.validate();
    if (!valid) return;
    form.value.postulantId = route.params.postulant as string;

    let id = await postulantService.storePostulant(form.value);
    form.value.postulantId = id;

    await fileService.storePreinscriptionFiles(form.value);
    await registrationService.storeRegistration(form.value);
    hasPreinscription.value = true;
    return;
  } catch (error) {
    alert("Ocurrio un error");
  }
};

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
    hasPreinscription.value =
      await registrationService.searchRegistrationByPostulantId(
        _postulant.value.HashId
      );
  }

  loading.value = false;
};

init();
</script>
