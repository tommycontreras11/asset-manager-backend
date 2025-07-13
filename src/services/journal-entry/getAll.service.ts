import { statusCode } from "../../utils/status.util";
import { JournalEntryEntity } from "../../database/entities/entity/journal-entry.entity";
import { FindManyOptions } from "typeorm";

export async function getAllJournalEntryService(
  options?: FindManyOptions<JournalEntryEntity>
) {
  const journalEntries = await JournalEntryEntity.find(options).catch((e) => {
    console.error("getAllJournalEntryService -> JournalEntryEntity.find: ", e);
    return null;
  });

  if (!journalEntries)
    return Promise.reject({
      message: "No journal entries found",
      status: statusCode.NOT_FOUND,
    });

  return journalEntries;
}
