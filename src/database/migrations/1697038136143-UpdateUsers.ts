import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1697038136143 implements MigrationInterface {
    name = 'UpdateUsers1697038136143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "display_name" character varying;

            ALTER TABLE "users"
            ADD "job_title" character varying;

            ALTER TABLE "users"
            ADD "introduction" character varying;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "introduction";

            ALTER TABLE "users" DROP COLUMN "job_title";

            ALTER TABLE "users" DROP COLUMN "display_name";
        `);
    }

}
