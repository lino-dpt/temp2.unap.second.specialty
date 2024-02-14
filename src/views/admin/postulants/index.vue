<template>
  <h1>Postulantes</h1>
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
      <tr v-for="postulant in postulants" :key="postulant.id">
        <td>{{ postulant.name }}</td>
        <td>{{ postulant.lastname }}</td>
        <td>{{ postulant.email }}</td>
        <td>
          <router-link :to="`/a/postulants/${postulant.id}`"> ver </router-link>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
const postulants = [
  {
    id: 1,
    name: "Juan",
    lastname: "Perez",
    email: "",
  },
  {
    id: 2,
    name: "Maria",
    lastname: "Lopez",
    email: "",
  },
  {
    id: 3,
    name: "Pedro",
    lastname: "Gomez",
    email: "",
  },
];
</script>
