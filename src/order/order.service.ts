import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { CreateOrderdto } from './dto/create-order.dto';
import { Bill } from './interface/bill.interface';

@Injectable()
export class OrderService {
    // Injecting the Order and Menu repositories
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ){}


    // Creates a new order
    async createOrder(orderData: CreateOrderdto): Promise<Order>{
        const {tableNumber, itemsIds} = orderData;
        const items = await this.menuRepository.find({
            where: { id: In(itemsIds) },
        })
        if(items.length !== itemsIds.length){
            throw new Error('One or more menu items not found');
        }

        const newOrder = this.orderRepository.create({
            tableNumber,
            items,
        });

        return this.orderRepository.save(newOrder);
    };


    // Retrieves all orders with their associated menu items
    async getAllOrders(): Promise<Order[]>{
        return this.orderRepository.find({
            relations: ['items'],
        });
    };


    //Get order by id
    async getOrderById(id: string): Promise<Order>{
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items'],
        });
        if(!order){
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    };

    //add item to the order/ update the order
    async addItemsToOrder(orderId: string, itemIds: string[]): Promise<Order>{
        const order = await this.getOrderById(orderId);
        const itemsToAdd = await this.menuRepository.find({
            where: { id: In(itemIds) },
        });
        if(itemsToAdd.length !== itemIds.length){
            throw new Error('One or more menu items not found');
        }
        order.items.push(...itemsToAdd);
        return this.orderRepository.save(order);

    };


    //delete the order
    async clearOrder(orderId: string): Promise<void>{
        const order = await this.getOrderById(orderId);
        await this.orderRepository.remove(order);
        
    };

    //generate the bill for the existing order
    async generateOrderBill(orderId: string): Promise<Bill>{
        const order = await this.getOrderById(orderId);

        const items = order.items ?? [];

        const totalAmount = items.reduce(
            (sum, item) => sum + Number(item.price),
            0,
        );

        return {
        tableNumber: order.tableNumber,
        items: items.map(item => item.name),
        totalAmount,
        };
    };
}