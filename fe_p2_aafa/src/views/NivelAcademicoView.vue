<script setup lang="ts">
import NivelAcademicoList from '@/components/niveles_academico/NivelAcademicoList.vue'
import NivelAcademicoSave from '@/components/niveles_academico/NivelAcademicoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const nivel_academicoListRef = ref<typeof NivelAcademicoList | null>(null)
const nivel_academicoEdit = ref<any>(null)

function handleCreate() {
  nivel_academicoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(nivel_academico: any) {
  nivel_academicoEdit.value = nivel_academico
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  nivel_academicoListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Nivel Academico</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <NivelAcademicoList ref="nivel_academicoListRef" @edit="handleEdit" />
    <NivelAcademicoSave
      :mostrar="mostrarDialog"
      :nivel_academico="nivel_academicoEdit"
      :modoEdicion="!!nivel_academicoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
