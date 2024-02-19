<template>
  <v-app app id="inspire">
    <v-main app class="mt-10">
      <PostulantPersonal @onSuccess="nextStep" />
      <PostulantSpecialty @onSuccess="nextStep" />
      <PostulantPhoto @onSuccess="nextStep" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PostulantPersonal from "@/components/forms/PostulantPersonal.vue";
import PostulantSpecialty from "@/components/forms/PostulantSpecialty.vue";
import PostulantPhoto from "@/components/forms/PostulantPhoto.vue";
const step = ref(0);

const init = async () => {
  //   documentTypesItems.value = await publicApiService._DocumentTypes();
};

const nextStep = () => {
  step.value++;
};

init();
</script>

