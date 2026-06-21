export class Guard {
  static againstNullOrUndefined(value: any, message: string) {
    if (value === null || value === undefined) {
      throw new Error(message);
    }
  }

  static againstEmptyString(value: string, message: string) {
    if (!value || value.trim().length === 0) {
      throw new Error(message);
    }
  }
}