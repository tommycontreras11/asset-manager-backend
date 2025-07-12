import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { DepartmentEntity } from "./department.entity";
import { FixedAssetEntity } from "./fixed-asset.entity";

export enum PersonTypeEnum {
  INDIVIDUAL = "INDIVIDUAL",
  JURIDIC = "JURIDIC",
}

export type PersonType = keyof typeof PersonTypeEnum;

@Entity({ name: "employees" })
export class EmployeeEntity extends PersonBaseEntity {
  @Column({ type: "enum", enum: PersonTypeEnum })
  person_type: PersonType;

  @Column()
  department_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @OneToMany(() => FixedAssetEntity, (fixedAsset) => fixedAsset.employee)
  fixedAssets: FixedAssetEntity[];
}
