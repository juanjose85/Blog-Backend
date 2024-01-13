import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
      ) {}
    
      async getAllEntries(): Promise<Entry[]> {
        return this.entryRepository.find();
      }
    
      async getEntryById(id: number): Promise<Entry> {
        return this.entryRepository.findOne(id);
      }
    
      async createEntry(entryData: CreateEntryDto): Promise<Entry> {
        const newEntry = this.entryRepository.create(entryData);
        return this.entryRepository.save(newEntry);
      }
    
      // Implementa otras operaciones CRUD según sea necesario
    
      // Ejemplo de una búsqueda por título
      async searchEntriesByTitle(title: string): Promise<Entry[]> {
        return this.entryRepository.find({ where: { title: Like(`%${title}%`) } });
      }
}
