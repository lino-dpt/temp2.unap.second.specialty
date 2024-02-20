<template>
  <v-toolbar flat density="compact" title="Foto de postulante" />
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-card variant="tonal" rounded="0">
          <CropCompressImage
            :aspect-ratio="1"
            @onCropper="
              (preview_img = $event.blob), (form.photoAvatar = $event.file)
            "
          />
          <v-img
            :aspect-ratio="16 / 9"
            v-if="preview_img"
            :src="preview_img"
            height="250"
            class="border"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CropCompressImage from "../CropCompressImage.vue";

import { PostulantPreInscription } from "@/types/postulantTypes";

defineProps<{
  form: PostulantPreInscription;
}>();

const preview_img = ref(null);


</script>
<style lang="scss"></style>
