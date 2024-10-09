// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { UserService } from 'src/Users/users.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private configService: ConfigService, // to access environment variables
//     private userService: UserService // to validate user
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('JWT_SECRET'), // JWT secret
//     });
//   }

//   async validate(payload: any) {
//     // Validate the user from the payload
//     const user = await this.userService.findUserById(payload.userId);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user; // returning user attaches it to req.user
//   }
// }
