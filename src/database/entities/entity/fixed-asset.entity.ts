import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { AssetTypeEntity } from "./asset-type.entity";
import { DepartmentEntity } from "./department.entity";
import { DepreciationCalculationEntity } from "./depreciation-calculation.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity({ name: "fixed_assets" })
export class FixedAssetEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  purchase_value: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  accumulated_depreciation: number;

  @Column()
  department_id: number;

  @Column()
  asset_type_id: number;

  @Column()
  employee_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => AssetTypeEntity, (assetType) => assetType.fixedAssets)
  @JoinColumn({ name: "asset_type_id", referencedColumnName: "id" })
  assetType: AssetTypeEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.fixedAssets)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.fixedAssets)
  @JoinColumn({ name: "employee_id", referencedColumnName: "id" })
  employee: EmployeeEntity;

  @OneToMany(
    () => DepreciationCalculationEntity,
    (deprecationCalculation) => deprecationCalculation.fixedAsset
  )
  deprecationCalculations: DepreciationCalculationEntity[];
}
