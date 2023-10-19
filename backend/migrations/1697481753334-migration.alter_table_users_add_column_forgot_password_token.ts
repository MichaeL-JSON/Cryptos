import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1697481753334 implements MigrationInterface {
  name = 'Migration1697481753334'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "forgot_password_token" character varying NOT NULL DEFAULT ''`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "forgot_password_token"`,
    )
  }
}
