import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;
}

export class UpdatePasswordRequest {
  password: string;
}
