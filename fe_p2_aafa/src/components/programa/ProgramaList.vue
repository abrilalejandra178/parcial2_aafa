<script setup lang="ts">
import type { Programa } from '@/models/programa'
import http from '@/plugins/axios'

import Button from 'primevue/button'

import { onMounted, ref } from 'vue'

const ENDPOINT = 'programas'

const programas = ref<Programa[]>([])

const emit = defineEmits(['edit'])

async function obtenerLista() {
  programas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(programa: Programa) {
  emit('edit', programa)
}

async function eliminar(id: number) {
  if (confirm('¿Está seguro de eliminar el registro?')) {
    await http.delete(`${ENDPOINT}/${id}`)
    obtenerLista()
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({
  obtenerLista,
})
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nivel Académico</th>
          <th>Nombre</th>
          <th>Área Conocimiento</th>
          <th>Descripción</th>
          <th>Versión</th>
          <th>Duración (Meses)</th>
          <th>Costo</th>
          <th>Fecha Inicio</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="programa in programas" :key="programa.id">
          <td>
            {{ programa.nivelAcademico?.nombre }}
          </td>

          <td>{{ programa.nombre }}</td>

          <td>{{ programa.area_conocimiento }}</td>

          <td>{{ programa.descripcion }}</td>

          <td>{{ programa.version }}</td>

          <td>{{ programa.duracion_meses }}</td>

          <td>{{ programa.costo }}</td>

          <td>{{ programa.fecha_inicio }}</td>

          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(programa)" />

            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="eliminar(programa.id!)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
