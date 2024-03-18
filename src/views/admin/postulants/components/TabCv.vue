<template>
  <v-container fluid>
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
            <v-btn
              append-icon="mdi-plus"
              @click="dialogAddFA = true"
              variant="outlined"
              rounded="lg"
              class="me-4"
            >
              Agregar
            </v-btn>
          </v-toolbar>

          <v-list-item
            v-for="(fa, index) in formationAcademic"
            :key="fa.Id"
            class="border-b py-2"
          >
            <template #prepend>
              <v-avatar>
                {{ (parseInt(fa.Score) * parseInt(fa.Amount)).toFixed(2) }}
              </v-avatar>
            </template>
            <v-list-item-subtitle>
              {{
                fa.EvaluationIndicatorId === 1
                  ? "Título profesional"
                  : "Maestría"
              }}
            </v-list-item-subtitle>
            <v-list-item-title>
              {{ fa.Observations }}
            </v-list-item-title>
            <template #append>
              <v-btn
                icon
                rounded="lg"
                variant="tonal"
                color="red"
                @click="_removeEvaluation(fa.Id, index, 'FA')"
                :loading="fa.loading"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item class="border-b py-2">
            <v-list-item-title class="text-end">
              <v-chip class="mr-4" label size="large" color="primary">
                <strong> {{ formationAcademicTotal }} puntos </strong>
              </v-chip>
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="0" elevation="0">
          <v-toolbar density="compact" :title="EvaluationCriterias[1].name">
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list-item class="py-2 border-b" title="Año(s) de experiencia">
            <template #prepend>
              <v-avatar>
                {{
                  experiencieLaboral.length === 0
                    ? (0).toFixed(2)
                    : (
                        parseInt(experiencieLaboral[0].Score) *
                        parseInt(experiencieLaboral[0].Amount)
                      ).toFixed(2)
                }}
              </v-avatar>
            </template>
            <template #append>
              <v-btn
                icon
                rounded="lg"
                variant="tonal"
                color="red"
                :loading="loadingMinus"
                @click="removeYearExperiencie"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn
                icon
                rounded="lg"
                variant="tonal"
                color="blue"
                :loading="loadingAdd"
                @click="addYearExperiencie"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item class="border-b py-2">
            <v-list-item-title class="text-end">
              <v-chip class="mr-4" label size="large" color="primary">
                <strong> {{ experiencieLaboralTotal }} puntos </strong>
              </v-chip>
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="0" elevation="0">
          <v-toolbar density="compact" :title="EvaluationCriterias[2].name">
            <v-spacer></v-spacer>
            <v-btn
              append-icon="mdi-plus"
              @click="dialogAddC = true"
              variant="outlined"
              rounded="lg"
              class="me-4"
            >
              Agregar
            </v-btn>
          </v-toolbar>
          <v-list-item
            v-for="(t, index) in training"
            :key="t.Id"
            class="border-b py-2"
          >
            <template #prepend>
              <v-avatar>
                {{ (parseFloat(t.Score) * parseFloat(t.Amount)).toFixed(2) }}
              </v-avatar>
            </template>
            <v-list-item-title>
              {{ t.Observations }}
            </v-list-item-title>
            <template #append>
              <v-btn
                icon
                rounded="lg"
                variant="tonal"
                color="red"
                @click="_removeEvaluation(t.Id, index, 'C')"
                :loading="t.loading"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item class="border-b py-2">
            <v-list-item-title class="text-end">
              <v-chip class="mr-4" label size="large" color="primary">
                <strong> {{ trainingTotal }} puntos </strong>
              </v-chip>
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="0" elevation="0">
          <v-toolbar title="Calificación Final">
            <v-spacer></v-spacer>
            <v-chip class="mr-4" label size="x-large" color="blue">
              <strong> {{ totalScore }} puntos </strong>
            </v-chip>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
          <v-btn variant="tonal" color="error" @click="dialogAddFA = false"
            >Cancelar</v-btn
          >
          <v-btn
            color="primary"
            variant="flat"
            type="submit"
            :loading="loadingFA"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <v-dialog v-model="dialogAddC" max-width="600">
    <v-form ref="FormC" @submit.prevent="submitC">
      <v-card>
        <v-card-title> Agregar Capacitación </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="formC.description" label="Descripción" />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="tonal" @click="dialogAddC = false"
            >Cancelar</v-btn
          >
          <v-btn
            color="primary"
            type="submit"
            variant="flat"
            :loading="loadingC"
            >Guardar</v-btn
          >
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
  removeEvaluation,
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

