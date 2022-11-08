import { HttpException } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(private details, private code) {
    super(details, code);
  }
}