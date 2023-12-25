import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldProjectForSocial1697040321514 implements MigrationInterface {
    name = 'UpdateFieldProjectForSocial1697040321514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "socials"
            ADD "project_id" uuid;

            ALTER TABLE "socials"
            ADD CONSTRAINT "FK_15218181a79aa56be967c424089" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "socials" DROP CONSTRAINT "FK_15218181a79aa56be967c424089";

            ALTER TABLE "socials" DROP COLUMN "project_id"
        `);
    }

}
