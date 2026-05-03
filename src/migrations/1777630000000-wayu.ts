import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777630000000 implements MigrationInterface {
    name = 'Wayu1777630000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_categories" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_59f648f7b4a00e59b3ef95f8d8e" UNIQUE ("title"), CONSTRAINT "PK_7420f61d31ca6d084ffb6d196be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "categoryId" integer NOT NULL, "title" character varying(256) NOT NULL, "content" text NOT NULL, "image" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "address" character varying(128) NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_b4f9f0f86e85d63d0e2f3a6064f" UNIQUE ("title"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_tags" ("newsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7f7f8d5d97795e087f89f8d6448" PRIMARY KEY ("newsId", "tagId"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_d198923534ea9088929d8e00f4c" FOREIGN KEY ("categoryId") REFERENCES "event_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_tags" ADD CONSTRAINT "FK_515f5f4f1e9ddde6983a1bc89f4" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_tags" ADD CONSTRAINT "FK_81fca3bf588fa2e510dc9f6fafd" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_tags" DROP CONSTRAINT "FK_81fca3bf588fa2e510dc9f6fafd"`);
        await queryRunner.query(`ALTER TABLE "news_tags" DROP CONSTRAINT "FK_515f5f4f1e9ddde6983a1bc89f4"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_d198923534ea9088929d8e00f4c"`);
        await queryRunner.query(`DROP TABLE "news_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "event_categories"`);
    }
}
