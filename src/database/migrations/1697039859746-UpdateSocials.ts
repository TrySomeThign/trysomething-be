import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSocials1697039859746 implements MigrationInterface {
    name = 'UpdateSocials1697039859746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "socials"
            ADD "author_id" uuid;

            ALTER TABLE "socials"
            ADD CONSTRAINT "FK_19bb43f40293ed416b59314f03c" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "socials" DROP CONSTRAINT "FK_19bb43f40293ed416b59314f03c";

            ALTER TABLE "socials" DROP COLUMN "author_id"
        `);
    }

}
