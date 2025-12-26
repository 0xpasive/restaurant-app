import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';


@Injectable()
export class MenuService {
    // Injecting the Menu repository
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ){}

    // Returns all menu items
    async findAll(): Promise<Menu[]> {
        return this.menuRepository.find();
    };

    // Returns a single menu item by ID
    async findOne(id: string): Promise<Menu> {
        const item = await this.menuRepository.findOneBy({ id: id });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;

        
    };

    // Creates a new menu item
    async create(newItem: CreateMenuDto): Promise<Menu> {
        const item = this.menuRepository.create(newItem);

        return this.menuRepository.save(item);
    };

    // Updates an existing menu item
    async update(id: string, updatedItem: UpdateMenuDto): Promise<Menu> {
        const item = await this.menuRepository.preload({ id, ...updatedItem });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return this.menuRepository.save(item);
        
        
    };

    // Deletes a menu item by ID
    async delete(id: string): Promise<void> {
        const item = await this.menuRepository.findOneBy({ id: id });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        await this.menuRepository.remove(item);
       
    };

}
