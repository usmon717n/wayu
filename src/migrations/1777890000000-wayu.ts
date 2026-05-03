import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777890000000 implements MigrationInterface {
    name = 'Wayu1777890000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instagram_posts" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "image" character varying(256) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_7333e571eb68e8e56dfbc78fc41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "question" character varying(256) NOT NULL, "answer" character varying(512) NOT NULL, CONSTRAINT "PK_258d4e939087b2cc037b1b8d5e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs_tags" ("faqsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_0eec0ea2f9c145d7386ac1599ea" PRIMARY KEY ("faqsId", "tagId"))`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" ADD CONSTRAINT "FK_56f6c9e7ee8e87bdbe35b0db551" FOREIGN KEY ("faqsId") REFERENCES "faqs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" ADD CONSTRAINT "FK_21dce352f5f2a5af57d91345b81" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faqs_tags" DROP CONSTRAINT "FK_21dce352f5f2a5af57d91345b81"`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" DROP CONSTRAINT "FK_56f6c9e7ee8e87bdbe35b0db551"`);
        await queryRunner.query(`DROP TABLE "faqs_tags"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "instagram_posts"`);
    }
}
