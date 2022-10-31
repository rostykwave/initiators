import { MigrationInterface, QueryRunner } from "typeorm";

export class bookingsDateRoomDevices1667194361440 implements MigrationInterface {
    name = 'bookingsDateRoomDevices1667194361440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "description" TO "devices"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "devices"`);
        await queryRunner.query(`CREATE TYPE "public"."room_devices_enum" AS ENUM('White board', 'Big screen', 'Water cooler', 'PlayStation', 'Air conditioner', 'Sound system', 'Tennis table')`);
        await queryRunner.query(`ALTER TABLE "room" ADD "devices" "public"."room_devices_enum" array`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD "startDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD "endDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD "endDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD "startDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "devices"`);
        await queryRunner.query(`DROP TYPE "public"."room_devices_enum"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "devices" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "devices" TO "description"`);
    }

}
