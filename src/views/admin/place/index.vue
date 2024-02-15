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
        <tr v-for="postulant in sedes" :key="postulant.codigo">
            <td>{{ postulant.codigo }}</td>
            <td>{{ postulant.nombre }}</td>
            <td>{{ postulant.ubigeo }}</td>
            <td>
            <router-link :to="`/a/postulants/${postulant.codigo}`"> ver </router-link>
            </td>
        </tr>
        </tbody>
    </v-table> 
    
</template>

<script setup lang="ts">

import axios from 'axios';
import {ref, Ref } from 'vue';

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
 
const get_sedes = async () => {
    try {
        const response = await axios.get('http://segundas.unap.pe/api/sedes', );
        _sedes.value = response.data;
        sedes.value = response.data.data.data || [];
          
    } catch (error) {
        console.error('Error fetching sedes:', error);
    } 
};
get_sedes();
  
const save = async () => {
    let res = await axios.post("http://segundas.unap.pe/api/sede", form.value);
    console.log(res);
};


const rules = [
    (v:any) => !!v || 'You must enter a first name.',
];
</script>

 