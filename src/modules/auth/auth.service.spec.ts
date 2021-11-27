import { Test, TestingModule } from "@nestjs/testing";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../../deps-tokens/tokens";
import { AuthService } from "./auth.service";
import { createMock } from "@golevelup/ts-jest";
import { ServerConfig } from "../../shared/modules/config/server.config";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SUPABASE_CLIENT,
          useValue: createMock<SupabaseClient>()
        },
        {
          provide: ServerConfig,
          useValue: createMock<ServerConfig>()
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
