import { MigrationInterface, QueryRunner } from "typeorm";

export class init1666950674643 implements MigrationInterface {
    name = 'init1666950674643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "office" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_200185316ba169fda17e3b6ba00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."room_devices_enum" AS ENUM('White board', 'Big screen', 'Water cooler', 'PlayStation', 'Air conditioner', 'Sound system', 'Tennis table')`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "floor" integer NOT NULL, "devices" "public"."room_devices_enum" array, "maxPeople" integer NOT NULL, "minPeople" integer NOT NULL, "officeId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "one_time_booking" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "meetingDate" date NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "ownerId" integer, "roomId" integer, CONSTRAINT "PK_1e3cf728ccd7ff88901c2af2600" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guest" ("id" SERIAL NOT NULL, "guestId" integer, "ownerId" integer, "oneTimeBookingId" integer, "recurringBookingId" integer, CONSTRAINT "PK_57689d19445de01737dbc458857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recurring_booking" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "startDate" date NOT NULL, "endDate" date NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "daysOfWeek" "public"."recurring_booking_daysofweek_enum" array, "ownerId" integer, "roomId" integer, CONSTRAINT "PK_0079aac07439f3020479cad1e3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "approved" boolean NOT NULL DEFAULT false, "role" "public"."account_role_enum" NOT NULL DEFAULT 'User', "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_b359b695aa3138aae2b21a74064" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD CONSTRAINT "FK_6a3dd086a48273141fd5d645ef6" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" ADD CONSTRAINT "FK_7a9df496b96f797bbce0543bf6d" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_1a574a1257e98c4a59d21d1eeb5" FOREIGN KEY ("guestId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_b23e5333d3338676ee2ce36ef0e" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_004972e9623a48fdf3c9a593a68" FOREIGN KEY ("oneTimeBookingId") REFERENCES "one_time_booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_c023d96f45d3f60594a4b5f9908" FOREIGN KEY ("recurringBookingId") REFERENCES "recurring_booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD CONSTRAINT "FK_1326cfbe5b5ec243d141472484e" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" ADD CONSTRAINT "FK_58d5332dcdda4e8ebe5db84203d" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP CONSTRAINT "FK_58d5332dcdda4e8ebe5db84203d"`);
        await queryRunner.query(`ALTER TABLE "recurring_booking" DROP CONSTRAINT "FK_1326cfbe5b5ec243d141472484e"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_c023d96f45d3f60594a4b5f9908"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_004972e9623a48fdf3c9a593a68"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_b23e5333d3338676ee2ce36ef0e"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_1a574a1257e98c4a59d21d1eeb5"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP CONSTRAINT "FK_7a9df496b96f797bbce0543bf6d"`);
        await queryRunner.query(`ALTER TABLE "one_time_booking" DROP CONSTRAINT "FK_6a3dd086a48273141fd5d645ef6"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_b359b695aa3138aae2b21a74064"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "recurring_booking"`);
        await queryRunner.query(`DROP TABLE "guest"`);
        await queryRunner.query(`DROP TABLE "one_time_booking"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TYPE "public"."room_devices_enum"`);
        await queryRunner.query(`DROP TABLE "office"`);
    }

}
