import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCart {
  @IsInt()
  @IsNotEmpty()
  userId:number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

}
