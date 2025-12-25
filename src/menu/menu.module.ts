import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item])
  ],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
