import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { ProductSeeds } from '../seeds/product.seeds';

export default class categorySeeder implements Seeder {
  public async run(datasource: DataSource): Promise<void> {
    const repository = datasource.getRepository(Product);
    await repository.save(ProductSeeds);
  }
}
