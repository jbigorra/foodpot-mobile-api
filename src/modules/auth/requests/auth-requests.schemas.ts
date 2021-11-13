export class SignupWithEmailRequest {
  email: string;
  password: string;
}

export class SigninWithEmailRequest {
  email: string;
  password: string;
}

export class RefreshUserSessionRequest {
  refreshToken: string;
}

export class RecoverAccountRequest {
  email: string;
}
