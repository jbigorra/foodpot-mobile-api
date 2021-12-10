import { User } from "@supabase/supabase-js";

export class UserResponse {
  readonly id: string;
  readonly email: string;
  readonly phone?: string;
  readonly username: string;

  constructor(id: string, email: string, phone: string, username: string) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.username = username;
  }

  static from(user: User): UserResponse {
    return new UserResponse(
      user.id,
      user.email,
      user.phone,
      user.user_metadata.username || ""
    );
  }
}
