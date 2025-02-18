import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @Column()
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  order_number: string;

  @Column()
  product_uuid: string;

  @Column()
  user_uuid: string;

  @Column()
  quantity: number;
}