const formationAcademic = ref(null);
const formationAcademicTotal = ref(0);
const experiencieLaboral = ref(null);
const experiencieLaboralTotal = ref(0);
const training = ref(null);
const trainingTotal = ref(0);

const totalScore = ref(0);

const dialogAddFA = ref(false);
const loadingFA = ref(false);
const dialogAddC = ref(false);
const loadingC = ref(false);

const loadingMinus = ref(false);
const loadingAdd = ref(false);

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

  let details = res.details;
  formationAcademic.value = details.filter(
    (d) => d.EvaluationIndicatorId === 1 || d.EvaluationIndicatorId === 2
  );
  experiencieLaboral.value = details.filter(
    (d) => d.EvaluationIndicatorId === 3
  );
  training.value = details.filter((d) => d.EvaluationIndicatorId === 4);

  //formationAcademic
  formationAcademicTotal.value = formationAcademic.value.reduce((acc, d) => {
    return acc + parseFloat(d.Score) * parseFloat(d.Amount);
  }, 0);

  //experiencieLaboral
  experiencieLaboralTotal.value = experiencieLaboral.value.reduce((acc, d) => {
    return acc + parseFloat(d.Score) * parseFloat(d.Amount);
  }, 0);

  //training
  trainingTotal.value = training.value.reduce((acc, d) => {
    return acc + parseFloat(d.Score) * parseFloat(d.Amount);
  }, 0);

  //formationAcademicTotal el maximo es 10 puntos
  formationAcademicTotal.value =
    formationAcademicTotal.value > 10 ? 10 : formationAcademicTotal.value;

  totalScore.value =
    formationAcademicTotal.value +
    experiencieLaboralTotal.value +
    trainingTotal.value;
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
    loadingFA.value = true;
    fromAddFA.value.evaluationId = evaluation.value.Id;
    await storeDetail(fromAddFA.value);
    await _getEvaluation();
    loadingFA.value = false;
    //limpiar formulario
    fromAddFA.value.indicator = null;
    fromAddFA.value.description = "";
    dialogAddFA.value = false;
  } catch (error) {
    alert("Ocurrio un error");
  }
};

const submitC = async () => {
  try {
    loadingC.value = true;
    formC.value.evaluationId = evaluation.value.Id;
    await storeDetail(formC.value);
    dialogAddC.value = false;
    loadingC.value = false;
    formC.value.description = "";
    await _getEvaluation();
  } catch (error) {
    alert("Ocurrio un error");
  }
};

const addYearExperiencie = async () => {
  loadingAdd.value = true;
  formE.value.evaluationId = evaluation.value.Id;
  await addYerOfExperience(formE.value);
  await _getEvaluation();
  loadingAdd.value = false;
};

const removeYearExperiencie = async () => {
  loadingMinus.value = true;
  formE.value.evaluationId = evaluation.value.Id;
  await minusYerOfExperience(formE.value);
  await _getEvaluation();
  loadingMinus.value = false;
};

const _removeEvaluation = async (id, index, item) => {
  if (item === "FA") {
    formationAcademic.value[index].loading = true;
  } else {
    training.value[index].loading = true;
  }
  await removeEvaluation(id);
  await _getEvaluation();
};

const init = async () => {
  await _getEvaluation();
};
init();
</script>
