import { MigrationInterface, QueryRunner } from "typeorm";

export class roomsAndRecurringBookings1667418047853 implements MigrationInterface {
    name = 'roomsAndRecurringBookings1667418047853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."recurring_booking_daysofweek_enum" RENAME TO "recurring_booking_daysofweek_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."recurring_booking_daysofweek_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ALTER COLUMN "daysOfWeek" TYPE "public"."recurring_booking_daysofweek_enum"[] USING "daysOfWeek"::"text"::"public"."recurring_booking_daysofweek_enum"[]`);
        await queryRunner.query(`DROP TYPE "public"."recurring_booking_daysofweek_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recurring_booking_daysofweek_enum_old" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ALTER COLUMN "daysOfWeek" TYPE "public"."recurring_booking_daysofweek_enum_old"[] USING "daysOfWeek"::"text"::"public"."recurring_booking_daysofweek_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "public"."recurring_booking_daysofweek_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."recurring_booking_daysofweek_enum_old" RENAME TO "recurring_booking_daysofweek_enum"`);
    }

}
