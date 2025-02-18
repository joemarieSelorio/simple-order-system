import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @Column()
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  name: string;

  @Column()
  quantity: number;
}
