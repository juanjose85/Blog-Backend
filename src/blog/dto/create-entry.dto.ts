
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEntryDto {
  @ApiProperty({ description: 'Enuncia el contenido de la entrada', example: 'Mi entrada' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'El nombre de quien publica la entrada', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: 'Fecha en que la entrada fue guardada', example: 'dd/mm/aaaa' })
  @IsNotEmpty()
  publicationDate: Date;

  @ApiProperty({ description: 'Un escrito breve, una idea o pensamiento.', example: 'Contenido de mi entrada' })
  @IsNotEmpty()
  @IsString()
  content: string;
}