<script setup lang="ts">
import type { NivelAcademico } from '@/models/niveles_academico'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'niveles-academicos'
const niveles_academicos = ref<NivelAcademico[]>([])
const emit = defineEmits(['edit'])
const nivel_academicoDelete = ref<NivelAcademico | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  niveles_academicos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(nivel_academico: NivelAcademico) {
  emit('edit', nivel_academico)
}

function mostrarEliminarConfirm(nivel_academico: NivelAcademico) {
  nivel_academicoDelete.value = nivel_academico
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${nivel_academicoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

const nivelesAcademicosFiltrados = computed(() => {
  return niveles_academicos.value.filter(
    (nivel_academico) =>
      nivel_academico.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      nivel_academico.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o descripcion" />
      </InputGroup>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(nivel_academico, index) in nivelesAcademicosFiltrados"
          :key="nivel_academico.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ nivel_academico.nombre }}</td>
          <td>{{ nivel_academico.descripcion }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(nivel_academico)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(nivel_academico)"
            />
          </td>
        </tr>
        <tr v-if="nivelesAcademicosFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
