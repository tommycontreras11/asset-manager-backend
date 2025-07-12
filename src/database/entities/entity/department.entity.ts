import { Column, Entity, OneToMany } from "typeorm";
import { StatusEnum, StatusType } from "../../../constants";
import { BaseEntity } from "../base/base.entity";
import { EmployeeEntity } from "./employee.entity";
import { FixedAssetEntity } from "./fixed-asset.entity";

@Entity({ name: "departments" })
export class DepartmentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => EmployeeEntity, (employee) => employee.department)
  employees: EmployeeEntity[];

  @OneToMany(() => FixedAssetEntity, (fixedAsset) => fixedAsset.department)
  fixedAssets: FixedAssetEntity[];
}
