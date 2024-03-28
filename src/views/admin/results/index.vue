<template>
  <v-toolbar>
    <v-list-item subtitle="Pulicacion de resultados" title="Resultados" />
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-card>
    <v-list-item v-for="program in programs" :key="program.id" class="border-b">
      <v-list-item-title>{{ program.ProgramName }}</v-list-item-title>
      <template #append>
        <v-btn
          @click="updatePrograms(program)"
          :color="program.Path ? 'success' : 'primary'"
        >
          {{ program.Path ? "Actualizar" : "Publicar" }}
        </v-btn>
      </template>
    </v-list-item>
  </v-card>

  <v-dialog v-model="dialog" max-width="500px">
    <v-form @submit.prevent="submit">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ form.programName }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-file-input
            v-model="form.file"
            label="Archivo"
            required
          ></v-file-input>
        </v-card-text>

        <v-card-actions class="mt-3">
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="dialog = false" variant="tonal">
            Cancelar
          </v-btn>
          <v-btn type="submit"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

const programs = ref([]);
const dialog = ref(false);
const form = ref({
  programId: "",
  programName: "",
  file: null,
});

const getPrograms = async () => {
  const response = await fetch("https://data.segundas.unap.edu.pe/api/results");
  const data = await response.json();
  programs.value = data;
};

const updatePrograms = async (program: any) => {
  dialog.value = true;
  form.value = {
    programId: program.ProgramId,
    programName: program.ProgramName,
    file: null,
  };
};

const submit = async () => {
  const formData = new FormData();
  formData.append("programId", form.value.programId);
  formData.append("file", form.value.file[0]);

  const response = await fetch("https://data.segundas.unap.edu.pe/api/results", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data) {
    await getPrograms();
  }
  dialog.value = false;
};

const init = async () => {
  await getPrograms();
};

init();
</script>
