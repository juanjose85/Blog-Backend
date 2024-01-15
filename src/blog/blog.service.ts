import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Entry } from './blog.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import * as moment from 'moment';

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
    async createEntry(entryDto: CreateEntryDto): Promise<Entry> {
    	const { title, author, publicationDate, content } = entryDto;

	// Parsear la cadena de fecha utilizando Moment.js
	const parsedDate = moment(publicationDate, 'DD/MM/YYYY', true);

	if (!parsedDate.isValid()) {
	  // Manejar el caso en que la fecha no sea válida
	  throw new Error('Fecha de publicación no válida');
	}

	const entry = this.entryRepository.create({ title, author, publicationDate: parsedDate.toDate(), content });
	return this.entryRepository.save(entry);
    }

    // Actualizar una entrada.
    async updateEntry(id: number, updatedEntryDto: CreateEntryDto): Promise<Entry> {
        const entryToUpdate = await this.entryRepository.findOne({
            where: {
                id: id
            }
        });

        if (!entryToUpdate) {
            throw new NotFoundException(`Entrada con ID ${id} no encontrada`);
        }
        
        const { title, author, publicationDate, content } = updatedEntryDto;

	// Parsear la cadena de fecha utilizando Moment.js
	const parsedDate = moment(publicationDate, 'DD/MM/YYYY', true);

	if (!parsedDate.isValid()) {
	  // Manejar el caso en que la fecha no sea válida
	  throw new Error('Fecha de publicación no válida');
	}

        // Actualiza los campos de la entrada con los nuevos datos
        entryToUpdate.title = updatedEntryDto.title;
        entryToUpdate.author = updatedEntryDto.author;
        entryToUpdate.content = updatedEntryDto.content;
        entryToUpdate.publicationDate = parsedDate.toDate();

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
