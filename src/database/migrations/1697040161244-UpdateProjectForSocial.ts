import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProjectForSocial1697040161244 implements MigrationInterface {
    name = 'UpdateProjectForSocial1697040161244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects"
            ADD "authorId" uuid;

            ALTER TABLE "socials"
            ADD "project_id" uuid;

            ALTER TABLE "projects"
            ADD CONSTRAINT "FK_284d88f48163afb6eea98c8b0fc" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "socials"
            ADD CONSTRAINT "FK_15218181a79aa56be967c424089" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "socials" DROP CONSTRAINT "FK_15218181a79aa56be967c424089";

            ALTER TABLE "projects" DROP CONSTRAINT "FK_284d88f48163afb6eea98c8b0fc";

            ALTER TABLE "socials" DROP COLUMN "project_id";

            ALTER TABLE "projects" DROP COLUMN "authorId";
        `);
    }

}
