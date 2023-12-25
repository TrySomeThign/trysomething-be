import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProjects1697040274381 implements MigrationInterface {
    name = 'UpdateProjects1697040274381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects"
            ADD "author_id" uuid;

            ALTER TABLE "projects"
            ADD CONSTRAINT "FK_f7548c14ad935cfb4ab380426bf" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projects" DROP CONSTRAINT "FK_f7548c14ad935cfb4ab380426bf";

            ALTER TABLE "projects" DROP COLUMN "author_id"
        `);
    }

}
