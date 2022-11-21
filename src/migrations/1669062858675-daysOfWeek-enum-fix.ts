import { MigrationInterface, QueryRunner } from "typeorm";

export class daysOfWeekEnumFix1669062858675 implements MigrationInterface {
    name = 'daysOfWeekEnumFix1669062858675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."recurring_booking_daysofweek_enum" RENAME TO "recurring_booking_daysofweek_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."recurring_booking_daysofweek_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ALTER COLUMN "daysOfWeek" TYPE "public"."recurring_booking_daysofweek_enum"[] USING "daysOfWeek"::"text"::"public"."recurring_booking_daysofweek_enum"[]`);
        await queryRunner.query(`DROP TYPE "public"."recurring_booking_daysofweek_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recurring_booking_daysofweek_enum_old" AS ENUM('1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ALTER COLUMN "daysOfWeek" TYPE "public"."recurring_booking_daysofweek_enum_old"[] USING "daysOfWeek"::"text"::"public"."recurring_booking_daysofweek_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "public"."recurring_booking_daysofweek_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."recurring_booking_daysofweek_enum_old" RENAME TO "recurring_booking_daysofweek_enum"`);
    }

}
