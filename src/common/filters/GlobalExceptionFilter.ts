import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Render } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  private view = 'exceptions/error';
  private message = 'Internal server error';
  
  private setMessage(message){
    this.message = message;
  }

  private getMessage(): string {
    return this.message;
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    switch(status){
      case 404:
        this.setMessage('Page not found');
        break;
      default:
        this.setMessage('Internal server error');
        break;
    }

    response.render(this.view, {
      statusCode: status,
      message: this.getMessage(),
    });
  }
}