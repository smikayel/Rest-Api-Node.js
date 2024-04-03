import { MigrationInterface, QueryRunner } from "typeorm";

export class addFilePath1712175980839 implements MigrationInterface {
    name = 'addFilePath1712175980839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`extension\` \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`path\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`path\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`path\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`path\` \`extension\` varchar(255) NOT NULL`);
    }

}
