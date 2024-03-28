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
            <h1 class="">Resultados</h1>
            <p class="text-caption">Segundas Especialidades</p>
          </div>

          <div class="logo">
            <img src="/logo_unap.png" max-height="50" max-width="180" />
          </div>
        </div>
      </v-container>
    </header>
    <v-main app>
      <v-container>
        <v-card v-for="faculty in faculties" :key="faculty.id">
          <v-toolbar>
            <v-toolbar-title>
              <small>
                {{ faculty.nombre }}
              </small>
            </v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
                sm="6"
                v-for="program in faculty.programs"
                :key="program.id"
              >
                <v-card variant="tonal">
                  <v-card-subtitle class="my-3">
                    Segundas Especialidades
                  </v-card-subtitle>

                  <v-card-text>
                    <b>{{ program.nombre }}</b>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      link
                      :disabled="program.pathFile == null"
                      target="_blank"
                      :href="program.pathFile ? program.pathFile as string : '#'"
                      block
                      color="primary"
                      variant="tonal"
                    >
                      {{
                        program.pathFile ? "Ver Resultados" : "No disponible"
                      }}

                      <v-icon class="ms-3">mdi-file-pdf-box</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
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

const faculties = ref([
  {
    id: 1,
    nombre: "Facultad de Medicina Veterinaria y Zootecnia",
    programs: [
      {
        id: 1,
        nombre: "Salud Pública y Epidemiología",
        pathFile: null,
      },
      {
        id: 2,
        nombre: "Biotecnología de la Reproducción Animal",
        pathFile: null,
      },
      {
        id: 3,
        nombre: "Camélidos Sudamericanos domésticos",
      },
    ],
  },
  {
    id: 2,
    nombre: "Facultad de Ingeniería Económica",
    programs: [
      {
        id: 5,
        nombre: "Formulación y Evaluación de Proyectos de Inversión",
      },
    ],
  },
  {
    id: 3,
    nombre: "Facultad de Enfermería",
    programs: [
      {
        id: 7,
        nombre: "Enfermería en Cuidados Intensivos y Urgencia",
      },
      {
        id: 8,
        nombre: "Enfermería en Pediatría y Neonatología",
      },
      {
        id: 9,
        nombre: "Enfermería en Centro Quirúrgico",
      },
      {
        id: 10,
        nombre: "Enfermería En Gineco Obstetricia.",
      },
      {
        id: 11,
        nombre: "Gerencia y Gestión en Servicio de Salud.",
      },
      {
        id: 12,
        nombre: "Emergencia y Desastres",
      },
      {
        id: 13,
        nombre: "Medicina Complementaria",
      },
      {
        id: 14,
        nombre: "Promoción de la Salud",
      },
      {
        id: 15,
        nombre:
          "Enfermería en Crecimiento Desarrollo y Estimulación Temprana del Niño",
      },
    ],
  },
  {
    id: 4,
    nombre: "Facultad Ingeniería de Minas",
    programs: [
      {
        id: 16,
        nombre: "Seguridad, Salud Ocupacional Medio Ambiente",
      },
    ],
  },
  {
    id: 5,
    nombre: "Facultad Ciencias de la Educación",
    programs: [
      {
        id: 19,
        nombre: "Psicomotricidad",
      },
      {
        id: 20,
        nombre: "Educación Intercultural Bilingüe Aimara y Quecha",
      },
      {
        id: 21,
        nombre: "Ciencias Sociales",
      },
      {
        id: 22,
        nombre: "Educación Básica Alternativa",
      },
      {
        id: 23,
        nombre: "Psicología Educativa",
      },
      {
        id: 24,
        nombre: "Docencia en Idioma Extranjero Ingles",
      },
      {
        id: 25,
        nombre: "Tecnología Computacional e Informática Educativa",
      },
      {
        id: 26,
        nombre: "Gestión y Administración Educativa",
      },
      {
        id: 27,
        nombre: "Didáctica Universitaria",
      },
      {
        id: 28,
        nombre: "Investigación Educativa",
      },
      {
        id: 29,
        nombre: "Actividades Acuáticas y Entrenamiento en Natación",
      },
    ],
  },
  {
    id: 6,
    nombre: "Facultad Ingeniería Geológica y Metalúrgica",
    programs: [
      {
        id: 16,
        nombre: "Seguridad, Salud Ocupacional Medio Ambiente",
      },
    ],
  },
  {
    id: 7,
    nombre: "Facultad Medicina Humana",
    programs: [
      {
        id: 31,
        nombre: "Anestesiología",
      },
      {
        id: 32,
        nombre: "Cirugía General",
      },
      {
        id: 33,
        nombre: "Ginecología y Obstetricia",
      },
      {
        id: 34,
        nombre: "Medicina de Emergencia y Desastres",
      },
      {
        id: 35,
        nombre: "Medicina Familiar y Comunitaria",
      },
      {
        id: 36,
        nombre: "Medicina Interna",
      },
      {
        id: 37,
        nombre: "Ortopedia y Traumatología",
      },
      {
        id: 38,
        nombre: "Pediatría",
      },
      {
        id: 39,
        nombre: "Radiología",
      },
    ],
  },
  {
    id: 8,
    nombre: "Facultad Ciencias Sociales",
    programs: [
      {
        id: 4,
        nombre: "Cultura y Resolución de Conflictos Sociales",
      },
    ],
  },
  {
    id: 9,
    nombre: "Facultad de Ciencias Jurídicas y Políticas",
    programs: [
      {
        id: 6,
        nombre: "Función Jurisdiccional y Procesal",
      },
    ],
  },
  {
    id: 10,
    nombre: "Facultad Ingeniería Estadística e Informática",
    programs: [
      // {
      //   id: 5,
      //   nombre: "Formulación y Evaluación de Proyectos de Inversión",
      // },
    ],
  },
  {
    id: 11,
    nombre: "Facultad Ciencias Biológicas",
    programs: [
      {
        id: 17,
        nombre: "Laboratorio Clínico y Biológicos",
      },
      {
        id: 18,
        nombre: "Banco de Sangre y Hemoterapia",
      },
    ],
  },
  {
    id: 12,
    nombre: "Facultad Ingeniería Química",
    programs: [
      {
        id: 40,
        nombre: "Ingeniería Sanitaria Ambiental",
      },
    ],
  },
]);

const programs = ref([]);
const getPrograms = async () => {
  const response = await fetch("https://data.segundas.unap.edu.pe/api/results");
  const data = await response.json();
  return data;
};

const init = async () => {
  programs.value = await getPrograms();

  faculties.value.map((faculty) => {
    faculty.programs.forEach((program) => {
      const programData = programs.value.find(
        (p) => p.ProgramId === program.id
      );
      if (programData) {
        program.pathFile = programData.Path
          ? "https://data.segundas.unap.edu.pe/uploads/" + programData.Path
          : null;
      }
    });

    return faculty;
  });
};
init();
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
