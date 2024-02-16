<template>
  <v-form class="w-full" @submit.prevent="submit">
    <v-card width="450" class="mx-auto" rounded="0" elevation="0">
      <v-container>
        <v-row>
          <v-col cols="12" md="12" class="pb-1">
            <v-radio-group inline >
              <v-radio label="DNI" value="dni" required></v-radio>
              <v-radio label="Carnet de ext." value="ce"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" md="12" class="py-1">
            <v-text-field label="DNI" required />
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field label="serie" required />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field label="fehca" type="date" required />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field label="monto" required />
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
                @onCropper="preview_img = $event.blob"
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
          <v-col cols="12">
            <v-btn type="submit" variant="flat" block> Guardar </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
  <v-dialog v-model="dialogExample">
    <v-card width="300">
      <v-img
        src="http://www.osce.gob.pe/consultasenlinea/rnp/images/ClaveBANBIF.gif"
      />
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CropCompressImage from "@/components/CropCompressImage.vue";

const emit = defineEmits(["onSuccess"]);
const preview_img = ref(null);
const dialogExample = ref(false);

const submit = () => {
  emit("onSuccess");
  console.log("submit");
};
</script>
