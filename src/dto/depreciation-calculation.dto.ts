import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateDepreciationCalculationDTO {
  @IsNotEmpty()
  @IsString()
  process_date: string;

  @IsNotEmpty()
  @IsUUID("4")
  fixedAssetUUID: string;
}

export class UpdateDepreciationCalculationDTO {
  @IsOptional()
  @IsString()
  process_date: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Depreciation amount must have at most 10 digits in total and 2 decimal places",
  })
  depreciation_amount: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Accumulated depreciation amount must have at most 10 digits in total and 2 decimal places",
  })
  accumulated_depreciation: string;

  @IsOptional()
  @IsUUID("4")
  fixedAssetUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
