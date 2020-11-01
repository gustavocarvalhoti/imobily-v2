import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPropertyPrices1602638377119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'property_prices',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'real_state',
                    type: 'integer'
                },
                {
                    name: 'link',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'property_price_id',
                    type: 'integer',
                    isNullable: true
                },
            ],
            foreignKeys: [
                {
                    name: 'PropertyPropertyPrice',
                    columnNames: ['property_price_id'],
                    referencedTableName: 'properties',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('property_prices');
    }
}