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

  defaultMessage(_: ValidationArguments): string {
    return "Passwords do not match";
  }
}
