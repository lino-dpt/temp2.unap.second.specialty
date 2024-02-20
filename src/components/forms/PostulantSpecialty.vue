<template>
  <v-toolbar flat density="compact" title="Especialidad" />
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-combobox
          v-model="form.specialty"
          :items="items"
          label="Especialidad"
          item-title="name"
          item-value="id"
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

const items = ref([
  {
    id: 1,
    name: "Especialidad 1",
  },
  {
    id: 2,
    name: "Especialidad 2",
  },
  {
    id: 3,
    name: "Especialidad 3",
  },
  {
    id: 4,
    name: "Especialidad 4",
  },
  {
    id: 5,
    name: "Especialidad 5",
  },
  {
    id: 6,
    name: "Especialidad 6",
  },
  {
    id: 7,
    name: "Especialidad 7",
  },
  {
    id: 8,
    name: "Especialidad 8",
  },
  {
    id: 9,
    name: "Especialidad 9",
  },
  {
    id: 10,
    name: "Especialidad 10",
  },
]);

const init = async () => {
  let res = await axios.get("http://segundas.unap.pe/api/programas");
  console.log('res.data', res.data);
  
  items.value = res.data;
};
// init();
</script>
<style lang="scss"></style>
