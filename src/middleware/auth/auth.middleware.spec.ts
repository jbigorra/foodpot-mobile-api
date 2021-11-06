import * as jwt from "jwt-simple";
import { AuthMiddleware, JwtUser } from "./auth.middleware";
import { Request, Response } from "express";

const jwtUserWithFullname = {
  aud: "authenticated",
  exp: new Date().getTime(),
  sub: "some-uuid",
  email: "some@email.com",
  phone: "12345678",
  app_metadata: {
    provider: "Some auth type"
  },
  user_metadata: {
    fullName: "Some Full Name"
  },
  role: "authenticated"
};

const jwtUserWithoutFullname = {
  ...jwtUserWithFullname,
  app_metadata: jwtUserWithFullname.app_metadata,
  user_metadata: {}
};

describe("AuthMiddleware", () => {
  it("should be defined", () => {
    expect(new AuthMiddleware()).toBeDefined();
  });

  describe("Given authorization header is not present in request", () => {
    it("Should not attach ContextUser to Request object", () => {
      const req = {
        headers: {
          authorization: undefined
        }
      } as Request;
      const authMiddleware = new AuthMiddleware();
      const res = {} as Response;
      const next = jest.fn();

      authMiddleware.use(req, res, next);

      expect(req.user).toBeUndefined();
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe("Given authorization header is present in request", () => {
    it.each([[jwtUserWithFullname], [jwtUserWithoutFullname]])(
      "Should attach ContextUser to Request object",
      (jwtUser: JwtUser) => {
        const req = {
          headers: {
            authorization: jwt.encode(jwtUser, "secret-key")
          }
        } as Request;
        const authMiddleware = new AuthMiddleware();
        const res = {} as Response;
        const next = jest.fn();

        authMiddleware.use(req, res, next);

        const expectedContextUser = {
          uuid: jwtUser.sub,
          email: jwtUser.email,
          phone: jwtUser.phone,
          fullName: jwtUser.user_metadata?.fullName,
          provider: jwtUser.app_metadata.provider
        };

        expect(req.user).toEqual(expectedContextUser);
        expect(next).toHaveBeenCalledTimes(1);
      }
    );
  });
});
