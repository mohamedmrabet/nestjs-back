import { ProduitService } from './produit.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
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
  Patch,
} from '@nestjs/common';
import { CreateProduct } from './dtos/CreateProduct.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Product Module')
@Controller('produit')
export class ProduitController {
  constructor(private produitservice: ProduitService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Product Name',
          description: 'The name of the product',
        },
        price: {
          type: 'number',
          example: 29,
          description: 'The price of the product',
        },
        desc: {
          type: 'string',
          example: 'This is a sample product.',
          description: 'Description of the product',
        },
        image: {
          type: 'string',
          example: 'https://example.com/product.jpg',
          description: 'Optional image URL for the product',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UsePipes(ValidationPipe)
  createProduct(@Body() CreateProductDto: CreateProduct) {
    return this.produitservice.createProduit(CreateProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Array of all products',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'Unique ID', example: 100 },
          name: { type: 'string', description: 'Product name', example: 'Product Name' },
          price: { type: 'number', description: 'Product price', example: 29.99 },
          desc: { type: 'string', description: 'Product description', example: 'Sample description' },
          image: { type: 'string', description: 'Product image URL', example: 'https://example.com/product.jpg' },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getProducts() {
    return this.produitservice.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Enter the unique ID of the product',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product details retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.produitservice.getProductById(id);
    if (!product) throw new HttpException('Product Not Found', 404);
    return product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product details' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Enter the unique ID of the product',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Updated Product Name',
          description: 'The updated name of the product',
        },
        price: {
          type: 'number',
          example: 49.99,
          description: 'The updated price of the product',
        },
        desc: {
          type: 'string',
          example: 'Updated product description',
          description: 'The updated description of the product',
        },
        image: {
          type: 'string',
          example: 'https://example.com/updated-product.jpg',
          description: 'Updated image URL for the product',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  updateProductById(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserDto: UpdateUserDto) {
    return this.produitservice.updateProductById(id, UpdateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Enter the unique ID of the product',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return this.produitservice.deleteProductById(id);
  }
}
