import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "ts-auto-mock";
import { SupabaseClient } from "@supabase/supabase-js";
import { AuthService } from ".";
import { SUPABASE_CLIENT } from "../../deps-tokens/tokens";
import { ServerConfig } from "../../shared/modules/config";

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
