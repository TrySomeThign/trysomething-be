import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldCategoryProject1697206984847 implements MigrationInterface {
    name = 'UpdateFieldCategoryProject1697206984847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects"
            ADD "category_id" uuid;

            ALTER TABLE "projects"
            ADD CONSTRAINT "FK_c1345700580c6c6b17200647bcc" FOREIGN KEY ("category_id") REFERENCES "project_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects" DROP CONSTRAINT "FK_c1345700580c6c6b17200647bcc";

            ALTER TABLE "projects" DROP COLUMN "category_id"
        `);
    }

}
