import { MigrationInterface, QueryRunner } from "typeorm";

export class MeetingDateOneTimeBooking1667403334542 implements MigrationInterface {
    name = 'MeetingDateOneTimeBooking1667403334542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP COLUMN "meetingDate"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD "meetingDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP COLUMN "meetingDate"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD "meetingDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
