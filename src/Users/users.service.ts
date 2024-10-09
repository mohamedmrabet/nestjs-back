import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'; 
import { User } from '@prisma/client'; 
import * as bcrypt from 'bcrypt'; 
import { CreateUserDto } from './dtos/CreateUser.dto'; 
import { LoginUserDto } from './dtos/LoginUser.dto';

@Injectable()
export class UsersService {
  jwtService: any;
 
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds); 

    return this.prisma.user.create({
      data: {
        email: data.email,
        image: data.image,
        password: hashedPassword,
        name: data.name,
        role:data.role
      },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new HttpException('Invalid credentials', 401);
    }
    return {
        id: user.id,
        email: user.email,
        name: user.name,
    };
  }


  
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

 async getUserById(id: number) {
   return this.prisma.user.findUnique( {where :{id}})
}


async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return this.prisma.user.delete({ where: { id } });
  }


  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser) {
      throw new HttpException('User Not Found', 404);
    }
    if (data.email) {
      const userWithEmail = await this.prisma.user.findUnique({
        where: { email: data.email as string },
      });
      if (userWithEmail && userWithEmail.id !== id) {
        throw new HttpException('Email already taken', 400);
      }
    }
    if (data.password) {
      const saltOrRounds = 10;
      data.password = await bcrypt.hash(data.password as string, saltOrRounds);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}


