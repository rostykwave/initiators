export class ServiceException extends Error {
  readonly code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}
