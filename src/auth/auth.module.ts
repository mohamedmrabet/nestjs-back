// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { UsersModule } from 'src/Users/users.module';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './strategy/jwt.strategy';
// import { LocalStrategy } from './strategy/local.strategy';

// @Module({
//   imports: [
//     PassportModule,
//     UsersModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get('JWT_KEY'),
//         signOptions: {
//           expiresIn: configService.get<string>('JWT_EXPIRE') + 's', // "60s"
//         },
//       }),
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [LocalStrategy, JwtStrategy],
// })
// export class AuthModule {}
