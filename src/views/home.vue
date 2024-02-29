<template>
  <section class="home__banner">
    <div class="overlay"></div>
    <img src="@/assets/images/home-banner.jpg" alt="" />
  </section>

  <v-container>
    <v-card rounded="0">
      <v-toolbar
        color="primary"
        title="Convocatorias"
        density="compact"
        rounded="0"
        class="rounded-0"
      >
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12" md="12" v-for="call in activeCallas" :key="call.Id">
            <v-card variant="tonal">
              <v-card-subtitle class="my-3">
                Segundas Especialidades
              </v-card-subtitle>
              <v-card-title>
                <h3>{{ call.Name }}</h3>
              </v-card-title>
              <v-card-text>
                <p>{{ call.Description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  @click="router.push(`/${call.Slug}/preinscripcion`)"
                >
                  Preinscribirme
                  <v-icon class="ms-3">mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CallService from "@/services/CallService";
const router = useRouter();
const callService = new CallService();
const activeCallas = ref([]);

const init = async () => {
  let calls = await callService.getActiveCalls();
  activeCallas.value = calls;
};
init();
</script>
<style lang="scss">
//paralax effect
.home__banner {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.8) 1px,
      transparent 0.5px
    );
    background-size: 5px 5px;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
