import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSkills1697204397008 implements MigrationInterface {
    name = 'CreateSkills1697204397008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "skills" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "title" character varying,
                "description" character varying,
                "image" character varying,
                CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "skills"
        `);
    }

}
