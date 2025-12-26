import { Body, Controller, Get, Post , ParseUUIDPipe, Param, Query, Delete} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderdto } from './dto/create-order.dto';
import { addItemsToOrderDto } from './dto/add-items-to-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    //Create a new order
    // POST /order
    @Post()
    async createOrder(@Body() orderData: CreateOrderdto){
        return this.orderService.createOrder(orderData);
    };


    //Get all orders
    // if tablenumber query param is provided, filter orders by table number
    //GET  /order?tableNumber=1
    //GET /order
    @Get()
    async getAllOrders(@Query('tableNumber') tableNumber: number){
       
        if(tableNumber){
            //filter orders by table number
            return this.orderService.getAllOrders()
            .then(orders => orders.filter(order => order.tableNumber === tableNumber));
        }
        return this.orderService.getAllOrders();

    };

    //add order / create order
    //POST /order/add
    // {
    //    "orderId": "order-uuid",
    //    "itemsIds": ["item-uuid1", "item-uuid2"]
    //  }
    @Post('/add')
    async addItemsToOrder(@Body() body: addItemsToOrderDto){
        
        return this.orderService.addItemsToOrder(body.orderId, body.itemsIds);
    };

    //Delete order by id
    //DELETE /order/:id
    @Delete(':id')
    async clearOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.orderService.clearOrder(id);
    };


    //Generate bill for the order
    //GET /order/:id/bill
    @Get(':id/bill')
    async generateOrderBill(@Param('id', ParseUUIDPipe) id: string){
        return this.orderService.generateOrderBill(id);
    };
}
