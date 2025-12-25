import { Injectable, NotFoundException } from '@nestjs/common';
import type { Item as Itemtype } from './interfaces/item.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';


@Injectable()
export class MenuService {
    
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ){}

    // Returns all menu items
    async findAll(): Promise<Itemtype[]> {
        return this.itemRepository.find();
    };

    // Returns a single menu item by ID
    async findOne(id: string): Promise<Itemtype> {
        const item = await this.itemRepository.findOneBy({ id: id });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;

        
    };

    // Creates a new menu item
    async create(newItem: CreateItemDto): Promise<Itemtype> {
        const item = this.itemRepository.create(newItem);

        return this.itemRepository.save(item);
    };

    // Updates an existing menu item
    async update(id: string, updatedItem: UpdateItemDto): Promise<Itemtype> {
        const item = await this.itemRepository.preload({ id, ...updatedItem });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return this.itemRepository.save(item);
        
        
    };

    // Deletes a menu item by ID
    async delete(id: string): Promise<void> {
        const item = await this.itemRepository.findOneBy({ id: id });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        await this.itemRepository.remove(item);

       
    };


    
    
    
}
