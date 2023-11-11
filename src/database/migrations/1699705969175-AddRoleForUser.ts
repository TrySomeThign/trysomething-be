import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleForUser1699705969175 implements MigrationInterface {
    name = 'AddRoleForUser1699705969175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('Admin', 'Guest', 'User');

            ALTER TABLE "users"
            ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'User'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role";

            DROP TYPE "public"."users_role_enum"
        `);
    }

}
