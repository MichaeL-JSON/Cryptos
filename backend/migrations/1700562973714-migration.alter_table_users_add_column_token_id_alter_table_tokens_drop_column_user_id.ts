import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1700562973714 implements MigrationInterface {
  name = 'Migration1700562973714'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "REL_8769073e38c365f315426554ca"`,
    )
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "user_id"`)
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
    await queryRunner.query(`ALTER TABLE "tokens" ADD "user_id" integer`)
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "REL_8769073e38c365f315426554ca" UNIQUE ("user_id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
