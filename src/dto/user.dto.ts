import { IsEnum, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import { PersonDTO } from "./common.dto";

export class CreateUserDTO extends PersonDTO {}

export class UpdateUserDTO {
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
  @IsEnum(StatusEnum)
  status: StatusType;
}
