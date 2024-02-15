<template>
  <v-app app id="inspire">
    <v-main app class="mt-10">
      <template v-if="step === 0">
        <PostulantVoucher @onSuccess="nextStep" />
      </template>
      <template v-if="step === 1">
        <PostulantPersonal @onSuccess="nextStep" />
      </template>
      <template v-if="step === 2">
        <PostulantFiles @onSuccess="nextStep" />
      </template>
      <template v-if="step === 3">
        <h3 class="text-h6">Guardar</h3>
        <v-divider class="my-3"></v-divider>
        <v-sheet border> Guardar </v-sheet>
      </template>
    </v-main>
    <v-footer app color="red" class="pa-0">
      <v-container class="pa-0" fluid>
        <v-stepper v-model="step" show-actions rounded="0">
          <v-stepper-header>
            <v-stepper-item v-for="(item, i) in items" :value="i" :key="i">
              <template v-slot:title>
                {{ item }}
              </template>
            </v-stepper-item>
          </v-stepper-header>
        </v-stepper>
      </v-container>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { ref } from "vue";
import PostulantPersonal from "@/components/forms/PostulantPersonal.vue";
import PostulantFiles from "@/components/forms/PostulantFiles.vue";
import PostulantVoucher from "@/components/forms/PostulantVoucher.vue";
const step = ref(0);
const items = ["Datos Personales", "Archivos", "Guardar"];
const init = async () => {
  //   documentTypesItems.value = await publicApiService._DocumentTypes();
};

const nextStep = () => {
  step.value++;
};

init();
</script>
<style lang="scss"></style>
