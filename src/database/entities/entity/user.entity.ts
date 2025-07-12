import { Column, Entity } from "typeorm";
import { StatusEnum, StatusType } from "./../../../constants";
import { PersonBaseEntity } from "../base/person.base.entity";

@Entity({ name: "users" })
export class UserEntity extends PersonBaseEntity {
  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;
}