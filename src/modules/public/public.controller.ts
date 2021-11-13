import { Controller, Get, Render } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Controller("public")
export class PublicController {
  @Get("/recover-account")
  @Render("recover-account")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async recoverAccount(): Promise<void> {}
}
