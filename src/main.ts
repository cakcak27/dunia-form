import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';
import { readFileSync } from 'fs';
import { initEngineView } from './common/configs/initEngineView';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('./secrets/private-key.pem'),
    cert: readFileSync('./secrets/public-certificate.pem'),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    httpsOptions
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  
  initEngineView(app);


  await app.listen(3000);
}
bootstrap();
