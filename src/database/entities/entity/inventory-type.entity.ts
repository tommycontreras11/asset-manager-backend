import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { JournalEntryEntity } from "./journal-entry.entity";

@Entity({ name: "inventory_types" })
export class InventoryTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(
    () => JournalEntryEntity,
    (journalEntry) => journalEntry.inventoryType
  )
  journalEntries: JournalEntryEntity[];
}
