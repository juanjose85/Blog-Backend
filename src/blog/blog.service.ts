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

    // Consultar todas las entradas.
    async getAllEntries(): Promise<Entry[]> {
        return this.entryRepository.find();
    }

    // Consultar la entrada por id.
    async getEntryById(id: number): Promise<Entry> {
        return this.entryRepository.findOne({
            where: {
                id: id
            }
        });
    }

    // Crear una nueva entrada.
    async createEntry(entryData: CreateEntryDto): Promise<Entry> {
        const formattedDate = format(entryData.publicationDate, 'dd/MM/yyyy');

        const newEntry = this.entryRepository.create({
            ...entryData,
            publicationDate: formattedDate,
        });
        return this.entryRepository.save(newEntry);
    }

    // Actualizar una entrada.
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

    // Eliminar una entrada.
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

    // Búsqueda por título
    async searchEntriesByTitle(title: string): Promise<Entry[]> {
        await this.entryRepository.find();
        return this.entryRepository.find({ where: { title: Like(`%${title}%`) } });
    }

    // Búsqueda por contenido
    async searchEntriesByContent(content: string): Promise<Entry[]> {
        return this.entryRepository.find({ where: { content: Like(`%${content}%`) } });
    }

    // Búsqueda por author
    async searchEntriesByAuthor(author: string): Promise<Entry[]> {
        return this.entryRepository.find({ where: { author: Like(`%${author}%`) } });
    }
}
