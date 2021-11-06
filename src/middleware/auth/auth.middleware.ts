import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { IContextUser } from "../../types";

export type JwtUser = {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: { provider: string };
  user_metadata: { fullName?: string };
  role: string;
};

export class ContextUser implements IContextUser {
  constructor(
    readonly uuid: string,
    readonly email: string,
    readonly phone: string,
    readonly fullName?: string,
    readonly provider?: string
  ) {}
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) return next();

    const jwtUser = jwtDecode(req.headers.authorization) as JwtUser;

    req.user = new ContextUser(
      jwtUser.sub,
      jwtUser.email,
      jwtUser.phone,
      jwtUser.user_metadata?.fullName,
      jwtUser.app_metadata?.provider
    );

    next();
  }
}
