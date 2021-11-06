export interface IContextUser {
  readonly uuid: string;
  readonly email: string;
  readonly phone: string;
  readonly fullName?: string;
  readonly provider?: string;
  readonly accessToken: string;
}

declare global {
  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user?: IContextUser;
    }
  }
}
