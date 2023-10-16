import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectCategories1697206825349 implements MigrationInterface {
    name = 'CreateProjectCategories1697206825349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project_categories" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "title" character varying,
                "description" character varying,
                "icon" character varying,
                CONSTRAINT "PK_03d7af35c2601369d030b3617bc" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "project_categories"
        `);
    }

}
