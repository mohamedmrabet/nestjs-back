import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCart } from './Dto/CreateCart.dto';

@Injectable()
export class CartService {

  constructor(private prisma: PrismaService) {}

  async createCart(data: CreateCart) {
    return this.prisma.cart.create({
      data: {
        userId: data.userId,
        produitId: data.productId,
      },
    });
  }


  async getAll() {
    return this.prisma.cart.findMany({});
  }

  async getCartsByUserId(userId: number) {
    const carts = await this.prisma.cart.findMany({
      where: { userId },
      include: {
        produit: true, 
      },
    });
  
    if (carts.length === 0) {
      throw new HttpException('No carts found for this user', 404);
    }
  
    return carts;
  }
  
  async deleteCartByUserId(id: number) {
    // Find the cart for the user
    const cart = await this.prisma.cart.findFirst({
      where: {
        id, 
      },
    });
  
    // If no cart is found, throw an error
    if (!cart) {
      throw new HttpException('Cart not found for this user', 404);
    }
  
    // Delete the cart and return the result
    return this.prisma.cart.delete({
      where: {
        id,  
      },
    });
  }
  
  

}
