import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypeCategoryProject1703650630062 implements MigrationInterface {
    name = 'UpdateTypeCategoryProject1703650630062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects" DROP COLUMN "technologies";
            
            ALTER TABLE "projects"
            ADD "technologies" text array;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects" DROP COLUMN "technologies";

            ALTER TABLE "projects"
            ADD "technologies" text;
        `);
    }

}
