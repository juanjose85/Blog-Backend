import { Controller } from '@nestjs/common';

@ApiTags('Blog')
@Controller('post')
export class PostController {
    @Get()
    @ApiResponse({ status: 200, description: 'Obtiene todas las entradas' })
    async getAllPosts(): Promise<Entry[]> {
        // Implementa la lógica para obtener todas las entradas
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Crea una nueva entrada' })
    async createPost(@Body() entryDto: CreateEntryDto): Promise<Entry> {
        // Implementa la lógica para crear una nueva entrada
    }
}
