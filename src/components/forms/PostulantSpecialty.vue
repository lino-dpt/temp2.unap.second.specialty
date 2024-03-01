<template>
  <v-toolbar flat density="compact" title="Especialidad" />
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-combobox
          v-model="form.specialty"
          :items="items"
          label="Especialidad"
          item-title="nombre"
          item-value="id"
          :return-object="false"
          :clearable="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { PostulantPreInscription } from "@/types/postulantTypes";

const emit = defineEmits(["onSuccess"]);
defineProps<{
  form: PostulantPreInscription;
}>();

const items = ref([]);

const init = async () => {
  let res = await axios.get("https://segundas.unap.pe/api/programas");
  items.value = res.data;
};
init();
</script>
<style lang="scss"></style>
