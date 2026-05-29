<script setup lang="ts">
import type { Programa } from '@/models/programa'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'

import { computed, ref, watch } from 'vue'

const ENDPOINT = 'programas'

const props = defineProps({
  mostrar: Boolean,
  programa: {
    type: Object as () => Programa,
    default: () => ({}) as Programa,
  },
  modoEdicion: Boolean,
})

const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const programa = ref<Programa>({ ...props.programa })

watch(
  () => props.programa,
  (newVal) => {
    programa.value = { ...newVal }
  },
)

const areasConocimiento = ['Tecnología', 'Salud', 'Educación', 'Ingeniería', 'Economía']

async function handleSave() {
  try {
    const rawIdNivel = programa.value.idNivelAcademico ?? (programa.value as any).idNivelAcademico

    const body = {
      nombre: programa.value.nombre,
      area_conocimiento: programa.value.area_conocimiento,

      idNivelAcademico: rawIdNivel ? parseInt(rawIdNivel as any, 10) : null,

      descripcion: programa.value.descripcion,
      version: programa.value.version ? parseInt(programa.value.version as any, 10) : null,
      duracion_meses: programa.value.duracion_meses
        ? parseInt(programa.value.duracion_meses as any, 10)
        : null,
      costo: programa.value.costo ? parseFloat(programa.value.costo as any) : null,

      // Control de formato para la fecha de inicio
      fecha_inicio:
        programa.value.fecha_inicio instanceof Date
          ? programa.value.fecha_inicio.toISOString().split('T')[0]
          : programa.value.fecha_inicio,

      estado: programa.value.estado || 'activo',
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${programa.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    programa.value = {} as Programa
    dialogVisible.value = false
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message
    alert(Array.isArray(errorMsg) ? errorMsg.join('\n') : errorMsg || 'Error inesperado')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Programa' : 'Crear Programa'"
      style="width: 32rem"
    >
      <div
        class="scrollbar-container"
        style="max-height: 70vh; overflow-y: auto; padding-right: 4px"
      >
        <div class="flex items-center gap-4 mb-4">
          <label for="nombre" class="font-semibold w-24">Nombre</label>
          <InputText
            id="nombre"
            v-model="programa.nombre"
            class="flex-auto"
            autocomplete="off"
            autofocus
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="area_conocimiento" class="font-semibold w-24">Área</label>
          <Select
            id="area_conocimiento"
            v-model="programa.area_conocimiento"
            :options="areasConocimiento"
            placeholder="Seleccione un área"
            class="flex-auto"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="idNivelAcademico" class="font-semibold w-24">idNivelAcademico</label>
          <InputNumber
            id="idNivelAcademico"
            v-model="programa.idNivelAcademico"
            class="flex-auto"
            autocomplete="off"
            :useGrouping="false"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="version" class="font-semibold w-24">Versión</label>
          <InputNumber
            id="version"
            v-model="programa.version"
            class="flex-auto"
            autocomplete="off"
            :useGrouping="false"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="duracion_meses" class="font-semibold w-24">Meses</label>
          <InputNumber
            id="duracion_meses"
            v-model="programa.duracion_meses"
            class="flex-auto"
            autocomplete="off"
            :useGrouping="false"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="costo" class="font-semibold w-24">Costo</label>
          <InputNumber
            id="costo"
            v-model="programa.costo"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            class="flex-auto"
            autocomplete="off"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="fecha_inicio" class="font-semibold w-24">F. Inicio</label>
          <DatePicker
            id="fecha_inicio"
            v-model="programa.fecha_inicio"
            dateFormat="yy-mm-dd"
            class="flex-auto"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="estado" class="font-semibold w-24">Estado</label>
          <InputText id="estado" v-model="programa.estado" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="descripcion" class="font-semibold w-24">Descripción</label>
          <Textarea
            id="descripcion"
            v-model="programa.descripcion"
            rows="2"
            class="flex-auto"
            maxlength="2000"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>
