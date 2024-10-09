import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.gaurd'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new JwtAuthGuard());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('E-Commerce')
    .setDescription('Todo NestApp Rest Api Docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
