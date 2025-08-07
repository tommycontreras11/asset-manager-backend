import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropertiesToFixedAssetTable1754573762435 implements MigrationInterface {
    name = 'AddPropertiesToFixedAssetTable1754573762435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD \`salvage_value\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD \`useful_life\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD \`purchase_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD \`start_use_date\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP COLUMN \`start_use_date\``);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP COLUMN \`purchase_date\``);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP COLUMN \`useful_life\``);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP COLUMN \`salvage_value\``);
    }

}
