import { IsNotEmpty, IsOptional, IsString, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; 

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string; 

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string; 


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string; 

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role:string;

}
