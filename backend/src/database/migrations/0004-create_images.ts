import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602638377118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
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
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'real_state_id',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'property_id',
                    type: 'integer',
                    isNullable: true
                },
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'ImageRealState',
                    columnNames: ['real_state_id'],
                    referencedTableName: 'real_states',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'ImageProperty',
                    columnNames: ['property_id'],
                    referencedTableName: 'properties',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}