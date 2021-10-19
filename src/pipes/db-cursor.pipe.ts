import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class DbCursorPipe implements PipeTransform<string, number | undefined> {
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? undefined : parsedValue;
  }
}
