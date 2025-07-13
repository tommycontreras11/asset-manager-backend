import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID, Matches } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateJournalEntryDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  entry_date: Date;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Amount must have at most 10 digits in total and 2 decimal places",
  })
  amount: string;

  @IsNotEmpty()
  @IsUUID('4')
  inventoryTypeUUID: string;

  @IsNotEmpty()
  @IsUUID('4')
  ledgerAccountUUID: string;
}

export class UpdateJournalEntryDTO {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  entry_date: Date;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Amount must have at most 10 digits in total and 2 decimal places",
  })
  amount: string;

  @IsOptional()
  @IsUUID('4')
  inventoryTypeUUID: string;

  @IsOptional()
  @IsUUID('4')
  ledgerAccountUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
