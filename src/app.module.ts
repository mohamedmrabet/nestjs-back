import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module'; 
import { PrismaService } from './prisma/prisma.service'; 
import { ProduitsModule } from './Produits/produit.module';
import { CartModule } from './Cart/cart.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,ProduitsModule,CartModule], 
  controllers: [],
  providers: [], 
})
export class AppModule {}
