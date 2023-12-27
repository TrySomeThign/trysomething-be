import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypeCategoryProject1703647119181 implements MigrationInterface {
    name = 'UpdateTypeCategoryProject1703647119181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project_categories"
                RENAME COLUMN "title" TO "type";

            ALTER TABLE "project_categories" DROP COLUMN "type";

            CREATE TYPE "public"."project_categories_type_enum" AS ENUM('Web', 'Design', 'UIUX');

            ALTER TABLE "project_categories"
            ADD "type" "public"."project_categories_type_enum" NOT NULL DEFAULT 'Web';  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project_categories" DROP COLUMN "type";

            DROP TYPE "public"."project_categories_type_enum";

            ALTER TABLE "project_categories"
            ADD "type" character varying;

            ALTER TABLE "project_categories"
                RENAME COLUMN "type" TO "title";
        `);
    }

}
