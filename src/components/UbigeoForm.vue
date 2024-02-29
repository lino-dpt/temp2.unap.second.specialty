<template>
  <v-col cols="12" md="4">
    <v-select
      :items="deparmentsItems"
      v-model="deparment"
      label="Departamento"
      itemTitle="name"
      itemValue="id"
      :clearable="false"
      @update:model-value="onSelectDepartment"
      :rules="[isRequired]"
    />
  </v-col>

  <v-col cols="12" md="4">
    <v-select
      :items="provincesItems"
      v-model="province"
      label="Provincia"
      itemTitle="name"
      itemValue="id"
      :clearable="false"
      :rules="[isRequired]"
      @update:model-value="onSelectProvince"
    />
  </v-col>
  <v-col cols="12" md="4">
    <v-select
      v-model="district"
      :items="districtsItems"
      label="Distrito"
      itemTitle="name"
      itemValue="id"
      :clearable="false"
      :rules="[isRequired]"
    />
  </v-col>
</template>
<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import PublicApiService from "@/services/PublicApiService";
import deparmentsJson from "@/assets/data/json/deparments.json";
import { isRequired } from "@/helpers/validations";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const district: Ref<string | null> = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const publicApiService = new PublicApiService();
const deparmentsItems = deparmentsJson;
const provincesItems = ref([]);
const districtsItems = ref([]);

const deparment: Ref<string> = ref(null);
const province: Ref<string | null> = ref(null);
// const district: Ref<string> = ref("");

const onSelectDepartment = async (value: string) => {
  provincesItems.value = [];
  districtsItems.value = [];
  province.value = "";
  district.value = "";

  provincesItems.value = await publicApiService._Provinces(value);
};

const onSelectProvince = async (value: string) => {
  district.value = "";
  districtsItems.value = await publicApiService._Districts(value);
};
</script>
