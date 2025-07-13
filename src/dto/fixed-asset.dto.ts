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

export class CreateFixedAssetDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Purchase value must have at most 10 digits in total and 2 decimal places",
  })
  purchase_value: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Accumulated depreciation must have at most 10 digits in total and 2 decimal places",
  })
  accumulated_depreciation: string;

  @IsNotEmpty()
  @IsUUID("4")
  departmentUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  assetTypeUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  employeeUUID: string;
}

export class UpdateFixedAssetDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Purchase value must have at most 10 digits in total and 2 decimal places",
  })
  purchase_value: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Accumulated depreciation must have at most 10 digits in total and 2 decimal places",
  })
  accumulated_depreciation: string;

  @IsOptional()
  @IsUUID("4")
  departmentUUID: string;

  @IsOptional()
  @IsUUID("4")
  assetTypeUUID: string;

  @IsOptional()
  @IsUUID("4")
  employeeUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
