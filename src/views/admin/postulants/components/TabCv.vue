<template>
  <v-card
    v-if="evaluation === null"
    class="text-center mx-auto my-5"
    width="300"
  >
    <v-container>
      <v-alert type="info" variant="text" class="mb-5">
        Aún no se ha iniciado la evaluación
      </v-alert>
      <v-btn block @click="_initEvaluation"> Iniciar Evaluación </v-btn>
    </v-container>
  </v-card>
  <v-row v-else>
    <v-col cols="12">
      <v-card rounded="0" elevation="0">
        <v-toolbar density="compact" :title="EvaluationCriterias[0].name">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogAddFA = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider></v-divider>
        <v-container> </v-container>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card rounded="0" elevation="0">
        <v-toolbar density="compact" :title="EvaluationCriterias[0].name">
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list-item class="my-3" title="Año(s) de experiencia">
          <template #prepend>
            <v-avatar>
              {{ 0 }}
            </v-avatar>
          </template>
          <template #append>
            <v-btn
              icon
              variant="tonal"
              color="blue"
              @click="addYearExperiencie"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="tonal"
              color="black"
              @click="removeYearExperiencie"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card rounded="0" elevation="0">
        <v-toolbar density="compact" :title="EvaluationCriterias[2].name">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogAddC = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogAddFA" max-width="600">
    <v-form ref="formAddFA" lazy-validation @submit.prevent="submitFA">
      <v-card>
        <v-card-title> Agregar Formación Académica </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="fromAddFA.indicator"
                label="Indicador"
                :items="EvaluationCriteriasIndicators"
                item-title="name"
                item-value="id"
                :return-object="true"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="fromAddFA.description"
                label="Descripción"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogAddFA = false">Cancelar</v-btn>
          <v-btn color="primary" variant="flat" type="submit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <v-dialog v-model="dialogAddC" max-width="600">
    <v-form ref="FormC" @submit.prevent="submitC">
      <v-card>
        <v-card-title> Agregar Formación Académica </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="formC.description" label="Descripción" />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogAddC = false">Cancelar</v-btn>
          <v-btn color="primary" type="submit" variant="flat">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

import {
  getEvaluation,
  initEvaluation,
  storeDetail,
  addYerOfExperience,
  minusYerOfExperience,
} from "@/services/admin/PostulantServices";
import { useRoute } from "vue-router";
const route = useRoute();

const fromAddFA = ref({
  indicator: null,
  description: "",
  criteria: 1,
  evaluationId: null,
});

const formE = ref({
  indicator: {
    id: 3,
    name: "Certificación",
    score: 1.0,
  },
  description: "Años de Experiencia",
  criteria: 2,
  evaluationId: null,
});

const formC = ref({
  indicator: {
    id: 4,
    name: "Certificación",
    score: 0.25,
  },
  description: "",
  criteria: 3,
  evaluationId: null,
});

const dialogAddFA = ref(false);
const dialogAddC = ref(false);

const evaluation = ref(null);

const EvaluationCriteriasIndicators = ref([
  {
    id: 1,
    name: "Título profesional",
    score: 8.0,
  },
  {
    id: 2,
    name: "Maestría",
    score: 2.0,
  },
]);
const EvaluationCriterias = ref([
  {
    id: 1,
    name: "Formación académica",
    description: "Formación académica",
    maxScore: 20,
  },
  {
    id: 2,
    name: "Experiencia laboral",
    description: "Experiencia laboral",
    maxScore: 20,
  },
  {
    id: 3,
    name: "Capacitaciones",
    description: "Formación profesional",
    maxScore: 20,
  },
]);

const _getEvaluation = async () => {
  let res = await getEvaluation(route.params.id as string);
  evaluation.value = res ? res : null;
};

const _initEvaluation = async () => {
  let data = {
    postulantId: route.params.id,
    callId: 1,
  };
  let res = await initEvaluation(data);
  evaluation.value = res ? res.evaluacion : null;
};

const submitFA = async () => {
  try {
    // console.log(fromAddFA.value);
    fromAddFA.value.evaluationId = evaluation.value.Id;
    await storeDetail(fromAddFA.value);
    dialogAddFA.value = false;
    // console.log("submitFA");
  } catch (error) {
    alert("Ocurrio un error");
  }
};

const submitC = async () => {
  try {
    formC.value.evaluationId = evaluation.value.Id;
    await storeDetail(formC.value);
    dialogAddFA.value = false;
  } catch (error) {}
};

const addYearExperiencie = async () => {
  formE.value.evaluationId = evaluation.value.Id;
  await addYerOfExperience(formE.value);
};

const removeYearExperiencie = async () => {
  formE.value.evaluationId = evaluation.value.Id;
  await minusYerOfExperience(formE.value);
};

const init = async () => {
  await _getEvaluation();
};
init();
</script>
