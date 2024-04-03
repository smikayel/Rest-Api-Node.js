import { MigrationInterface, QueryRunner } from "typeorm";

export class userAddRefreshToken1712158294294 implements MigrationInterface {
    name = 'userAddRefreshToken1712158294294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
    }

}
