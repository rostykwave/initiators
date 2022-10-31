import { MigrationInterface, QueryRunner } from "typeorm";

export class createdate1666610832584 implements MigrationInterface {
    name = 'createdate1666610832584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "createdAt"`);
    }

}
