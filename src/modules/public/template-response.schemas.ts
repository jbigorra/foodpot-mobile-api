export class RecoverAccountTemplateResponse {
  constructor(readonly accessToken: string) {}
}

export class RedirectAuthTemplateResponse {
  constructor(readonly recoverUrl: string) {}
}
