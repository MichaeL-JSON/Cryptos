import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1695365104734 implements MigrationInterface {
  name = 'Migration1695365104734'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL, "link" character varying NOT NULL, "author" character varying NOT NULL, "site" character varying NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "articles"`)
  }
}
