import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuxiliaryIdPropertyAndRemoveNullableFromDescriptionOnJournalEntryTable1754405250339 implements MigrationInterface {
    name = 'AddAuxiliaryIdPropertyAndRemoveNullableFromDescriptionOnJournalEntryTable1754405250339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` ADD \`auxiliary_id\` int NOT NULL DEFAULT '8'`);
        await queryRunner.query(`ALTER TABLE \`journal_entries\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`journal_entries\` DROP COLUMN \`auxiliary_id\``);
    }

}
