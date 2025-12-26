import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu/entities/menu.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'passs',
      database: 'restaurantdb',
      entities: [Menu, Order],
      synchronize: true,

    }),
    MenuModule,
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
