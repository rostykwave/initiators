import { MigrationInterface, QueryRunner } from "typeorm";

export class oneTimeBookigMeetingDate1666723216823 implements MigrationInterface {
    name = 'oneTimeBookigMeetingDate1666723216823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP COLUMN "meetingDate"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD "meetingDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP COLUMN "meetingDate"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD "meetingDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
