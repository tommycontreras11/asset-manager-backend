import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateAssetTypeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  purchaseAccountUUID: string;

  @IsNotEmpty()
  @IsUUID('4')
  depreciationAccountUUID: string;
}

export class UpdateAssetTypeDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4')
  purchaseAccountUUID: string;

  @IsOptional()
  @IsUUID('4')
  depreciationAccountUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
