<template>
  <pre>
    {{ route.params }}
  </pre>
  <PostulantVoucher />
</template>

<script setup lang="ts">
import PostulantVoucher from "@/components/forms/PostulantVoucher.vue";
import CallService from "@/services/CallService";
import { useRoute } from "vue-router";

const route = useRoute();

const callService = new CallService();

//convocatoria

const init = async () => {
  // route.params.slug;
  let callSlug = route.params.slug as string;
  let call = await callService.getCallBySlug(callSlug);
  console.log(call);
};
init();
</script>

<style lang="scss"></style>
