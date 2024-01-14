import { Controller, Get, Post, Body, Put, Delete, Param, Query} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, ApiParam, ApiQuery} from '@nestjs/swagger';
import { Entry } from './blog.entity';
import { BlogService } from './blog.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get()
    @ApiOperation({ summary: 'Retorna todas las entradas del blog' })
    @ApiResponse({ status: 200, description: 'Retorna todas las entradas', type: Entry, isArray: true })
    getAllEntries(): Promise<Entry[]> {
        return this.blogService.getAllEntries();
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Id de la entrada(blog)'})
    @ApiResponse({ status: 200, description: 'Obtiene todas las entradas' })
    getEntryById(@Param('id') id: number): Promise<Entry> {
        return this.blogService.getEntryById(id);
    }

    @Get('search-by-title/:title')
    @ApiParam({ name: 'title', description: 'Titulo de la entrada', required: true })
    @ApiResponse({ status: 200, description: 'Obtiene todas las entradas', type: Entry, isArray: true })
    getEntryByTitle(@Param('title') title: string): Promise<Entry[]> {
        return this.blogService.searchEntriesByTitle(title);
    }

    @Get('search-by-content/:content')
    @ApiParam({ name: 'content', description: 'Contenido de la entrada', required: true})
    @ApiResponse({ status: 200, description: 'Obtiene todas las entradas', type: Entry, isArray: true})
    getEntryByContent(@Param('content') content: string): Promise<Entry[]> {
        return this.blogService.searchEntriesByContent(content);
    }

    @Get('search-by-author/:author')
    @ApiParam({ name: 'author', description: 'Autor de la entrada', required: true})
    @ApiResponse({ status: 200, description: 'Obtiene todas las entradas', type: Entry, isArray: true })
    getEntryByAuthor(@Param('author') author: string): Promise<Entry[]> {
        return this.blogService.searchEntriesByAuthor(author);
    }

    @Post()
    @ApiBody({ type: CreateEntryDto })
    @ApiResponse({ status: 201, description: 'Crea una nueva entrada', type: Entry })
    createEntry(@Body() entry: Entry): Promise<Entry> {
        return this.blogService.createEntry(entry);
    }

    @Put(':id')
    @ApiParam({ name: 'id', description: 'Id de la entrada(blog)'})
    @ApiBody({ type: CreateEntryDto })
    @ApiResponse({ status: 200, description: 'Exito' })
    updateEntry(@Param('id') id: number, @Body() updatedEntry: Entry): Promise<Entry> {
        return this.blogService.updateEntry(id, updatedEntry);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'Id de la entrada(blog)'})
    @ApiResponse({ status: 200, description: 'Exito' })
    deleteEntry(@Param('id') id: number): Promise<void> {
        return this.blogService.deleteEntry(id);
    }
}
