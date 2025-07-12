import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { FixedAssetEntity } from "./fixed-asset.entity";

@Entity({ name: "depreciation_calculations" })
export class DepreciationCalculationEntity extends BaseEntity {
  @Column()
  process_date: Date;

  @Column({ type: "float", precision: 10, scale: 2 })
  depreciation_amount: number;

  @Column({ type: "float", precision: 10, scale: 2 })
  accumulated_depreciation: number;

  @Column()
  purchase_account: string;

  @Column()
  depreciation_account: string;

  @Column()
  fixed_asset_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(
    () => FixedAssetEntity,
    (fixedAsset) => fixedAsset.deprecationCalculations
  )
  @JoinColumn({ name: "fixed_asset_id", referencedColumnName: "id" })
  fixedAsset: FixedAssetEntity;
}
