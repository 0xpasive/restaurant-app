import { Injectable, NotFoundException } from '@nestjs/common';
import type { Item } from './interfaces/menu.interface';


@Injectable()
export class MenuService {
    private menu: Item[] = [
    {id: 1, name: "Chicken MoMo", price: 120},
    {id: 2, name: "Veg MoMo", price: 100},
    {id: 3, name: "Fried Rice", price: 150},
    {id: 4, name: "Noodles", price: 130},
    ];

    // Returns all menu items
    findAll(): Item[] {
        return this.menu;
    };

    // Returns a single menu item by ID
    findOne(id: number): Item {
        const menuitem = this.menu.find(item => item.id === id);
        if (!menuitem) {
            throw new NotFoundException(`Menu item with id ${id} not found`);  
        }
        return menuitem; 
    };

    // Creates a new menu item
    create(newItem: Omit<Item, 'id'>): Item {
        const newitem: Item = {
            id: this.generateId(),
            ...newItem,
        };
        this.menu.push(newitem);
        return newitem;
        
    };

    // Updates an existing menu item
    update(id: number, updatedItem: Partial<Omit<Item, 'id'>>): Item {
        const itemIndex = this.menu.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            throw new NotFoundException(`Menu item with id ${id} not found`);
        }
        this.menu[itemIndex] = {
            ...this.menu[itemIndex],
            ...updatedItem
        };
        return this.menu[itemIndex];
        
    };

    // Deletes a menu item by ID
    delete(id: number): void {
        const itemIndex = this.menu.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            throw new NotFoundException(`Menu item with id ${id} not found`);
        }
        this.menu.splice(itemIndex, 1);

    };


    
    // Generates a new unique ID for a menu item
    generateId(): number {
        return this.menu.length > 0 ? Math.max(...this.menu.map(item => item.id)) + 1 : 1;
    }
}
