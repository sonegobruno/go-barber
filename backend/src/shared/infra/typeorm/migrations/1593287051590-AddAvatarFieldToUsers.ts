import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export default class AddAvatarFieldToUsers1593287051590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }

}
