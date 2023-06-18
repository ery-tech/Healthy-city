import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  totalRequests = 0;

  constructor(
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   //catch http request
    console.log('caught')
    this.totalRequests++;
    //flip the state to loading
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        //As soon as all outgoing requests have completed,
        //it will flip the loading state back to false.
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}

