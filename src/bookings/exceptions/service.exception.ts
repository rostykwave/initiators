export class ServiceException extends Error {
  readonly code: number = 400;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}
