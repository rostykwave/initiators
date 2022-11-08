import { MigrationInterface, QueryRunner } from "typeorm";

export class isRecurringBooking1667891964528 implements MigrationInterface {
    name = 'isRecurringBooking1667891964528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD "isRecurring" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD "isRecurring" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP COLUMN "isRecurring"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP COLUMN "isRecurring"`);
    }

}
