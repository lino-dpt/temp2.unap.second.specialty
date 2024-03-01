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
      <v-text-field v-model="search" append-icon="search" label="buscar" single-line hide-details></v-text-field>
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
      <v-btn  @click="editItem(item)" color ="green dark label small" variant="tonal">
        Entrevistar
      </v-btn>

      <!-- <v-btn icon color="red" density="compact" variant="tonal">
        <DialogConfirm @onConfirm="deleteItem(item)" :title="`Eliminar ${item.nombre}`"
          :text="`¿Está seguro de que desea eliminar este registro: ${item.nombre}?`"></DialogConfirm>
        <v-icon>mdi-delete</v-icon>
      </v-btn> -->
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
            <v-autocomplete class="mb-4" v-model="editedItem.CallId" :items="convocatorias" label="Convocatoria" itemTitle="nombre"
              itemValue="id" variant="outlined">
            </v-autocomplete>
            <v-autocomplete class="mb-4" v-model="editedItem.AcademicProgramId" :items="programas" label="Programa" itemTitle="nombre"
              itemValue="id" variant="outlined" :clearable="false">
            </v-autocomplete>
            <v-autocomplete class="mb-4" v-model="editedItem.PostulantId" :items="postulantes" label="Postulante"
              itemTitle="nombre_completo" itemValue="Id" variant="outlined">
            </v-autocomplete>
            <v-checkbox v-model="editedItem.Status" label="Entrevistado" />
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
              <td><input type="radio" v-model="questionScore1" value="8.000" id="1_4" name="score_1"></td>
              <td><input type="radio" v-model="questionScore1" value="6.000" id="1_3" name="score_1"></td>
              <td><input type="radio" v-model="questionScore1" value="4.000" id="1_2" name="score_1"></td>
              <td><input type="radio" v-model="questionScore1" value="2.000" id="1_1" name="score_1"></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Expectativas como especialista.</td>
              <td><input type="radio" v-model="questionScore2" value="4.000" id="2_4" name="score_2"></td>
              <td><input type="radio" v-model="questionScore2" value="3.000" id="2_3" name="score_2"></td>
              <td><input type="radio" v-model="questionScore2" value="2.000" id="2_2" name="score_2"></td>
              <td><input type="radio" v-model="questionScore2" value="1.000" id="2_1" name="score_2"></td>
            </tr>
            <tr>
              <td>03</td>
              <td>Muestra serenidad y autocontrol emocional.</td>
              <td><input type="radio" v-model="questionScore3" value="4.000" id="3_4" name="score_3"></td>
              <td><input type="radio" v-model="questionScore3" value="3.000" id="3_3" name="score_3"></td>
              <td><input type="radio" v-model="questionScore3" value="2.000" id="3_2" name="score_3"></td>
              <td><input type="radio" v-model="questionScore3" value="1.000" id="3_1" name="score_3"></td>
            </tr>
            <tr>
              <td>04</td>
              <td>Tiene conocimientos básicos de investigación.</td>
              <td><input type="radio" v-model="questionScore4" value="4.000" id="4_4" name="score_4"></td>
              <td><input type="radio" v-model="questionScore4" value="3.000" id="4_3" name="score_4"></td>
              <td><input type="radio" v-model="questionScore4" value="2.000" id="4_2" name="score_4"></td>
              <td><input type="radio" v-model="questionScore4" value="1.000" id="4_1" name="score_4"></td>
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


  <div class="text-center">

    <v-snackbar
      v-model="tost_exito"
      color="green"
      vertical
    >
      <div class="text-subtitle-1 pb-2">ÉXITO</div>

      <p>{{ tost_exito_mensaje }}</p>

      <template v-slot:actions>
        <v-btn
          color="green"
          variant="text"
          @click="tost_exito = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div> 

 
 
 
  <div class="text-center">


    <v-snackbar
      v-model="tost"
      color="red"
      vertical
    >
      <div class="text-subtitle-1 pb-2">ERROR</div>

      <p>{{ tost_mensaje_error }}</p>

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="tost = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div> 

 
 


  
</template>

<script setup lang="ts">
import axios from "axios";
import DialogConfirm from "@/components/DialogConfirm.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { isForInStatement } from "typescript";


const loading = ref(false);

