<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card width="700" class="mx-auto">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-combobox
              v-model="form.specialty"
              :items="items"
              label="Especialidad"
              item-title="nombre"
              item-value="id"
              :clearable="false"
            />
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

const emit = defineEmits(["onSuccess"]);

const form = ref({
  specialty: null,
});

const items = ref([]);

const submit = async () => {
  console.log(form.value);

  emit("onSuccess");
  return;

  // let res = await axios.post(
  //   "http://unap.specialty2.postulants.test/api/v1/postulants/",
  //   form.value
  // );

  // if (res.status === 'success') {
  //   emit("onSuccess");
  // }
  // console.log(res);
};

const init = async () => {
  let res = await axios.get("http://segundas.unap.pe/api/programas");
  items.value = res.data;
};
init();
</script>
<style lang="scss"></style>
