import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate
} from "class-validator";
import { IsEqualTo } from "../../../validators/password.validator";

export class SignupWithEmailRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(28)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])((?=.*[A-Z])|(?=.*[a-z])).*$/, {
    message: "password too weak"
  })
  password: string;

  @Validate(IsEqualTo, ["password"])
  confirmPassword: string;
}

export class SigninWithEmailRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshUserSessionRequest {
  @IsNotEmpty()
  refreshToken: string;
}

export class RecoverAccountRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
