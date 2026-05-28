import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Programa } from './entities/programa.entity';
import { Repository } from 'node_modules/typeorm/browser/repository/Repository';
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { Not } from 'node_modules/typeorm';
import { UpdateNivelesAcademicoDto } from 'src/niveles_academicos/dto/update-niveles_academico.dto';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa) private readonly programaRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    let programa = await this.programaRepository.findOneBy({
      idNivelAcademico: createProgramaDto.idNivelAcademico,
      nombre: createProgramaDto.nombre,
      descripcion: createProgramaDto.descripcion,
    });
    if (programa)
      throw new ConflictException(
        'Ya existe un programa con el mismo nombre, descripción y nivel académico',
      );

    programa = new Programa();
    Object.assign(programa, createProgramaDto);
    return this.programaRepository.save(programa);
  }

  async findAll(): Promise<Programa[]> {
    return this.programaRepository.find({
      relations: { nivelAcademico: true },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programaRepository.findOne({
      where: { id },
      relations: { nivelAcademico: true },
    });
    if (!programa) throw new NotFoundException('No existe un programa con el id proporcionado');
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, updateProgramaDto);
    return this.programaRepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programaRepository.softRemove(programa);
  }
}
