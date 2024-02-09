import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProject1707451536222 implements MigrationInterface {
    name = 'UpdateProject1707451536222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects" DROP COLUMN "technologies";

            ALTER TABLE "projects"
            ADD "technologies" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects" DROP COLUMN "technologies";

            ALTER TABLE "projects"
            ADD "technologies" text array
        `);
    }

}
