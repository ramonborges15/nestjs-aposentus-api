import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CriarEnumsEOracoes1739001000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE oracao_tipo AS ENUM ('PEDIDO', 'INTERCESSAO', 'AGRADECIMENTO', 'CONFISSAO');
        `);

        await queryRunner.query(`
            CREATE TYPE oracao_frequencia AS ENUM ('DIARIA', 'SEMANAL', 'MENSAL');
        `);

        await queryRunner.createTable(
            new Table({
                name: 'oracoes',
                columns: [
                    { name: 'id', type: 'int4', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'criado_em', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'atualizado_em', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'titulo', type: 'varchar', isNullable: false },
                    { name: 'conteudo', type: 'text', isNullable: false },
                    { name: 'tema', type: 'varchar', isNullable: false },
                    { name: 'tipo', type: 'oracao_tipo', isNullable: false },
                    { name: 'dia_semana', type: 'int4', isNullable: false },
                    { name: 'dia_mes', type: 'int4', isNullable: false },
                    { name: 'frequencia', type: 'oracao_frequencia', isNullable: false },
                    { name: 'quantidade_maxima', type: 'int4', isNullable: false, default: 0 },
                    { name: 'total_oracoes', type: 'int4', isNullable: false, default: 0 },
                    { name: 'ativa', type: 'boolean', isNullable: false },
                    { name: 'user_id', type: 'uuid', isNullable: false },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uuid'],
                        name: 'fk_oracoes_has_users',
                    }),
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('oracoes');

        await queryRunner.query(`
            DROP TYPE IF EXISTS oracao_frequencia;
        `);

        await queryRunner.query(`
            DROP TYPE IF EXISTS oracao_tipo;
        `);
    }

}