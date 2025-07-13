import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSomePropertiesFromDepreciationCalculationTable1752373850260 implements MigrationInterface {
    name = 'RemoveSomePropertiesFromDepreciationCalculationTable1752373850260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`depreciation_calculations\` DROP COLUMN \`purchase_account\``);
        await queryRunner.query(`ALTER TABLE \`depreciation_calculations\` DROP COLUMN \`depreciation_account\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`depreciation_calculations\` ADD \`depreciation_account\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`depreciation_calculations\` ADD \`purchase_account\` varchar(255) NOT NULL`);
    }

}
