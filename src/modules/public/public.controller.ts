import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  Render,
  Req
} from "@nestjs/common";
import { Request } from "express";
import { SupabaseAuthType } from "src/shared/vendors/supabase/supabase.provider";
import { RecoverAccountTemplateResponse } from "./template-response.schemas";

@Controller("public")
export class PublicController {
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

    return new RecoverAccountTemplateResponse(accessToken);
  }

  @Get("redirect-auth")
  @Render("redirect-auth")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async redirectAuth(): Promise<void> {}
}
