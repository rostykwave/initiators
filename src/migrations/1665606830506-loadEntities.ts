import { MigrationInterface, QueryRunner } from 'typeorm';

export class loadEntities1665606830506 implements MigrationInterface {
  name = '$npmConfigName1665606830506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "guest" ("id" SERIAL NOT NULL, "ownerId" integer, "bookingId" integer, CONSTRAINT "PK_57689d19445de01737dbc458857" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "maxPeople" integer NOT NULL, "minPeople" integer NOT NULL, "roomTypeId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "meetingDate" TIMESTAMP WITH TIME ZONE NOT NULL, "daysOfWeek" "public"."booking_daysofweek_enum", "accountId" integer, "roomId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."account_role_enum" NOT NULL DEFAULT 'User', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest" ADD CONSTRAINT "FK_b23e5333d3338676ee2ce36ef0e" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest" ADD CONSTRAINT "FK_f50d606bf810dd7ebcd677d22fa" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_9e55182c47f8ba7a32466131837" FOREIGN KEY ("roomTypeId") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_453bcdd40d219e717bcfb9a7c25" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_769a5e375729258fd0bbfc0a456" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_769a5e375729258fd0bbfc0a456"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_453bcdd40d219e717bcfb9a7c25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_9e55182c47f8ba7a32466131837"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest" DROP CONSTRAINT "FK_f50d606bf810dd7ebcd677d22fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest" DROP CONSTRAINT "FK_b23e5333d3338676ee2ce36ef0e"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "room_type"`);
    await queryRunner.query(`DROP TABLE "guest"`);
  }
}
