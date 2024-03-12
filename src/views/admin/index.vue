<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon>mdi-account-group</v-icon>
            <span class="title ml-2">Postulantes</span>
          </v-card-title>
          <v-card-text class="mt-5">
            <v-btn variant="text" block link :to="'/a/postulants'">
                Ver postulantes
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
// import { useRoute } from 'vue-router';
// const route = useRoute();
</script>
