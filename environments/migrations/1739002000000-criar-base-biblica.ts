import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarBaseBiblica1739002000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'base_biblica',
                columns: [
                    { name: 'id', type: 'int4', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'criado_em', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'atualizado_em', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'referencia', type: 'varchar', isNullable: true },
                    { name: 'tema', type: 'text', isArray: true, isNullable: false },
                    { name: 'texto', type: 'text', isNullable: false },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('base_biblica');
    }

}