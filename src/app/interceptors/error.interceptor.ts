import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
 @Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: SnackBarComponent) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      catchError((error)=>{
      if(error instanceof HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
          console.log('Error Event');
        } else {
          switch (error.status){
            case 401: //unauthorized
           this.snackBar.openSnackBar(
            'Authorization Error, make sure the token is correct.',
           'close', 'redSnackbar'
           );
           break;
           case 404: //Not Found
           this.snackBar.openSnackBar(
            'The requested resource does not exist.',
           'close', 'redSnackbar'
             );
           break;
           case 503: // Server error
           this.snackBar.openSnackBar(
            ' Server Error, something went wrong with the server.',
           'close', 'redSnackbar'
           );
           break;

          }
        }
      } else { console.log('An error occurred')}
      return throwError( ()=>{ new Error(error.statusText)})
    }) )

  }

}
