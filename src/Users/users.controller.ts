import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';

@ApiTags('User Module')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signup")
  @ApiOperation({ summary: 'create new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Mohamed',
          description: 'The name of the user',
        },
        image: {
          type: 'string',
          example: 'https://example.com/image.jpg',
          description: 'Optional image URL of the user',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'mohamed@example.com',
          description: 'The email of the user',
        },
        password: {
          type: 'string',
          example: 'mohamed123*',
          description: 'The password of the user',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Create user successfully ...',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'mohamed@example.com',
          description: 'The email of the user',
        },
        password: {
          type: 'string',
          example: 'mohamed123*',
          description: 'The password of the user',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns a token',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  
  @Get()
  @ApiOperation({ summary: 'get All users ...' })

  @ApiResponse({
    status: 200,
    description: 'All Users',schema :{
      type:"array",
      items:{
        type:'object',
        properties:{
          id: {
            type:"integer",
            description:"this is unique id",
            example:'100'
          },
          name:{
            type:"string",
            description:"this is the name",
            example:"user"
          },
          email:{
            type:"string",
            description:"this is the email",
            example:"email"
          },
          image:{
            type:"string",
            description:"this is the image",
            example:"image"
          },
          password: {
            type: 'string',
            example: 'mohamed123*',
            description: 'The password of the user',
          },
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'internel server error',
  })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get One user' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })

  @ApiResponse({
    status: 200,
    description: 'user is here ...',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User Not Found', 404);
    return user;
  }

  @Get()
  getRoot() {
    return { message: 'Welcome to the API!' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the user' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Mohamed',
          description: 'The name of the user',
        },
        image: {
          type: 'string',
          example: 'https://example.com/image.jpg',
          description: 'Optional image URL of the user',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'mohamed@example.com',
          description: 'The email of the user',
        },
        password: {
          type: 'string',
          example: 'mohamed123*',
          description: 'The password of the user',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'user updated successfully ...',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })


  
  updateUserById(@Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  )
  {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:"user delete"
  })
  @ApiParam({
    name:"id",
    type:"integer",
    description:"enter unique id",
    required:true
  })
  @ApiResponse({
    status: 200,
    description: 'user deleted successfully ...',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })

  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }
}
