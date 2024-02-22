<template>
  <input
    type="file"
    id="file"
    ref="file"
    @change="uploadFile"
    hidden
    accept="application/pdf"
  />

  <template v-if="!filePreview">
    <div class="upload-box" @click="file.click()">
      <v-icon>mdi-cloud-upload</v-icon>
      <span class="ms-2">Subir archivo</span>
    </div>
  </template>
  <v-card v-else variant="flat" class="border" max-height="350">
    <v-list-item>
      <template #prepend>
        <v-icon size="35" color="red">mdi-file-pdf-box</v-icon>
      </template>
      <v-list-item-title> {{ fileDeails.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ fileDeails.size }} bytes</v-list-item-subtitle>

      <v-list-item-subtitle>{{ fileDeails.type }}</v-list-item-subtitle>
      <template #append>
        <v-btn
          icon
          @click="filePreview = null, input = null"
          variant="tonal"
          color="red"
          density="compact"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-list-item>

    <embed
      :src="filePreview"
      type="application/pdf"
      width="100%"
      height="300px"
      v-if="filePreview"
    />
  </v-card>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { ref, Ref } from "vue";

const props = defineProps<{
  modelValue: File | null;
}>();
const emit = defineEmits(["update:modelValue"]);

const file = ref(null);

const input: Ref<File | null> = computed({
  get: () => props.modelValue,
  set: (value: File | null) => emit("update:modelValue", value),
});

const filePreview = ref(null);
const fileDeails = ref({
  name: "",
  size: "",
  type: "",
});

const uploadFile = (e) => {
  const file = e.target.files[0];
  if (file.size > 200000) {
    alert("El archivo es muy grande");
    return;
  }
  if (file.type !== "application/pdf") {
    alert("El archivo no es un PDF");
    return;
  }
  fileDeails.value.name = file.name;
  fileDeails.value.size = file.size;
  fileDeails.value.type = file.type;

  input.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    filePreview.value = e.target.result;
  };
  
  reader.readAsDataURL(file);
};
</script>
<style lang="scss">
.upload-box {
  width: 100%;
  height: 100px;
  border: 1px dashed #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
  background-color: #f5f5f5;
  border-radius: 5px;
  transition: all 0.3s;
}
</style>
