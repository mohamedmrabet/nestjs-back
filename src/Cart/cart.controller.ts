import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  HttpException,
  Param,
  Req,
  Patch,
} from '@nestjs/common';
import { CreateCart} from './Dto/CreateCart.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags('Cart Module')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create a new cart entry' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          example: 1,
          description: 'The ID of the user',
        },
        productId: {
          type: 'number',
          example: 2,
          description: 'The ID of the product',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Cart entry created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createCart(@Body() createCartDto: CreateCart) {
    return this.cartService.createCart(createCartDto);
  }


  @Get()
  getAll() {
    return this.cartService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id', ParseIntPipe) id: number) {
    const cart = await this.cartService.getCartsByUserId(id);
    if (!cart) throw new HttpException('Cart Not Found', 404);
    return cart;
  }

  @Delete(':id')
  async deleteCartByUserId(
    @Param('id', ParseIntPipe) userId: number,
    @Req() req
  ) {
    // Call the service to delete the cart for the user
    const result = await this.cartService.deleteCartByUserId(userId);
  
    return { message: 'Cart deleted successfully' };
  }
  
  
}