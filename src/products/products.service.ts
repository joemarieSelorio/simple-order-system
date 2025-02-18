import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProduct(productName: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { name: productName },
    });

    if (!product) {
      throw new NotFoundException(`Product with name ${productName} not found`);
    }

    return product;
  }

  async updateQuantity(
    uuid: string,
    quantity: number = 0,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(uuid, { quantity });
  }
}
