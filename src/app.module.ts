import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    playground: true
  }), TypeOrmModule.forRoot({
    type: 'mongodb',
    url:
      'mongodb+srv://tam1234:tam1234@cluster0-hdz4w.mongodb.net/test?retryWrites=true',
    entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
  }),
  UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
