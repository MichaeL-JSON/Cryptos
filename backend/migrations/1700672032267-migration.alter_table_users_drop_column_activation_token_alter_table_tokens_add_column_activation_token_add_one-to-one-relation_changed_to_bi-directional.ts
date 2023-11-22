import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1700672032267 implements MigrationInterface {
  name = 'Migration1700672032267'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "activation_token"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "activation_token" character varying NOT NULL DEFAULT ''`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP COLUMN "activation_token"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "activation_token" character varying NOT NULL DEFAULT ''`,
    )
  }
}
