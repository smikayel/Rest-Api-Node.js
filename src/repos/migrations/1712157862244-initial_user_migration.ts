import { MigrationInterface, QueryRunner } from "typeorm";

export class initialUserMigration1712157862244 implements MigrationInterface {
    name = 'initialUserMigration1712157862244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstname\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastname\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firstname\` varchar(255) NOT NULL`);
    }

}
