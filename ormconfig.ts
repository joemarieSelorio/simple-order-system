import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './src/entities/user.entity';
import { Product } from './src/entities/product.entity';
import { Order } from './src/entities/order.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  synchronize: false,
  name: 'default',
  entities: [User, Product, Order],
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  seeds: ['src/db/seeders/**/*{seeder.ts,seeder.js}'],
};
export const connectionSource = new DataSource(options);
