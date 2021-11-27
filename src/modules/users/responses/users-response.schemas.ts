import { User } from "@supabase/supabase-js";

export class UserResponse {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly phone: string,
    readonly username: string
  ) {}

  static from(user: User): UserResponse {
    return new UserResponse(
      user.id,
      user.email,
      user.phone,
      user.user_metadata.username || ""
    );
  }
}
