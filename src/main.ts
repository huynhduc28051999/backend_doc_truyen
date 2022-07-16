import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // app.enableCors({
  //   origin: 'http://event-mangement-pro.surge.sh',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // })
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
