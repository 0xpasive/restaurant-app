import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import type { Item } from './interfaces/menu.interface';





@Controller('menu')
export class MenuController {
    //Inject MenuService in this controller
    constructor(private readonly menuService: MenuService) {}

    //GET /menu?search=keyword
    //GET /menu 
    // Get all the items from the menu or search by name.
    @Get()
    getMenu(@Query('search') search?: string): Item[] {
        const menu = this.menuService.findAll();
        if (search) {
            return menu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        return menu;
    };

    //GET /menu/:id
    // Get a single item from the menu.
    @Get(':id')
    getSingleItem(@Param('id', ParseIntPipe) id: number): Item {
        return this.menuService.findOne(id);
    };

    //POST /menu
    // Create a new menu item.
    @Post()
    @HttpCode(HttpStatus.CREATED)
    
    createItem(@Body() newItem: Omit<Item, 'id'>): string {
        const item =  this.menuService.create(newItem);
        return (`The item has been created: ${JSON.stringify(item)}`);
    };

    //PUT /menu/:id
    // Update an existing menu item.
    @Put(':id')
    updateItem(@Param('id', ParseIntPipe) id: number, @Body() updatedItem: Partial<Omit<Item, 'id'>>): string {
        const item = this.menuService.update(id, updatedItem);
        return (`The item has been updated: ${JSON.stringify(item)}`);
    };

    //DELETE /menu/:id
    // Delete a menu item.
    @Delete(':id')
    deleteItem(@Param('id', ParseIntPipe) id: number): string {
        this.menuService.delete(id);
        return (`The item with id ${id} has been deleted.`);
    };
    
    
}
