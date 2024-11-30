import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  constructor(@InjectConnection() private readonly connection: Connection) {
    if (this.connection.readyState === 1) {
      console.log(`MongoDB is connected into development db`);
    } else {
      console.log('DB is not connected!');
    }
  }
}
