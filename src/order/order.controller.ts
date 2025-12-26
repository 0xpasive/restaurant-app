import { Body, Controller, Get, Post , ParseUUIDPipe, Param, Query, Delete} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderdto } from './dto/create-order.dto';
import { addItemsToOrderDto } from './dto/add-items-to-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    async createOrder(@Body() orderData: CreateOrderdto){
        return this.orderService.createOrder(orderData);
    };


    //Get all orders
    // if tablenumber query param is provided, filter orders by table number

    @Get()

    async getAllOrders(@Query('tableNumber') tableNumber: number){
       
        if(tableNumber){
            //filter orders by table number
            return this.orderService.getAllOrders()
            .then(orders => orders.filter(order => order.tableNumber === tableNumber));
        }
        return this.orderService.getAllOrders();

    };

    @Post('/add')
    async addItemsToOrder(@Body() body: addItemsToOrderDto){
        
        return this.orderService.addItemsToOrder(body.orderId, body.itemsIds);
    };

    @Delete(':id')
    
    async clearOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.orderService.clearOrder(id);
    };

    @Get(':id/bill')
    async generateOrderBill(@Param('id', ParseUUIDPipe) id: string){
        return this.orderService.geneateOrderBill(id);
    };
}
