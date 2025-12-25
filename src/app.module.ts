import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './menu/entities/item.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'passs',
      database: 'restaurantdb',
      entities: [Item],
      synchronize: true,

    }),
    MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
