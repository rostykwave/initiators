import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665738131592 implements MigrationInterface {
    name = 'init1665738131592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guest" ("id" SERIAL NOT NULL, "guestId" integer, "ownerId" integer, "bookingId" integer, CONSTRAINT "PK_57689d19445de01737dbc458857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "office" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_200185316ba169fda17e3b6ba00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "floor" integer NOT NULL, "description" character varying NOT NULL, "maxPeople" integer NOT NULL, "minPeople" integer NOT NULL, "officeId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "meetingDate" TIMESTAMP WITH TIME ZONE, "daysOfWeek" "public"."booking_daysofweek_enum" array, "ownerId" integer, "roomId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "approved" boolean NOT NULL DEFAULT false, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."account_role_enum" NOT NULL DEFAULT 'User', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_1a574a1257e98c4a59d21d1eeb5" FOREIGN KEY ("guestId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_b23e5333d3338676ee2ce36ef0e" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guest" ADD CONSTRAINT "FK_f50d606bf810dd7ebcd677d22fa" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_b359b695aa3138aae2b21a74064" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_8624b868142f2f4db0ba0fb9812" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_769a5e375729258fd0bbfc0a456" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_769a5e375729258fd0bbfc0a456"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_8624b868142f2f4db0ba0fb9812"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_b359b695aa3138aae2b21a74064"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_f50d606bf810dd7ebcd677d22fa"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_b23e5333d3338676ee2ce36ef0e"`);
        await queryRunner.query(`ALTER TABLE "guest" DROP CONSTRAINT "FK_1a574a1257e98c4a59d21d1eeb5"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "office"`);
        await queryRunner.query(`DROP TABLE "guest"`);
    }

}
