import { statusCode } from "../../utils/status.util";
import { JournalEntryEntity } from "../../database/entities/entity/journal-entry.entity";
import { FindOneOptions } from "typeorm";

export async function getOneJournalEntryService(
  option: FindOneOptions<JournalEntryEntity>
) {
  const foundJournalEntry = await JournalEntryEntity.findOne(option).catch((e) => {
    console.error("getOneJournalEntryService -> JournalEntryEntity.findOne: ", e);
    return null;
  });

  if (!foundJournalEntry) {
    return Promise.reject({
      message: "Journal entry not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundJournalEntry;
}
