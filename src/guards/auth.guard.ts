import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../modules/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest<Request>().user;

    if (!user) throw new UnauthorizedException();

    const validatedUser = await this.authService.getUser(user.accessToken);

    return !!validatedUser;
  }
}
