import { HttpClient, HttpErrorResponse, HttpHandler,  HttpHeaders,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {  MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

import { ErrorInterceptor } from './error.interceptor';

const testUrl = '/data';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
let snackBar : SnackBarComponent
let snackBarConfig : MatSnackBarConfig
let errorInterceptor : ErrorInterceptor
let httpClient : HttpClient
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule,MatSnackBarModule],
    providers: [MatSnackBarConfig, SnackBarComponent,
      ErrorInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
    },
      ]

  }));


 beforeEach(()=>{
  // Inject the http service and test controller for each test
  httpClient = TestBed.inject(HttpClient)
 httpMock = TestBed.inject(HttpTestingController);
 snackBar= TestBed.inject(SnackBarComponent)
 snackBarConfig = TestBed.inject(MatSnackBarConfig)
  errorInterceptor = TestBed.inject( ErrorInterceptor)
 })

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });









  });







