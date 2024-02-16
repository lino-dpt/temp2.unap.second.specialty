<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card width="700" class="mx-auto">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-card variant="tonal" rounded="0">
              <CropCompressImage
                :aspect-ratio="1"
                @onCropper="
                  (preview_img = $event.blob), (form.img = $event.file)
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" variant="flat" block>Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import CropCompressImage from "../CropCompressImage.vue";

const emit = defineEmits(["onSuccess"]);

const preview_img = ref(null);

const form = ref({
  img: null,
});

const items = ref([]);

const submit = async () => {
  console.log(form.value);

  emit("onSuccess");
  return;
};

const init = async () => {
  let res = await axios.get("http://segundas.unap.pe/api/programas");
  items.value = res.data;
};
init();
</script>
<style lang="scss"></style>
