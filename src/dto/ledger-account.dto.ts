import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import { LedgerAccountType, LedgerAccountTypeEnum } from "./../database/entities/entity/ledger-account.entity";

export class CreateLedgerAccountDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(LedgerAccountTypeEnum)
  type: LedgerAccountType;
}

export class UpdateLedgerAccountDTO {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(LedgerAccountTypeEnum)
  type: LedgerAccountType;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
