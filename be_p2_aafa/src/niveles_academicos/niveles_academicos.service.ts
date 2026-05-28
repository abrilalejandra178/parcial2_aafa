import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelesAcademicoDto } from './dto/create-niveles_academico.dto';
import { UpdateNivelesAcademicoDto } from './dto/update-niveles_academico.dto';
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { NivelesAcademico } from './entities/niveles_academico.entity';
import { Repository } from 'node_modules/typeorm/browser/repository/Repository';

@Injectable()
export class NivelesAcademicosService {
  constructor(
    @InjectRepository(NivelesAcademico)
    private nivelesAcademicoRepository: Repository<NivelesAcademico>,
  ) {}

  async create(createNivelesAcademicoDto: CreateNivelesAcademicoDto): Promise<NivelesAcademico> {
    let nivelesAcademico = await this.nivelesAcademicoRepository.findOneBy({
      nombre: createNivelesAcademicoDto.nombre,
      descripcion: createNivelesAcademicoDto.descripcion,
    });
    if (nivelesAcademico) {
      throw new ConflictException('El nivel académico ya existe');
    }
    nivelesAcademico = new NivelesAcademico();
    Object.assign(nivelesAcademico, createNivelesAcademicoDto);
    return this.nivelesAcademicoRepository.save(nivelesAcademico);
  }

  async findAll(): Promise<NivelesAcademico[]> {
    return this.nivelesAcademicoRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<NivelesAcademico> {
    const nivelesAcademico = await this.nivelesAcademicoRepository.findOneBy({ id });
    if (!nivelesAcademico) {
      throw new NotFoundException('El nivel académico no existe');
    }
    return nivelesAcademico;
  }

  async update(
    id: number,
    updateNivelesAcademicoDto: UpdateNivelesAcademicoDto,
  ): Promise<NivelesAcademico> {
    const nivelesAcademico = await this.findOne(id);
    Object.assign(nivelesAcademico, updateNivelesAcademicoDto);
    return this.nivelesAcademicoRepository.save(nivelesAcademico);
  }

  async remove(id: number): Promise<NivelesAcademico> {
    const nivelesAcademico = await this.findOne(id);
    return this.nivelesAcademicoRepository.softRemove(nivelesAcademico);
  }
}
