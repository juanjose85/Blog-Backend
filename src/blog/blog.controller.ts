import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get()
    getAllBlogs(): Promise<Blog[]> {
        return this.blogService.getAllBlogs();
    }

    @Get(':id')
    getBlogById(@Param('id') id: string): Promise<Blog> {
        return this.blogService.getBlogById(id);
    }

    @Post()
    createBlog(@Body() blog: Blog): Promise<Blog> {
        return this.blogService.createBlog(blog);
    }

    @Put(':id')
    updateBlog(@Param('id') id: string, @Body() updatedBlog: Blog): Promise<Blog> {
        return this.blogService.updateBlog(id, updatedBlog);
    }

    @Delete(':id')
    deleteBlog(@Param('id') id: string): Promise<Blog> {
        return this.blogService.deleteBlog(id);
    }
}
