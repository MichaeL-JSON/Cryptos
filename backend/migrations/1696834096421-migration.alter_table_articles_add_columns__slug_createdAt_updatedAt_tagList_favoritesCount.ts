import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1696834096421 implements MigrationInterface {
  name = 'Migration1696834096421'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "slug" character varying NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "tagList" text NOT NULL DEFAULT '[]'`,
    )
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    )
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "content" SET DEFAULT ''`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "content" DROP DEFAULT`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "articles" DROP COLUMN "favoritesCount"`,
    )
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "tagList"`)
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "createdAt"`)
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "slug"`)
  }
}
