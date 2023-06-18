import { HttpClient, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let loaderService: LoaderService
  let httpClient: HttpClientTestingModule;
  let httpMock: HttpTestingController;
  let interceptor: LoadingInterceptor
  let httpHandle : HttpHandler
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true,
    }
      ],
      imports: [HttpClientTestingModule]


  }));

  beforeEach(()=>{
    loaderService = TestBed.inject(LoaderService)
    httpClient= TestBed.inject(HttpClientTestingModule)
    httpMock = TestBed.inject(HttpTestingController)
     interceptor = TestBed.inject(LoadingInterceptor)
     httpHandle = TestBed.inject(HttpHandler)
  })
  afterEach(()=>{
    httpMock.verify();
   })

  it('should be created', () => {
    const interceptor: LoadingInterceptor = TestBed.inject(LoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });




  it('should increase total requests and activate loader', () => {
    const request = new HttpRequest('GET', 'https://test.com/api');
    interceptor.intercept(request, httpHandle);
    expect(interceptor.totalRequests).toBe(1);
    expect(loaderService.getLoading()).toBeTruthy();
    });
});
