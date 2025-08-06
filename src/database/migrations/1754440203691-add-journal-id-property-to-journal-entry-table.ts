import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJournalIdPropertyToJournalEntryTable1754440203691 implements MigrationInterface {
    name = 'AddJournalIdPropertyToJournalEntryTable1754440203691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` ADD \`journal_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` DROP COLUMN \`journal_id\``);
    }

}
