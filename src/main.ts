import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe());
  await app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('NestJs Company Managements')
    .setDescription('The Description for Company Managements.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${ port }`);
}

bootstrap();
