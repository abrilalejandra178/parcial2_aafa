import { Programa } from 'src/programas/entities/programa.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('niveles_academicos')
export class NivelesAcademico {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 20 })
  nombre: string;

  @Column('varchar', { length: 500 })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fecha_actualizacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fecha_eliminacion: Date;

  @OneToMany(() => Programa, programa => programa.nivelAcademico)
  programas: Programa[];
}
