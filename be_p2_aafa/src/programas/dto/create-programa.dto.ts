import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramaDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del nivel académico es obligatorio' })
  @IsInt({ message: 'El id del nivel académico debe ser un número entero' })
  readonly idNivelAcademico: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede tener mas de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(2000, { message: 'La descripción no puede tener más de 2000 caracteres' })
  readonly descripcion: string;

  @ApiProperty()
  @IsInt({ message: 'La versión debe ser un número entero' })
  @IsDefined({ message: 'La versión es obligatoria' })
  readonly version: number;

  @ApiProperty()
  @IsInt({ message: 'La duración en meses debe ser un número entero' })
  @IsDefined({ message: 'La duración en meses es obligatoria' })
  readonly duracion_meses: number;

  @ApiProperty()
  @IsDefined({ message: 'El costo es obligatorio' })
  readonly costo: number;

  @ApiProperty()
  @IsDefined({ message: 'La fecha de inicio es obligatoria' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha valida' })
  readonly fecha_inicio: Date;

  @ApiProperty()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El estado no puede tener más de 50 caracteres' })
  @IsDefined({ message: 'El estado es obligatorio' })
  readonly estado: string;
}
