import { Controller, Get, Post, Body, Put, Delete, Param} from '@nestjs/common';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { Entry } from './blog.entity';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Obtiene todas las entradas' })
    getAllEntries(): Promise<Entry[]> {
        return this.blogService.getAllEntries();
    }

    @Get(':id')
    getEntryById(@Param('id') id: number): Promise<Entry> {
        return this.blogService.getEntryById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Crea una nueva entrada' })
    createEntry(@Body() entry: Entry): Promise<Entry> {
        return this.blogService.createEntry(entry);
    }

    @Put(':id')
    updateEntry(@Param('id') id: number, @Body() updatedEntry: Entry): Promise<Entry> {
        return this.blogService.updateEntry(id, updatedEntry);
    }

    @Delete(':id')
    deleteEntry(@Param('id') id: number): Promise<void> {
        return this.blogService.deleteEntry(id);
    }
}
