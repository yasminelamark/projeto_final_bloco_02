/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
                });
    }

    async findById(id: number): Promise<Categoria> {

        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
                });

        if (!categoria)
            throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findByTipo(tipo: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            },
                })
    }

    async create(Categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(Categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {

        const buscaCategoria = await this.findById(categoria.id);

        if (!buscaCategoria || !categoria.id)
            throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {

        const buscaCategoria = await this.findById(id);

        if (!buscaCategoria)
            throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);

    }

}