import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Entry } from './blog.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { format } from 'date-fns';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
    ) { }

    async getAllEntries(): Promise<Entry[]> {
        return this.entryRepository.find();
    }

    async getEntryById(id: number): Promise<Entry> {
        return this.entryRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async createEntry(entryData: CreateEntryDto): Promise<Entry> {
        const formattedDate = format(entryData.publicationDate, 'dd/MM/yyyy');

        const newEntry = this.entryRepository.create({
            ...entryData,
            publicationDate: formattedDate,
        });
        return this.entryRepository.save(newEntry);
    }

    async updateEntry(id: number, updatedEntry: Entry): Promise<Entry> {
        const entryToUpdate = await this.entryRepository.findOne({
            where: {
                id: id
            }
        });

        if (!entryToUpdate) {
            throw new NotFoundException(`Entrada con ID ${id} no encontrada`);
        }

        // Actualiza los campos de la entrada con los nuevos datos
        entryToUpdate.title = updatedEntry.title;
        entryToUpdate.author = updatedEntry.author;
        entryToUpdate.content = updatedEntry.content;
        entryToUpdate.publicationDate = new Date(format(updatedEntry.publicationDate, 'dd/MM/yyyy'));

        return this.entryRepository.save(entryToUpdate);
    }

    async deleteEntry(id: number): Promise<void> {
        if (!id)
            throw new Error(`update error: id is empty.`);
        try {
            const entryDB = await this.entryRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!entryDB)
                throw new Error(`Error during remove, item not found => id: ${id}}`);
            await this.entryRepository.remove([entryDB]);
        }
        catch (ex) {
            throw new Error(`remove error: ${ex.message}.`);
        }
    }

    // Ejemplo de una búsqueda por título
    async searchEntriesByTitle(title: string): Promise<Entry[]> {
        return this.entryRepository.find({ where: { title: Like(`%${title}%`) } });
    }
}