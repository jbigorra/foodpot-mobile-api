import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  Render
} from "@nestjs/common";
// import { ApiExcludeController } from "@nestjs/swagger";
import { ServerConfig } from "../../shared/modules/config/server.config";
import { SupabaseAuthType } from "../../shared/modules/vendor/supabase/supabase.provider";
import { RecoverAccountTemplateResponse, RedirectAuthTemplateResponse } from "./template-response.schemas";

@Controller("public")
// @ApiExcludeController()
export class PublicController {
  constructor(private readonly serverConfig: ServerConfig) {}

  @Get("/recover-account")
  @Render("recover-account")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async recoverAccount(
    @Query("access_token") accessToken: string,
    @Query("type") type: SupabaseAuthType
  ): Promise<RecoverAccountTemplateResponse> {
    if (type !== SupabaseAuthType.RECOVERY) {
      throw new ForbiddenException();
    }

    return new RecoverAccountTemplateResponse(
      accessToken,
      `${this.serverConfig.apiUrl}/v1/users/password`
    );
  }

  @Get("redirect-auth")
  @Render("redirect-auth")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async redirectAuth(): Promise<RedirectAuthTemplateResponse> {
    return new RedirectAuthTemplateResponse(
      `${this.serverConfig.apiUrl}/public/recover-account`
    );
  }
}
