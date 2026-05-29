import { NivelesAcademico } from 'src/niveles_academicos/entities/niveles_academico.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('programas')
export class Programa {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_nivel_academico' })
  idNivelAcademico: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 2000 })
  descripcion: string;

  @Column('integer')
  version: number;

  @Column('integer')
  duracion_meses: number;

  @Column('decimal', { precision: 10, scale: 2 })
  costo: number;

  @Column('date')
  fecha_inicio: Date;

  @Column('varchar', { length: 20 })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fecha_actualizacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fecha_eliminacion: Date;

  @ManyToOne(() => NivelesAcademico, nivelAcademico => nivelAcademico.programas)
  @JoinColumn({ name: 'id_nivel_academico', referencedColumnName: 'id' })
  nivelAcademico: NivelesAcademico;

  @Column('varchar', { length: 100 })
  area_conocimiento: string;
}
