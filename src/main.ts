import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }));

    const swaggerConfig = new DocumentBuilder()
        .setTitle("WAYU APIs")
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()

    const swaggerDoc = SwaggerModule.createDocument(app,swaggerConfig)
    SwaggerModule.setup('/wayu',app,swaggerDoc)
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
