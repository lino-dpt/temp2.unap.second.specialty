<template>
  <v-tabs
    v-model="tab"
    bg-color="grey-lighten-3"
    rounded="0"
    @update:model-value="onchangeTab"
  >
    <v-tab
      rounded="0"
      link
      :to="`/a/postulants/show/${route.params.id}/generals`"
      value="generals"
    >
      General
    </v-tab>
    <v-tab
      rounded="0"
      link
      :to="`/a/postulants/show/${route.params.id}/cv`"
      value="cv"
    >
      CV
    </v-tab>
  </v-tabs>
    <template v-if="tab === 'generals'">
      <TabGenerals :data="dataGenerals" />
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
import TabGenerals from "./components/TabGenerals.vue";
const route = useRoute();

const tab = ref(route.params.tab);

const dataGenerals = ref(null);

const onchangeTab = async (value: string) => {
  if (value === "generals") {
    dataGenerals.value = await getPostulantsGenerals(route.params.id as string);
  }
};

// const dataCV = ref(null);
const init = async () => {
  // console.log("tab", tab.value);
  if (tab.value === "generals") {
    dataGenerals.value = await getPostulantsGenerals(route.params.id as string);
  }
};

init();
</script>
