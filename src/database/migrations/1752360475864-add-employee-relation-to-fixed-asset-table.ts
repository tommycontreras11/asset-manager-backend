import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeRelationToFixedAssetTable1752360475864 implements MigrationInterface {
    name = 'AddEmployeeRelationToFixedAssetTable1752360475864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD \`employee_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD CONSTRAINT \`FK_035af0d37342a24599fd9a8744e\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP FOREIGN KEY \`FK_035af0d37342a24599fd9a8744e\``);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP COLUMN \`employee_id\``);
    }

}
