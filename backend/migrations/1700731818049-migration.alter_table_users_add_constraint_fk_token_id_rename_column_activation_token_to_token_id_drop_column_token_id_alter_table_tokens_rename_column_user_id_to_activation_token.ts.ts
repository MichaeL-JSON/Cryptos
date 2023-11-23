import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1700732597778 implements MigrationInterface {
  name = 'Migration1700732597778'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" RENAME COLUMN "user_id" TO "activation_token"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "activation_token" TO "token_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP COLUMN "activation_token"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "activation_token" character varying NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token_id"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "token_id" integer`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_e03e90fb544adefa10a6c202188" UNIQUE ("token_id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_e03e90fb544adefa10a6c202188" FOREIGN KEY ("token_id") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_e03e90fb544adefa10a6c202188"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_e03e90fb544adefa10a6c202188"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token_id"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "token_id" character varying NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP COLUMN "activation_token"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "activation_token" integer`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "token_id" TO "activation_token"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" RENAME COLUMN "activation_token" TO "user_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
