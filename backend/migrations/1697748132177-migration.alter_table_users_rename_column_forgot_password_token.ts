import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1697748132177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME "forgot_password_token" TO "token"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME "token" TO "forgot_password_token"`,
    )
  }
}
