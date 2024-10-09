import { IsOptional,IsNotEmpty,IsEmail,IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string; 
  
    @IsOptional()
    @IsString()
    image?: string; 
  
    @IsEmail()
    @IsNotEmpty()
    email: string; 
  
    @IsString()
    @IsNotEmpty()
    password: string; 
  desc: string;
  price: number;
}
