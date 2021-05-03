import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlujoModule } from './flujo/flujo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/remtools'),
    FlujoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
