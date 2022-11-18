export class ServiceException extends Error {
  private code = 400;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}
