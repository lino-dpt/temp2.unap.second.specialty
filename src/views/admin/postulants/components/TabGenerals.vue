<template>
  <v-toolbar dense>
    <v-toolbar-title>
      <small>
        {{ data?.FullName }}
      </small>
    </v-toolbar-title>
  </v-toolbar>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card title="Datos Generales" rounded="0" elevation="0">
        <v-list-item>
          <v-list-item-subtitle>Nombre Completo</v-list-item-subtitle>
          <v-list-item-title>
            {{ data?.FullName }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle>Fecha de nacimiento</v-list-item-subtitle>
          <v-list-item-title>
            {{ data?.BirthDate }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle>Documento de identidad</v-list-item-subtitle>
          <v-list-item-title>
            {{ data?.DocumentType === "001" ? "DNI" : "CE" }} -
            {{ data?.DocumentNumber }}
          </v-list-item-title>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card title="Datos del Programa" rounded="0" elevation="0">
        <v-list-item>
          <v-list-item-subtitle>Programa academico</v-list-item-subtitle>
          <v-list-item-title>
            {{ data?.AcademicProgramName }}
          </v-list-item-title>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card title="Medios de contacto" rounded="0" elevation="0">
        <v-list-item v-for="item in data?.media_contacts" :key="item.id">
          <v-list-item-subtitle>
            {{ item.Type === "001" ? "Correo Personal" : "Telefono Personal" }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ item.Value }}
          </v-list-item-title>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card title="Ubigeos" rounded="0" elevation="0">
        <v-list-item v-for="item in data?.places" :key="item.id">
          <v-list-item-subtitle>
            {{
              item.Type === "001"
                ? "Lugar de nacimiento"
                : "Lugar de residencia"
            }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ item.Ubigeo }} -
            {{
              `${item.UbigeoData.departamento}, ${item.UbigeoData.provincia}, ${item.UbigeoData.distrito}`
            }}
          </v-list-item-title>
          <v-list-item-title v-if="item.Address">
            <v-icon>mdi-map-marker</v-icon>
            {{ item.Address }}
          </v-list-item-title>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6" v-for="item in data?.documents" :key="item.id">
      <v-card
        :title="item.Type === '001' ? 'Titulo' : 'Foto'"
        rounded="0"
        elevation="0"
      >
        <v-list-item>
          <v-list-item-subtitle>
            {{ item.Name }}
          </v-list-item-subtitle>
        </v-list-item>
        <embed
          v-if="item.Type === '001'"
          :src="item.Path"
          type="application/pdf"
          width="100%"
          height="300px"
        />

        <img v-else :src="item.Path" width="100%" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
defineProps({
  data: Object,
});
</script>
