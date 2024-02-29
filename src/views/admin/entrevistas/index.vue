<template>
  <v-toolbar>
    <v-list-item title="Entrevista" subtitle="Gestión de entrevista" />
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="newRecord">
      Nuevo
    </v-btn>
  </v-toolbar>
  <v-card-title>
    <v-col cols="12">
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-col>
  </v-card-title>
  <v-data-table-server class="border" v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
    :items="serverItems" :loading="loading" :search="search" item-value="Name"
    :items-per-page-options="[1, 5, 10, 25, 50]" @update:options="loadItems">
    <template v-slot:[`item.Status`]="{ item }">
      <v-chip :color="item.Status ? 'blue' : 'error'" dark label small>
        {{ item.Status ? "Entrevistado" : "Pendiente" }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="editItem(item)" class="mr-2" color="green darken-4" density="compact" variant="tonal">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm @onConfirm="deleteItem(item)" :title="`Eliminar ${item.nombre}`"
          :text="`¿Está seguro de que desea eliminar este registro: ${item.nombre}?`"></DialogConfirm>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table-server>
  <v-dialog v-model="dialog" max-width="80%">
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ editedIndex === -1 ? "Nuevo" : "Editar" }}
        </span>
      </v-card-title>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete v-model="editedItem.CallId" :items="convocatorias" label="Convocatoria" itemTitle="nombre"
              itemValue="id" variant="outlined">
            </v-autocomplete>
            <v-autocomplete v-model="editedItem.AcademicProgramId" :items="programas" label="Programa" itemTitle="nombre"
              itemValue="id" variant="outlined" :clearable="false">
            </v-autocomplete>
            <v-autocomplete v-model="editedItem.PostulantId" :items="postulantes" label="Postulante"
              itemTitle="nombre_completo" itemValue="Id" variant="outlined">
            </v-autocomplete>
            <v-checkbox v-model="editedItem.Status" label="Activo" />
          </v-col>
        </v-row>

        <!-- <form   @submit="EnviarP"> -->
        <v-table>
          <thead>
            <tr>
              <th rowspan="3">N°</th>
              <th rowspan="3">ASPECTOS A EVALUAR</th>
              <th colspan="4">PUNTAJE</th>
            </tr>
            <tr>
              <th>4</th>
              <th>3</th>
              <th>2</th>
              <th>1</th>
            </tr>
            <tr>
              <th>Excelente</th>
              <th>Bueno</th>
              <th>Regular</th>
              <th>Con Dificultades</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Tiene conocimientos básicos acerca de la especialidad.</td>
              <td><input type="radio" v-model="questionScore1" value="8" id="1_4" name="score_1"></td>
              <td><input type="radio" v-model="questionScore1" value="6" id="1_3" name="score_1"></td>
              <td><input type="radio" v-model="questionScore1" value="4" id="1_2" name="score_1"></td>
              <td><input type="radio" v-model="questionScore1" value="2" id="1_1" name="score_1"></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Expectativas como especialista.</td>
              <td><input type="radio" v-model="questionScore2" value="4" id="2_4" name="score_2"></td>
              <td><input type="radio" v-model="questionScore2" value="3" id="2_3" name="score_2"></td>
              <td><input type="radio" v-model="questionScore2" value="2" id="2_2" name="score_2"></td>
              <td><input type="radio" v-model="questionScore2" value="1" id="2_1" name="score_2"></td>
            </tr>
            <tr>
              <td>03</td>
              <td>Muestra serenidad y autocontrol emocional.</td>
              <td><input type="radio" v-model="questionScore3" value="4" id="3_4" name="score_3"></td>
              <td><input type="radio" v-model="questionScore3" value="3" id="3_3" name="score_3"></td>
              <td><input type="radio" v-model="questionScore3" value="2" id="3_2" name="score_3"></td>
              <td><input type="radio" v-model="questionScore3" value="1" id="3_1" name="score_3"></td>
            </tr>
            <tr>
              <td>04</td>
              <td>Tiene conocimientos básicos de investigación.</td>
              <td><input type="radio" v-model="questionScore4" value="4" id="4_4" name="score_4"></td>
              <td><input type="radio" v-model="questionScore4" value="3" id="4_3" name="score_4"></td>
              <td><input type="radio" v-model="questionScore4" value="2" id="4_2" name="score_4"></td>
              <td><input type="radio" v-model="questionScore4" value="1" id="4_1" name="score_4"></td>
            </tr>
          </tbody>
        </v-table>
        <!-- <button type="submit">enviar</button>
           </form> -->
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
        <v-btn variant="tonal" text @click="saveRecord">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import DialogConfirm from "@/components/DialogConfirm.vue";
import { ref } from "vue";

const listDocumentTypes = ref([]);
const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const dialog = ref(false);
const editedItem = ref({});
const defaultItem = ref({
  //conservar
  Id: "",
  CallId: 1,
  AcademicProgramId: "",
  PostulantId: "",
  UserId: 1,
  Observations: "SIN OBSERVACIONES.",
  Status: true,
  Date: "2024-02-27T12:34:56"
});


const questionScore1 = ref(0)
const indicator1 = ref(1)
const questionScore2 = ref(0)
const indicator2 = ref(2)
const questionScore3 = ref(0)
const indicator3 = ref(3)
const questionScore4 = ref(0)
const indicator4 = ref(4)

const EnviarP = () => {
  const arrayData = [
    {
      InterviewIndicatorsId: indicator1.value,
      Score: questionScore1.value,
      Status: true
    },
    {
      InterviewIndicatorsId: indicator2.value,
      Score: questionScore2.value,
      Status: true
    },
    {
      InterviewIndicatorsId: indicator3.value,
      Score: questionScore3.value,
      Status: true
    },
    {
      InterviewIndicatorsId: indicator4.value,
      Score: questionScore4.value,
      Status: true
    }
  ]
  // console.log(arrayData)
}


