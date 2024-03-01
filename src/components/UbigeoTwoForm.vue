<template>
  <v-col cols="12" md="8">
    <v-autocomplete
      v-model="ubigeo"
      :items="items"
      item-title="title"
      item-value="value"
      label="Ubigeo - Departamento, Provincia, Distrito"
      v-model:search="search"
      :rules="[isRequired]"
    >
    </v-autocomplete>
  </v-col>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, computed, watch, Ref } from "vue";
import { throttle } from "lodash";

import { isRequired } from "@/helpers/validations";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String],
    required: true,
  },
});

const ubigeo: Ref<string> = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
const items = ref([]);
const search = ref("");

watch(
  search,
  throttle(async (val: string) => {
    if (val == null || val == "") return;

    if (ubigeo.value) {
      let currentSelect = items.value.filter((item) => item.id == ubigeo.value);
      if (currentSelect[0]?.text == search.value) return;
    }
    let res = await axios.get(
      `https://segundas.unap.pe/api/search-ubigeo/${val}`
    );
    
    items.value = res.data;
  }, 500)
);
</script>
