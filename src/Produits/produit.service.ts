import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'; 
import { Produit } from '@prisma/client'; 
import { CreateProduct } from './dtos/CreateProduct.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';


@Injectable()
export class ProduitService {
  constructor(private prisma: PrismaService) {}


  async createProduit(data: CreateProduct) {
    return this.prisma.produit.create({
      data: {
        name: data.name,
        image: data.image,
        desc: data.desc,
        price: data.price,
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.produit.findUnique({ where: { id } });
    if (!product) {
      throw new HttpException('Product Not Found', 404);
    }
    return product;
  }

  async getProducts() {
    return this.prisma.produit.findMany({});
  }

  async updateProductById(id: number, data: UpdateUserDto) {
    const existingProduct = await this.getProductById(id); 
    if (!existingProduct) {
      throw new HttpException('Product Not Found', 404);
    }
    
    return this.prisma.produit.update({
      where: { id },
      data: {
        name: data.name || existingProduct.name, 
        image: data.image || existingProduct.image,
        desc: data.desc || existingProduct.desc,
        price: data.price || existingProduct.price,
      },
    });
  }

  async deleteProductById(id: number) {
    const existingProduct = await this.getProductById(id); 
    if (!existingProduct) {
      throw new HttpException('Product Not Found', 404);
    }

    return this.prisma.produit.delete({
      where: { id },
    });
  }
}