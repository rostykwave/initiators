import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountApproved1665643249634 implements MigrationInterface {
  name = 'AccountApproved1665643249634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "approved" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "approved"`);
  }
}
