import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordForUser1699704388723 implements MigrationInterface {
    name = 'AddPasswordForUser1699704388723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
    }

}
