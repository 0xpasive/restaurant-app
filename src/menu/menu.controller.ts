import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';






@Controller('menu')
export class MenuController {
    //Inject MenuService in this controller
    constructor(private readonly menuService: MenuService) {}

    //GET /menu?search=keyword
    //GET /menu 
    // Get all the items from the menu or search by name.
    @Get()
    async findAll() : Promise<Item[]> {
        return this.menuService.findAll();
    };

    //GET /menu/:id
    // Get a single item from the menu.
    @Get(':uuid')
    async findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Item> {
        return this.menuService.findOne(uuid);
    };


    //POST /menu
    // Create a new menu item.
    @Post()
    async createItem(@Body() newItem: CreateItemDto): Promise<Item> {
        return this.menuService.create(newItem);
    };

    //PUT /menu/:id
    // Update an existing menu item.
    @Put(':id')
    async updateItem(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatedItem: UpdateItemDto
    ): Promise<Item> {
        return this.menuService.update(id, updatedItem);
    };

    //DELETE /menu/:id
    // Delete a menu item.
    @Delete(':id')
    async deleteItem(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.menuService.delete(id);
    };
    
    
}
