import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateInventoryTypeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;
}

export class UpdateInventoryTypeDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
