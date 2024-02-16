<template>
    <h1>Sedes</h1>
    <div style="text-align: center;">

        <v-card title="Crear sedes" width="400" class="mx-auto">            
            <form>
                <v-text-field v-model="form.codigo" :rules="rules" label="Codigo"></v-text-field>
                <v-text-field v-model="form.nombre" :rules="rules" label="Nombre sede"></v-text-field>
                <v-text-field v-model="form.ubigeo" :rules="rules" label="Ubigeo"></v-text-field>
                <v-text-field v-model="form.estado" :rules="rules" label="Estado"></v-text-field> 
                <v-btn @click="save()" block class="mt-2">Enviar</v-btn>
            </form>
        </v-card>
    </div>
    <br>
    <br>
    <v-table>
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="sede in sedes" :key="sede.Id">
            <td>{{ sede.Id }}</td>
            <td>{{ sede.nombre }}</td>
            <td>{{ sede.ubigeo }}</td>
            <td>
                <router-link :to="`/a/sedes/${sede.Id}`"> ver </router-link>
                <router-link :to="`/a/sedes/${sede.Id}`"> eliminar </router-link>
                <button @click="openEditModal(sede)">Editar</button>
            </td>
        </tr>
        </tbody>
    </v-table> 


    <!-- Modal for editing -->
    <v-dialog v-model="editModal" max-width="500px">
      <v-card>
        <v-card-title>Edit Sede</v-card-title>
        <v-card-text>
          <!-- Form for editing data -->
          <v-form @submit.prevent="editarSede">
            <v-text-field v-model="editedSede.codigo" label="Código"></v-text-field>
            <v-text-field v-model="editedSede.nombre" label="Nombre"></v-text-field>
            <v-text-field v-model="editedSede.ubigeo" label="Ubigeo"></v-text-field>
            <v-text-field v-model="editedSede.estado" label="Estado"></v-text-field>

            <v-btn type="submit" color="primary">Guardar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    
</template>

<script setup lang="ts">

import axios from 'axios';
import {ref, Ref, watch } from 'vue';

const _sedes:Ref<object|null>= ref(null); 

const sedes = ref<Sede[]>([]);
 
interface Sede {
  Id: number;
  codigo: string;
  nombre: string;
  ubigeo: string;
  estado: number;
  created_at: string;
  updated_at: string;
}

const form = ref({
  id: null,
  codigo: "",
  nombre: "",
  ubigeo: "",
  estado: "" 
});
 // 'http://segundas.unap.pe/api/sedes/{id}
 const editModal = ref(false);
const editedSede = ref({
  Id: null,
  codigo: '',
  nombre: '',
  ubigeo: '',
  estado: '',
});

const dataUpdated = ref(false);

const openEditModal = (sede) => {
  // Set the data of the selected sede to the modal form
  editedSede.value = { ...sede };
  editModal.value = true;
};

const editarSede = async () => {
  try {
    // Make an Axios request to update the sede
    const response = await axios.patch(`http://segundas.unap.pe/api/sede/${editedSede.value.Id}`, editedSede.value);
    // Handle success
    console.log(response.data);

    // Close the modal after successful update
    editModal.value = false;
    
  } catch (error) {
    // Handle errors
    console.error(error);
  }
};

watch(dataUpdated, (newValue) => {
  if (newValue) {
    get_sedes();
    // Restablece el indicador de actualización a false después de cargar los datos
    dataUpdated.value = false;
  }
});

const get_sedes = async () => {
    try {
        const response = await axios.get('http://segundas.unap.pe/api/sedes', );
        _sedes.value = response.data;
        sedes.value = response.data.data.data || [];
          
    } catch (error) {
        console.error('Error fetching sedes:', error);
    } 
};

const save = async () => {
    let res = await axios.post("http://segundas.unap.pe/api/sede", form.value);
    console.log(res);
};


const rules = [
    (v:any) => !!v || 'You must enter a first name.',
];

get_sedes();

</script>

 