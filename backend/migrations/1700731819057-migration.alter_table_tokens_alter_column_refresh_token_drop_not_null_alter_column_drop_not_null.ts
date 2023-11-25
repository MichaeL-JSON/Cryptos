import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1700731819057 implements MigrationInterface {
  name = 'Migration1700731819057'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens"
          ALTER COLUMN "refresh_token" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens"
          ALTER COLUMN "activation_token" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens"
          ALTER COLUMN "refresh_token" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens"
          ALTER COLUMN "activation_token" SET NOT NULL`,
    )
  }
}