const headers = ref([]);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const serverItems = ref([]);
const search = ref("");

const dialog = ref(false);

const tost = ref(false);
const tost_exito = ref(false);
const tost_mensaje_error = ref("");
const tost_exito_mensaje = ref("");

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


let questionScore1 = ref(0)
let indicator1 = ref(1)
let questionScore2 = ref(0)
let indicator2 = ref(2)
let questionScore3 = ref(0)
let indicator3 = ref(3)
let questionScore4 = ref(0)
let indicator4 = ref(4)


const editedIndex = ref(-1);

const programas = ref([]);


const convocatorias = [
  { nombre: "CONVOCATORIA 2024", id: 1 },
];

const postulantes = ref([]);

const loadPostulantes = async () => {
  try {
    // const response = await axios.get('http://174.138.178.194:8086/api/postulantes');
    const response = await axios.get('http://segunda_especialidad_felix.test/api/postulantes');
    console.log(response.data)
    postulantes.value = response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const loadProgramas = async () => {
  try {
    const response = await axios.get('https://segundas.unap.pe/api/programas');
    programas.value = response.data;
    console.log(programas.value)

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() =>{
  loadProgramas();
  loadPostulantes();
  tost.value=false;
  tost_exito.value=false;
})

const loadPuntaje = async (Id: number) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/entrevista_puntajes/' + Id);
    console.log(response.data.data);
    return response.data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const loadItems = async ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;

  // let res = await axios.post("http://segundas.unap.pe/api/convocatorias", {
  let res = await axios.post("http://127.0.0.1:8000/api/entrevista", {
    page,
    itemsPerPage,
    sortBy,
    search,
  });

  let data = await res.data; 

  headers.value = data.headers;
  totalItems.value = data.items.total;
  serverItems.value = data.items.data;

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

const editItem = async (item:typeof defaultItem) => {
  console.log(item)

  if(item.Status == 1){
    item.Status = true;
  }
  else{
    item.Status=false;
  }

  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  console.log(editedItem.value)


  try {
    
    const puntajes = ref([]);
    puntajes.value = await loadPuntaje(editedItem.value.Id);
    
    arrayData = puntajes.value;

    console.log(arrayData)

    questionScore1.value = arrayData[0].Score;
    questionScore2.value = arrayData[1].Score;
    questionScore3.value = arrayData[2].Score;
    questionScore4.value = arrayData[3].Score;

  } catch (error) {
    console.error('Error en fetchData:', error);
  }

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
  
  questionScore1.value=0;
  questionScore2.value=0;
  questionScore3.value=0;
  questionScore4.value=0;
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

  if (editedIndex.value === -1) {
    // let res = await axios.post("http://174.138.178.194:8086/api/entrevistastore", {
    let res = await axios.post("http://127.0.0.1:8000/api/entrevistastore", {
      interview: editedItem.value,
      indicators: arrayData

    });
    
    if (res.data.success) {
        console.log('Exitoso.');
        serverItems.value[editedIndex.value] = res.data.data;
        dialog.value = false;
        tost_exito_mensaje.value=res.data.message;
        tost_exito.value=true;
    }else{
        tost_mensaje_error.value=res.data.message;
        tost.value=true;
    } 

  } else {

    console.log(editedItem.value)

    let res = await axios.patch(
      // "http://174.138.178.194:8086/api/entrevista/" + editedItem.value.Id,
      "http://127.0.0.1:8000/api/entrevista/" + editedItem.value.Id,
      {
        interview: editedItem.value,
        indicators: arrayData
      }
    );

    if (res.data.success) {
        serverItems.value[editedIndex.value] = res.data.data;
        dialog.value = false;
        tost_exito_mensaje.value=res.data.message;
        tost_exito.value=true;  
    }else{
        tost.value=true;
        tost_mensaje_error.value=res.data.message;
    }    

    questionScore1.value=0;
    questionScore2.value=0;
    questionScore3.value=0;
    questionScore4.value=0;
  }  
};

/*
const deleteItem = async (item: typeof defaultItem) => {
  await axios.delete(
    "http://174.138.178.194:8086/api/entrevista/" + item.Id
  );

  serverItems.value.splice(serverItems.value.indexOf(item), 1);
};*/

</script>
