import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1695408722216 implements MigrationInterface {
  name = 'Migration1695408722216'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "tickers" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "tickers"`)
  }
}
