import type { NivelAcademico } from './niveles_academico'

export interface Programa {
  id: number
  idNivelAcademico: number
  nombre: string
  area_conocimiento: string
  descripcion: string
  version: number
  duracion_meses: number
  costo: number
  fecha_inicio: Date
  estado: string
  nivelAcademico: NivelAcademico
}
