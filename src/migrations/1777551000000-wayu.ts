import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777551000000 implements MigrationInterface {
    name = 'Wayu1777551000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "static_info" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "appStoreLink" character varying(128), "playMarketLink" character varying(128), "aboutUs" text NOT NULL, CONSTRAINT "PK_d3384f79a2f741d8f5132de31f6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "static_info"`);
    }
}
