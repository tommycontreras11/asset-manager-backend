import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { AssetTypeEntity } from "./asset-type.entity";
import { JournalEntryEntity } from "./journal-entry.entity";

export enum LedgerAccountTypeEnum {
  PURCHASE = "PURCHASE",
  DEPRECIATION = "DEPRECIATION",
  GENERAL = "GENERAL",
}

export type LedgerAccountType = keyof typeof LedgerAccountTypeEnum;

@Entity({ name: "ledger_accounts" })
export class LedgerAccountEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: LedgerAccountTypeEnum })
  type: LedgerAccountType;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => AssetTypeEntity, (assetType) => assetType.purchaseAccount)
  purchaseAccounts: AssetTypeEntity[];

  @OneToMany(
    () => AssetTypeEntity,
    (assetType) => assetType.depreciationAccount
  )
  depreciationAccounts: AssetTypeEntity[];

  @OneToMany(
    () => JournalEntryEntity,
    (journalEntry) => journalEntry.ledgerAccount
  )
  journalEntries: JournalEntryEntity[];
}
