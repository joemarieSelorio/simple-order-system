import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productService: ProductsService,
  ) {}
  async createOrder(
    productName: string,
    userUuid: string,
    quantity: number,
  ): Promise<Order | undefined> {
    const product = await this.productService.getProduct(productName);

    if (!product) {
      throw new NotFoundException(`Product with name ${productName} not found`);
    }

    if (product.quantity === 0 || product.quantity < quantity) {
      throw new NotFoundException(
        `Failed to order this product due to unavailability of the stock`,
      );
    }

    const result = await this.orderRepository.save({
      uuid: uuidv4(),
      order_number: `order-${userUuid}-${new Date(Date.now()).toISOString()}`,
      product_uuid: '',
      user_uuid: userUuid,
      quantity,
    });

    await this.productService.updateQuantity(
      product.uuid,
      Math.max(product.quantity - quantity, 0),
    );

    return result;
  }
}
