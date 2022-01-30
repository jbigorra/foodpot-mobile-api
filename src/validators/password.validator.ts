import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: "CustomMatchPasswords", async: false })
export class IsEqualTo implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean {
    const confirmPassword = (args.object as unknown)[args.constraints[0]];
    return password === confirmPassword;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments): string {
    return "passwords do not match";
  }
}
