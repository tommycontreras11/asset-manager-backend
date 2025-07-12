import { IsNotEmpty, IsString } from "class-validator";

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}