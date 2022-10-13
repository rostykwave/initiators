import { MigrationInterface, QueryRunner } from "typeorm";

export class addedRoomFloor1665641903939 implements MigrationInterface {
    name = 'addedRoomFloor1665641903939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "floor" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "floor"`);
    }

}
