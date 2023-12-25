import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuthorForSkill1697204910566 implements MigrationInterface {
    name = 'UpdateAuthorForSkill1697204910566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "skills"
            ADD "author_id" uuid;

            ALTER TABLE "skills"
            ADD CONSTRAINT "FK_9eca1b079ba604929881adf0ccd" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "skills" DROP CONSTRAINT "FK_9eca1b079ba604929881adf0ccd";

            ALTER TABLE "skills" DROP COLUMN "author_id"
        `);
    }

}
