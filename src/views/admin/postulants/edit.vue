<template>
  <v-tabs v-model="tab" bg-color="grey-lighten-3" rounded="0">
    <v-tab
      rounded="0"
      link
      :to="`/a/postulants/show/${route.params.id}/generals`"
      value="generals"
    >
      General
    </v-tab>
  </v-tabs>
  <template v-if="tab === 'generals'">
    <TabGeneralsEdit :data="dataGenerals" @onUpdate="_getPostulantsGenerals" />
  </template>

  <template v-else>
    <TabCv />
  </template>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getPostulantsGenerals } from "@/services/admin/PostulantServices";
import TabCv from "./components/TabCv.vue";
import TabGeneralsEdit from "./components/TabGeneralsEdit.vue";
const route = useRoute();

const dataGenerals = ref(null);
const tab = ref("generals");

const _getPostulantsGenerals = async () => {
  dataGenerals.value = await getPostulantsGenerals(route.params.id as string);
};

// const dataCV = ref(null);
const init = async () => {
  await _getPostulantsGenerals();
};

init();
</script>
