import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { InventoryTypeEntity } from "./inventory-type.entity";
import { LedgerAccountEntity } from "./ledger-account.entity";

export enum MovementTypeEnum {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export type MovementType = keyof typeof MovementTypeEnum;

@Entity({ name: "journal_entries" })
export class JournalEntryEntity extends BaseEntity {
  @Column({ default: 8 })
  auxiliary_id: number;

  @Column({ default: null })
  journal_id: number;

  @Column()
  description: string;

  @Column()
  entry_date: Date;

  @Column()
  inventory_type_id: number;

  @Column()
  ledger_account_id: number;

  @Column({ type: "float", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "enum", enum: MovementTypeEnum })
  movement_type: MovementType;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(
    () => InventoryTypeEntity,
    (inventoryType) => inventoryType.journalEntries
  )
  @JoinColumn({ name: "inventory_type_id", referencedColumnName: "id" })
  inventoryType: InventoryTypeEntity;

  @ManyToOne(
    () => LedgerAccountEntity,
    (ledgerAccount) => ledgerAccount.journalEntries
  )
  @JoinColumn({ name: "ledger_account_id", referencedColumnName: "id" })
  ledgerAccount: LedgerAccountEntity;
}
