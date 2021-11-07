import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { SupabaseConfig } from "../../shared/modules/config/supabase.config";
import { createMock } from "ts-auto-mock";
import { SupabaseClient } from "@supabase/supabase-js";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SupabaseClient,
          useValue: createMock<SupabaseClient>()
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
