import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';






@Controller('menu')
export class MenuController {
    //Inject MenuService in this controller
    constructor(private readonly menuService: MenuService) {}

    //GET /menu?search=keyword
    //GET /menu 
    // Get all the items from the menu or search by name.
    @Get()
    async findAll() : Promise<Menu[]> {
        return this.menuService.findAll();
    };

    //GET /menu/:id
    // Get a single item from the menu.
    @Get(':uuid')
    async findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Menu> {
        return this.menuService.findOne(uuid);
    };


    //POST /menu
    // Create a new menu item.
    @Post()
    async createItem(@Body() newItem: CreateMenuDto): Promise<Menu> {
        return this.menuService.create(newItem);
    };

    //PUT /menu/:id
    // Update an existing menu item.
    @Put(':id')
    async updateItem(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatedItem: UpdateMenuDto
    ): Promise<Menu> {
        return this.menuService.update(id, updatedItem);
    };

    //DELETE /menu/:id
    // Delete a menu item.
    @Delete(':id')
    async deleteItem(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.menuService.delete(id);
    };
    
    
}
