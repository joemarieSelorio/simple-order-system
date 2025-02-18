import { Controller, Post, Body, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  async create(@Body() body: CreateOrderDto, @Req() req: Request) {
    const user = req['user'];
    const result = await this.ordersService.createOrder(
      body.productName,
      user.uuid,
      body.quantity,
    );

    if (!result) {
      return {
        message: 'Order failed',
      };
    }
    return {
      message: 'You have successfully ordered this product.',
    };
  }
}
