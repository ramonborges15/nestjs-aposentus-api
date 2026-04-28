import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CriarSessoesESessaoOracoes1739003000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sessoes',
                columns: [
                    { name: 'id', type: 'int4', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'criado_em', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'atualizado_em', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'data_dia', type: 'date', isNullable: false },
                    { name: 'finalizado', type: 'boolean', isNullable: false },
                    { name: 'finalizado_em', type: 'timestamp without time zone', isNullable: true },
                    { name: 'user_id', type: 'uuid', isNullable: false },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uuid'],
                        name: 'fk_sessoes_has_users',
                    }),
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'sessao_oracoes',
                columns: [
                    { name: 'sessao_id', type: 'int4', isPrimary: true, isNullable: false },
                    { name: 'oracao_id', type: 'int4', isPrimary: true, isNullable: false },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['sessao_id'],
                        referencedTableName: 'sessoes',
                        referencedColumnNames: ['id'],
                        name: 'fk_sessao_oracoes_has_sessoes',
                    }),
                    new TableForeignKey({
                        columnNames: ['oracao_id'],
                        referencedTableName: 'oracoes',
                        referencedColumnNames: ['id'],
                        name: 'fk_sessao_oracoes_has_oracoes',
                    }),
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessao_oracoes');
        await queryRunner.dropTable('sessoes');
    }

}