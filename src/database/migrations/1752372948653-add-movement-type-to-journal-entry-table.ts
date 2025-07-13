import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMovementTypeToJournalEntryTable1752372948653 implements MigrationInterface {
    name = 'AddMovementTypeToJournalEntryTable1752372948653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` ADD \`movement_type\` enum ('DEBIT', 'CREDIT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`journal_entries\` DROP COLUMN \`movement_type\``);
    }

}
