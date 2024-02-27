<template>
  <v-toolbar flat density="compact" title="Documentos" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="text-caption text-uppercase">
          Titulo universitario
        </span>
        <UploadFile v-model="form.fileDocument" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { PostulantPreInscription } from "@/types/postulantTypes";
import UploadFile from "@/components/UploadFile.vue";
defineProps<{
  form: PostulantPreInscription;
}>();
</script>
