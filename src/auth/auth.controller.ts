import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() loginDto: LoginDto) {
    // Extract the authenticated user from req.user
    const user = req.user;

    // Construct the JWT payload
    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Sign and return the JWT token
    return { token: this.jwtService.sign(payload) };
  }
}
