import { MigrationInterface, QueryRunner } from "typeorm";

export class bookingsTitle1669017391002 implements MigrationInterface {
    name = 'bookingsTitle1669017391002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP COLUMN "title"`);
    }

}
