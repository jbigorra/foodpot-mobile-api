export class RecoverAccountTemplateResponse {
  constructor(
    readonly accessToken: string,
    readonly updatePasswordUrl: string
  ) {}
}

export class RedirectAuthTemplateResponse {
  constructor(readonly recoverUrl: string) {}
}
