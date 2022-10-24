import { MigrationInterface, QueryRunner } from "typeorm";

export class createdDateForBookings1666611527728 implements MigrationInterface {
    name = 'createdDateForBookings1666611527728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_booking" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
