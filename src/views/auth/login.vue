<template>
  <v-app class="app-default">
    <header class="header-default">
      <div class="shape-1"></div>
      <div class="shape-2"></div>
      <div class="shape-3"></div>
      <v-container class="h-100">
        <div class="header__content">
          <div class="text text-white">
            <p class="text-caption">
              Universidad Nacional del Altiplano - Puno
            </p>
            <h1 class="">Iniciar Sesión</h1>
            <p class="text-caption">Segundas Especialidades</p>
          </div>

          <div class="logo">
            <img src="/logo_unap.png" max-height="50" max-width="180" />
          </div>
        </div>
      </v-container>
    </header>
    <v-main app>
      <v-container class="my-10">
        <v-form ref="formRef" @submit.prevent="submit">
          <v-card class="mx-auto" max-width="380px">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="Correo/Usuario"
                    prepend-inner-icon="mdi-account"
                    :rules="[isRequired]"
                    :clearable="false"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    prepend-inner-icon="mdi-key"
                    :append-inner-icon="
                      passwordHide ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="passwordHide ? 'password' : 'text'"
                    @click:append-inner="() => (passwordHide = !passwordHide)"
                    label="Contraseña"
                    :rules="[isRequired]"
                    :clearable="false"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn color="primary" type="submit" :loading="loading">
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
    </v-main>
    <v-footer app absolute class="bg-secondary text-center">
      <v-container>
        <p class="text-primary">
          © {{ new Date().getFullYear() }} Universidad Nacional del Altiplano -
          Puno | OTI
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";
import { isRequired } from "@/helpers/validations";
import AuthService from "@/services/AuthService";

const loading = ref(false);

const formRef = ref(null);
const passwordHide = ref(true);
const authService = new AuthService();

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  loading.value = true;

  let res = await authService.signIn(form.value);
  if (res.status === true) {
    router.push("/a");
    loading.value = false;
    return;
  }
  loading.value = false;
};
</script>
<style lang="scss">
.app-default {
  .v-main {
    padding-top: 0;
  }
}
.header-default {
  position: relative;
  width: 100%;
  //que el header tenga una altura menor segun el tamaño de la pantalla

  height: 10rem;
  background-color: darken($primary, 5);
  z-index: 10;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  .header__content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 20;
    height: 100%;
    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h1 {
        font-weight: 700;
        font-size: 1.8rem;
        line-height: 2.2rem;
      }
      p {
        font-weight: 500;
        font-size: 1.2rem;
      }
    }
    .logo {
      img {
        max-width: 80px;
      }
    }
  }
  .shape-1 {
    position: absolute;
    z-index: 12;
    top: 0;
    left: 0;
    width: 40%;
    aspect-ratio: 1;
    background-image: linear-gradient(
      to bottom,
      darken($primary, 2),
      lighten($primary, 1)
    );
    rotate: 45deg;
    border-radius: 2rem;
    transform: translate(-50%, 5%);
    transition: width 0.3s ease-in-out;
  }
  .shape-2 {
    position: absolute;
    z-index: 12;
    top: 0;
    right: 0;
    width: 40%;
    aspect-ratio: 1;
    background-image: linear-gradient(
      to bottom,
      darken($primary, 2),
      lighten($primary, 1)
    );
    rotate: 45deg;
    border-radius: 2rem;
    transform: translate(50%, -5%);
    transition: width 0.3s ease-in-out;
  }

  .shape-3 {
    position: absolute;
    z-index: 12;
    bottom: 0;
    right: 0;
    width: 40%;
    aspect-ratio: 1;
    background-image: linear-gradient(
      to bottom,
      darken($primary, 2),
      lighten($primary, 1)
    );
    rotate: 45deg;
    border-radius: 2rem;
    transform: translate(-40%, -5%);
    transition: width 0.3s ease-in-out;
  }

  @media screen and (max-width: 1000px) {
    height: 8rem;
    .header__content {
      .text {
        h1 {
          font-size: 1.2rem;
          line-height: 1.4rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
      .logo {
        img {
          max-width: 60px;
        }
      }
    }
    .shape-1 {
      width: 50%;
    }
  }
  @media screen and (max-width: 600px) {
    height: 6rem;
    .header__content {
      .text {
        h1 {
          line-height: 1.2rem;
          font-size: 1rem;
        }
        p {
          font-size: 0.6rem;
        }
      }
      .logo {
        img {
          max-width: 40px;
        }
      }
    }
    .shape-1 {
      width: 60%;
    }
  }
}
</style>
