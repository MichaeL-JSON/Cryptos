import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1697747572403 implements MigrationInterface {
  name = 'Migration1697747572403'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT false`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`)
  }
}
