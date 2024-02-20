<template>
  <v-app>
    <v-main class="py-5">
      <v-form ref="formRef" @submit.prevent="submit">
        <v-card class="mx-auto" max-width="350px">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Usuario"
                  append-inner-icon="mdi-account"
                  :rules="[isRequired]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :append-inner-icon="passwordHide ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordHide ? 'password' : 'text'"
                  @click:append-inner="() => (passwordHide = !passwordHide)"
                  label="Contraseña"
                  :rules="[isRequired]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn color="primary" type="submit" block variant="flat"
              >Ingresar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { isRequired } from "@/helpers/validations";

const formRef = ref(null);
const passwordHide = ref(true);

const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
};
</script>
