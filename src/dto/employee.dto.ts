import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import { PersonDTO } from "./common.dto";
import {
  PersonType,
  PersonTypeEnum,
} from "./../database/entities/entity/employee.entity";

export class CreateEmployeeDTO extends PersonDTO {
  @IsOptional()
  @IsString()
  departmentUUID: string;

  @IsNotEmpty()
  @IsEnum(PersonTypeEnum)
  personType: PersonType;
}

export class UpdateEmployeeDTO {
  @IsOptional()
  @IsString()
  identification: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  departmentUUID: string;

  @IsNotEmpty()
  @IsEnum(PersonTypeEnum)
  personType: PersonType;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
