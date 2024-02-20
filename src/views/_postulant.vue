<template>
  <v-app app id="inspire">
    <v-main app class="my-10">
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
    </v-main>
  </v-app>
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

import { useRoute, useRouter } from "vue-router";

const postulantService = new PostulantService();
const fileService = new FileService();

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const _postulant: Ref<Postulant> = ref(null);

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
  specialty: 1,
  fileDocument: null,
  photoAvatar: null,
};

const form: Ref<PostulantPreInscription> = ref(formDefaults);

const formRef = ref(null);
const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  console.log(form.value);
  form.value.postulantId = route.params.postulant as string;
  let id = await postulantService.storePostulant(form.value);
  console.log(id);

  form.value.postulantId = id;
  await fileService.storePreinscriptionFiles(form.value);
  return;
};

const init = async () => {
  loading.value = true;
  let hash = route.params.postulant as string;
  let res = await postulantService.getPreinscription(hash);

  if (res === "The payload is invalid.") {
    router.push("/p/convocatoria-2024/preinscripcion/");
    return;
  }

  _postulant.value = res;
  console.log(_postulant.value);

  loading.value = false;
};

init();
</script>
