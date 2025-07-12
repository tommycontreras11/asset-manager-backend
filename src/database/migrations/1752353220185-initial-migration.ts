import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752353220185 implements MigrationInterface {
    name = 'InitialMigration1752353220185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`identification\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX \`IDX_140d91acc242af813ce9198762\` (\`identification\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`identification\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`person_type\` enum ('INDIVIDUAL', 'JURIDIC') NOT NULL, \`department_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX \`IDX_dc7c376d754e52717d602e2e20\` (\`identification\`), UNIQUE INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`depreciation_calculations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`process_date\` datetime NOT NULL, \`depreciation_amount\` float(10,2) NOT NULL, \`accumulated_depreciation\` float(10,2) NOT NULL, \`purchase_account\` varchar(255) NOT NULL, \`depreciation_account\` varchar(255) NOT NULL, \`fixed_asset_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fixed_assets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`purchase_value\` decimal(10,2) NOT NULL, \`accumulated_depreciation\` decimal(10,2) NOT NULL DEFAULT '0.00', \`department_id\` int NOT NULL, \`asset_type_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asset_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`purchase_account_id\` int NOT NULL, \`depreciation_account_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventory_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`journal_entries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`description\` varchar(255) NULL, \`entry_date\` datetime NOT NULL, \`inventory_type_id\` int NOT NULL, \`ledger_account_id\` int NOT NULL, \`amount\` float(10,2) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ledger_accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('PURCHASE', 'DEPRECIATION', 'GENERAL') NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_678a3540f843823784b0fe4a4f2\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`depreciation_calculations\` ADD CONSTRAINT \`FK_2f9dce7bdc4eb814a67805a3961\` FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD CONSTRAINT \`FK_b7c0ef3cc66e3f515c9aba379e4\` FOREIGN KEY (\`asset_type_id\`) REFERENCES \`asset_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD CONSTRAINT \`FK_a946d22a52bdf0213ea1f7b61b3\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asset_types\` ADD CONSTRAINT \`FK_74a96d927e380449e6134077cc2\` FOREIGN KEY (\`purchase_account_id\`) REFERENCES \`ledger_accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asset_types\` ADD CONSTRAINT \`FK_b471d806e52fc054f1ef57536d6\` FOREIGN KEY (\`depreciation_account_id\`) REFERENCES \`ledger_accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`journal_entries\` ADD CONSTRAINT \`FK_4f5bc675ff81f829969c3f1f477\` FOREIGN KEY (\`inventory_type_id\`) REFERENCES \`inventory_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`journal_entries\` ADD CONSTRAINT \`FK_103dd1b303a667ede475b1b6c0b\` FOREIGN KEY (\`ledger_account_id\`) REFERENCES \`ledger_accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` DROP FOREIGN KEY \`FK_103dd1b303a667ede475b1b6c0b\``);
        await queryRunner.query(`ALTER TABLE \`journal_entries\` DROP FOREIGN KEY \`FK_4f5bc675ff81f829969c3f1f477\``);
        await queryRunner.query(`ALTER TABLE \`asset_types\` DROP FOREIGN KEY \`FK_b471d806e52fc054f1ef57536d6\``);
        await queryRunner.query(`ALTER TABLE \`asset_types\` DROP FOREIGN KEY \`FK_74a96d927e380449e6134077cc2\``);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP FOREIGN KEY \`FK_a946d22a52bdf0213ea1f7b61b3\``);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP FOREIGN KEY \`FK_b7c0ef3cc66e3f515c9aba379e4\``);
        await queryRunner.query(`ALTER TABLE \`depreciation_calculations\` DROP FOREIGN KEY \`FK_2f9dce7bdc4eb814a67805a3961\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_678a3540f843823784b0fe4a4f2\``);
        await queryRunner.query(`DROP TABLE \`ledger_accounts\``);
        await queryRunner.query(`DROP TABLE \`journal_entries\``);
        await queryRunner.query(`DROP TABLE \`inventory_types\``);
        await queryRunner.query(`DROP TABLE \`asset_types\``);
        await queryRunner.query(`DROP TABLE \`fixed_assets\``);
        await queryRunner.query(`DROP TABLE \`depreciation_calculations\``);
        await queryRunner.query(`DROP TABLE \`departments\``);
        await queryRunner.query(`DROP INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` ON \`employees\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc7c376d754e52717d602e2e20\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_140d91acc242af813ce9198762\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
