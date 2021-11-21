import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "ts-auto-mock";
import { SupabaseClient } from "@supabase/supabase-js";
import { AuthService } from ".";
import { SUPABASE_CLIENT } from "../../shared/modules/vendor";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SUPABASE_CLIENT,
          useValue: createMock<SupabaseClient>()
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
