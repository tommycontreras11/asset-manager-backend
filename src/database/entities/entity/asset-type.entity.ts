import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { FixedAssetEntity } from "./fixed-asset.entity";
import { LedgerAccountEntity } from "./ledger-account.entity";

@Entity({ name: "asset_types" })
export class AssetTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  purchase_account_id: number;

  @Column()
  depreciation_account_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(
    () => LedgerAccountEntity,
    (ledgerAccount) => ledgerAccount.purchaseAccounts
  )
  @JoinColumn({ name: "purchase_account_id", referencedColumnName: "id" })
  purchaseAccount: LedgerAccountEntity;

  @ManyToOne(
    () => LedgerAccountEntity,
    (ledgerAccount) => ledgerAccount.depreciationAccounts
  )
  @JoinColumn({ name: "depreciation_account_id", referencedColumnName: "id" })
  depreciationAccount: LedgerAccountEntity;

  @OneToMany(() => FixedAssetEntity, (fixedAsset) => fixedAsset.assetType)
  fixedAssets: FixedAssetEntity[];
}
