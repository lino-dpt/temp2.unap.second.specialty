<template>
  <v-toolbar>
    <v-list-item subtitle="Pulicacion de resultados" title="Resultados" />
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-card>
    {{ programs }}
  </v-card>
</template>
<script setup lang="ts">
defineProps({
  programs: Array,
});
</script>
