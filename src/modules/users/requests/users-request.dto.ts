import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate
} from "class-validator";
import { IsEqualTo } from "../../../validators/password.validator";

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;
}

export class UpdatePasswordRequest {
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
