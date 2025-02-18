import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateOrderTable2021010120000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'order_number',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'product_uuid',
            type: 'varchar',
          },
          {
            name: 'user_uuid',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'IDX_ORDER_NUMBER',
        columnNames: ['order_number'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('orders', 'IDX_ORDER_NUMBER');
    await queryRunner.dropTable('orders');
  }
}
