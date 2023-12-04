import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1700487722951 implements MigrationInterface {
  name = 'Migration1700487722951'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "token" TO "activation_token"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "activation_token" TO "token"`,
    )
  }
}
