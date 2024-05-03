/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)

        private ProdutoRepository: Repository<Produto>,
        private categoriaService:CategoriaService

        ){}

        async findAll(): Promise<Produto[]>{
            return await this.ProdutoRepository.find({
                relations: {categoria: true,}
            });

        }
        async findById(id:number): Promise<Produto> {
            let produto = await this.ProdutoRepository.findOne({
                where:{id},
                relations: {categoria: true}
            });

            if (!produto)
                throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND);
                        return produto;
        }
          async findByNome(nome: string): Promise<Produto[]>{
            return await this.ProdutoRepository.find({
                where:{nome: ILike(`%${nome}%`)},
                relations: {categoria: true,}
                        })
     }    
     async create(produto: Produto): Promise<Produto>{
        if (produto.categoria){
            let categoria = await this.categoriaService.findById(produto.categoria.id)
            if(!categoria)
                throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

            return await this.ProdutoRepository.save(produto);

        }
            return await this.ProdutoRepository.save(produto);
     }


     async upDate(produto: Produto): Promise<Produto>{
let buscaProduto: Produto = await this.findById(produto.id);
if(!buscaProduto || !produto.id)
    throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)

if (produto.categoria){
    let categoria =await this.categoriaService.findById(produto.categoria.id)

    if (!categoria)
        throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)

    return await this.ProdutoRepository.save(produto);
}

return await this.ProdutoRepository.save(produto);
     }

async delete(id:number): Promise<DeleteResult>{
let buscaProduto: Produto = await this.findById(id);
if(!buscaProduto)
    throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)
return await this.ProdutoRepository.delete(id);    

}}