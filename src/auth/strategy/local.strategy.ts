// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { Strategy } from 'passport-local';
// import { UserService } from 'src/Users/users.service';
// import * as bcrypt from 'bcrypt';
// import { User } from '@prisma/client';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private userService: UserService) {
//     super({
//       usernameField: 'email',
//       passwordField: 'password',
//     });
//   }

//   async validate(email: string, password: string): Promise<User> {
//     const user: User = await this.userService.findUserByEmail(email);
//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid password');
//     }
//     return user;
//   }
// }
