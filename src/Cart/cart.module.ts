import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import {CartController} from "src/Cart/cart.controller"
import {CartService} from "src/Cart/cart.service"


@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
