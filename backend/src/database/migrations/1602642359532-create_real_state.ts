import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRealState1602642359532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'real_states',
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
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'cnpj',
                    type: 'varchar'
                },
                {
                    name: 'creci',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'url',
                    type: 'varchar'
                },
                {
                    name: 'cep',
                    type: 'varchar'
                },
                {
                    name: 'address',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'state',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('real_states');
    }
}