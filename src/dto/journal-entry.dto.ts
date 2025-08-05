import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import {
  MovementType,
  MovementTypeEnum,
} from "./../database/entities/entity/journal-entry.entity";
import { Type } from "class-transformer";

export class CreateJournalEntryDTO {
  @IsNotEmpty()
  @IsString()
  entry_date: Date;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message: "Amount must have at most 10 digits in total and 2 decimal places",
  })
  amount: string;

  @IsNotEmpty()
  @IsUUID("4")
  inventoryTypeUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  ledgerAccountUUID: string;

  @IsNotEmpty()
  @IsEnum(MovementTypeEnum)
  movementType: MovementType;
}

export class CreateAccountingDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message: "Amount must have at most 10 digits in total and 2 decimal places",
  })
  amount: string;

  @IsNotEmpty()
  @IsString()
  entry_date: Date;

  @IsNotEmpty()
  @IsUUID("4")
  ledgerAccountUUID: string;

  @IsNotEmpty()
  @IsEnum(MovementTypeEnum)
  movementType: MovementType;
}

export class CreateAccountingListDTO {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAccountingDTO)
  accounting: CreateAccountingDTO[];
}

export class UpdateJournalEntryDTO {
  @IsOptional()
  @IsString()
  entry_date: Date;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message: "Amount must have at most 10 digits in total and 2 decimal places",
  })
  amount: string;

  @IsOptional()
  @IsUUID("4")
  inventoryTypeUUID: string;

  @IsOptional()
  @IsUUID("4")
  ledgerAccountUUID: string;

  @IsOptional()
  @IsEnum(MovementTypeEnum)
  movementType: MovementType;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
