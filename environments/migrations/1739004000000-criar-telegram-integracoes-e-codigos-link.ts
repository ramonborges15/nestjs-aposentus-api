import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CriarTelegramIntegracoesECodigosLink1739004000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'telegram_integracoes',
                columns: [
                    { name: 'id', type: 'int4', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'user_id', type: 'uuid', isNullable: false, isUnique: true },
                    { name: 'telegram_user_id', type: 'varchar', isNullable: false },
                    { name: 'telegram_chat_id', type: 'varchar', isNullable: false },
                    { name: 'telegram_username', type: 'varchar', isNullable: false },
                    { name: 'telegram_first_name', type: 'varchar', isNullable: false },
                    { name: 'linked', type: 'boolean', isNullable: false, default: true },
                    { name: 'linked_at', type: 'timestamp without time zone', isNullable: false },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uuid'],
                        name: 'fk_telegram_integracoes_has_users',
                    }),
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'telegram_codigos_link',
                columns: [
                    { name: 'code', type: 'varchar', isPrimary: true, isNullable: false },
                    { name: 'user_id', type: 'uuid', isNullable: false },
                    { name: 'expires_at', type: 'timestamp without time zone', isNullable: false },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uuid'],
                        name: 'fk_telegram_codigos_link_has_users',
                    }),
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('telegram_codigos_link');
        await queryRunner.dropTable('telegram_integracoes');
    }

}