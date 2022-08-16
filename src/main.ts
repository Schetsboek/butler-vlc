import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import Config from './config';
import { exec } from 'child_process';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const vlcLogger = new Logger('VLC instance');
  // Exec a shell command for a single VLC instance, which closes itself when the server shuts down.
  // VLC_PASSWORD is vulnerable for shell injection.
  exec('/usr/bin/vlc -I dummy -I http --one-instance --http-password ' + Config.VLC_PASSWORD);
  vlcLogger.log('Initializing VLC service');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  
  const config = new DocumentBuilder()
    .setTitle('VLC API docs')
    .setDescription('The documentation for interacting with the VLC API.')
    .setVersion(Config.VERSION)
    .addApiKey()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Config.PORT);
}
bootstrap();
