import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1698077374209 implements MigrationInterface {
  name = 'Migration1698077374209'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
  }
}
