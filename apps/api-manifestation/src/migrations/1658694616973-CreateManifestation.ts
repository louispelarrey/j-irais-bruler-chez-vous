import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateManifestation1625230700000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE manifestation (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                title character varying NOT NULL,
                address character varying NOT NULL,
                description character varying NOT NULL,
                isActive boolean DEFAULT true,
                creatorId character varying NOT NULL,
                start_date timestamp DEFAULT CURRENT_TIMESTAMP,
                participants jsonb DEFAULT '[]',
                createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
                updatedAt timestamp DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE manifestation`);
    }

}