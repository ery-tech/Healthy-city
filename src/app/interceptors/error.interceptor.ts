import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorShowService } from '../services/error-show.service';
 @Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService : ErrorShowService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      retry(1),
      catchError((error: HttpErrorResponse):any => {
      this.errorService.checkErrorType(`${error.status}`)
      throwError(()=>{error});
      })
    ) as Observable<HttpEvent<unknown>>;
  }

  }



