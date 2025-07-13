import { JournalEntryEntity } from "../../database/entities/entity/journal-entry.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteJournalEntryService(uuid: string) {
  const foundJournalEntry = await JournalEntryEntity.findOneBy({ uuid }).catch((e) => {
    console.error("deleteJournalEntryService -> JournalEntryEntity.findOneBy: ", e);
    return null;
  });

  if (!foundJournalEntry) {
    return Promise.reject({
      message: "Journal entry not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundJournalEntry.softRemove().catch((e) => {
    console.error("deleteJournalEntryService -> JournalEntryEntity.update: ", e);
    return null;
  });

  return "Journal entry deleted successfully";
}
