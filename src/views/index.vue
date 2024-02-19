<template>
  <v-app app id="inspire">
    <v-main app class="mt-10">
      <PostulantVoucher @onSuccess="" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import PostulantVoucher from "@/components/forms/PostulantVoucher.vue";
const init = async () => {};

init();
</script>
<style lang="scss"></style>
