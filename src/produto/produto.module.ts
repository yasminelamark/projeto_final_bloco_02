/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from "../categoria/services/categoria.service";
import { ProdutoController } from "./controllers/produto.controller";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categoria/categoria.module";
import { ProdutoService } from "./services/produto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]),CategoriaModule],
    providers: [ProdutoService, CategoriaService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
       })
        export class ProdutoModule{ }