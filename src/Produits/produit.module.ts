import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import {ProduitController} from "src/Produits/produit.controller"
import {ProduitService} from "src/Produits/produit.service"


@Module({
  imports: [PrismaModule],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitsModule {}
