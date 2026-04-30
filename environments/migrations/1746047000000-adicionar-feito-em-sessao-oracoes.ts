import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdicionarFeitoEmSessaoOracoes1746047000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'sessao_oracoes',
            new TableColumn({
                name: 'feito_em',
                type: 'timestamptz',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('sessao_oracoes', 'feito_em');
    }

}
