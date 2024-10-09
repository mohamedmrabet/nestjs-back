import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  desc: string;
}
