import { MigrationInterface, QueryRunner } from "typeorm";

export class addedCameraToDevices1667418215867 implements MigrationInterface {
    name = 'addedCameraToDevices1667418215867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."room_devices_enum" RENAME TO "room_devices_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."room_devices_enum" AS ENUM('White board', 'Big screen', 'Water cooler', 'PlayStation', 'Air conditioner', 'Sound system', 'Tennis table', 'Camera')`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "devices" TYPE "public"."room_devices_enum"[] USING "devices"::"text"::"public"."room_devices_enum"[]`);
        await queryRunner.query(`DROP TYPE "public"."room_devices_enum_old"`);
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
        await queryRunner.query(`CREATE TYPE "public"."room_devices_enum_old" AS ENUM('White board', 'Big screen', 'Water cooler', 'PlayStation', 'Air conditioner', 'Sound system', 'Tennis table')`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "devices" TYPE "public"."room_devices_enum_old"[] USING "devices"::"text"::"public"."room_devices_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "public"."room_devices_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."room_devices_enum_old" RENAME TO "room_devices_enum"`);
    }

}