//

const editedIndex = ref(-1);

const programas = ref([]);
const puntajes = ref([]);


const convocatorias = [
  { nombre: "CONVOCATORIA 2024", id: 1 },
];

const postulantes = [
  { nombre_completo: "ANDY MAMANI VEGA", dni: "11112222", Id: 1 },
  { nombre_completo: "YABIA OIDO DELLOS", dni: "22223333", Id: 2 },
  { nombre_completo: "lio lio lio", dni: "33334444", Id: 8 }
];


const loadProgramas = async () => {
  try {
    const response = await axios.get('http://segundas.unap.pe/api/programas');
    programas.value = response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const loadPuntaje = async (Id) => {
  try {
    const response = await axios.get('http://segunda_especialidad_felix.test/api/entrevista_puntajes/' + Id);

    return response.data.data;


  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

loadProgramas();

const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  // let res = await axios.post("http://segundas.unap.pe/api/convocatorias", {
  let res = await axios.post("http://174.138.178.194:8086/api/entrevista", {
    page,
    itemsPerPage,
    sortBy,
    search,
  });
  let data = await res.data;
  // let res = await r


  headers.value = data.headers;
  totalItems.value = data.items.total;
  let data_items = data.items.data;

  const baseURL = 'http://segundas.unap.pe/api/programa/';

  data_items.forEach(item => {
    const endpoint = baseURL + item.id_programa;

    fetch(endpoint)
      .then(response => response.json())
      .then(apiResponse => {
        const nombreFromApi = apiResponse.nombre;
        item.id_programa = nombreFromApi;
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });
  });

  serverItems.value = data_items;
  /*
  console.log("data_items", data_items);
  console.log("serverItems.value", serverItems.value);
  console.log("data", data.items.data);
  console.log("page", page);
  console.log("itemsPerPage", itemsPerPage);
  console.log("sortBy", sortBy);
  */

  loading.value = false;
};



let arrayData = [
  {
    InterviewIndicatorsId: indicator1.value,
    Score: questionScore1.value,
    Status: 1
  },
  {
    InterviewIndicatorsId: indicator2.value,
    Score: questionScore2.value,
    Status: 1
  },
  {
    InterviewIndicatorsId: indicator3.value,
    Score: questionScore3.value,
    Status: 1
  },
  {
    InterviewIndicatorsId: indicator4.value,
    Score: questionScore4.value,
    Status: 1
  }
];

const editItem = async (item) => {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  console.log(editedItem.value);




  try {
    puntajes.value = await loadPuntaje(editedItem.value.Id);
    // Handle the loaded data here
    console.log('Loaded puntajes:', puntajes.value);

    arrayData = puntajes.value;

    console.log('arrayData:', arrayData);

    const refs = {};

    // Iterate over the array and assign values to refs
    arrayData.forEach(item => {
      refs[`questionScore${item.InterviewIndicatorsId}`] = ref(parseFloat(item.Score) || 0);
      refs[`indicator${item.InterviewIndicatorsId}`] = ref(item.InterviewIndicatorsId);
    });

    console.log(questionScore1.value); // Output: 8
    console.log(indicator1.value); // Output: 1

    console.log(questionScore2.value); // Output: 1
    console.log(indicator2.value); // Output: 2

    console.log(questionScore3.value); // Output: 4
    console.log(indicator3.value); // Output: 3

    console.log(questionScore4.value); // Output: 4
    console.log(indicator4.value);

  } catch (error) {
    // Handle errors here
    console.error('Error in fetchData:', error);
  }




  console.log("editedItem.value.Id: ", editedItem.value.Id);

  dialog.value = true;
};

const newRecord = () => {
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem.value);
  dialog.value = true;
};

const close = () => {
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem.value);
  dialog.value = false;
};

const saveRecord = async () => {

  const arrayData = [
    {
      InterviewIndicatorsId: indicator1.value,
      Score: questionScore1.value,
      Status: 1
    },
    {
      InterviewIndicatorsId: indicator2.value,
      Score: questionScore2.value,
      Status: 1
    },
    {
      InterviewIndicatorsId: indicator3.value,
      Score: questionScore3.value,
      Status: 1
    },
    {
      InterviewIndicatorsId: indicator4.value,
      Score: questionScore4.value,
      Status: 1
    }
  ]

  // console.log("editedItem.value", {interview:  editedItem.value,
  // indicators: arrayData});
  if (editedIndex.value === -1) {
    // let res = await axios.post("http://segundas.unap.pe/api/convocatoria", {
    // let res = await axios.post("http://servicio_convocatorias.test/api/crear_convocatoria", {
    let res = await axios.post("http://174.138.178.194:8086/api/entrevistastore", {
      interview: editedItem.value,
      indicators: arrayData

    });
    // console.log(res)
    serverItems.value.push({ Status: true, ...res.data.data });

  } else {
    // console.log("editedItem", editedItem.value);

    let res = await axios.patch(
      // "http://segundas.unap.pe/api/convocatoria/" + editedItem.value.id,
      // "http://servicio_convocatorias.test/api/actualizar_convocatoria/" + editedItem.value.id,
      "http://174.138.178.194:8086/api/entrevista/" + editedItem.value.Id,
      {
        interview: editedItem.value,
        indicators: arrayData
      }
    );
    // console.log(res);

    serverItems.value[editedIndex.value] = res.data.data;
    dialog.value = false;
    // console.log("update record");
  }
  dialog.value = false;
};

const deleteItem = async (item) => {
  let res = await axios.delete(
    "http://174.138.178.194:8086/api/entrevista/" + item.id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};
</script>
