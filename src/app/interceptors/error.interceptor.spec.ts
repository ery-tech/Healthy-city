import { HttpClient, HttpErrorResponse, HttpHandler,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  TestBed } from '@angular/core/testing';
import {  MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import {  firstValueFrom,  } from 'rxjs';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

import { ErrorInterceptor } from './error.interceptor';

const testUrl = '/data';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
let snackBar : SnackBarComponent
let snackBarConfig : MatSnackBarConfig
let errorInterceptor : ErrorInterceptor
let httpHandle : HttpHandler
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
  httpHandle = TestBed.inject(HttpHandler)
 })

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });


  it('should return 503 error ', async () =>{
    const observable$ = httpClient.get(testUrl)
    const serviceUnavailable = new HttpErrorResponse({
      status: 503,
      statusText: 'Server Error, something went wrong with the server.',
      url: testUrl
    })

    const httpReqPromise = firstValueFrom(observable$)
    httpMock.expectOne(testUrl).flush('error', serviceUnavailable)

    try {
      const error: any = await httpReqPromise
      expect(error instanceof HttpErrorResponse).toBeTrue()
      expect(error.status).toBe(503)
    } catch(__) {
      fail('It should have not thrown')
    }
})

it('should return 401 error ', async () =>{
  const observable$ = httpClient.get(testUrl)
  const serviceUnavailable = new HttpErrorResponse({
    status: 401,
    statusText: 'Authorization Error, make sure the token is correct.',
    url: testUrl
  })

  const httpReqPromise = firstValueFrom(observable$)
  httpMock.expectOne(testUrl).flush('error', serviceUnavailable)

  try {
    const error: any = await httpReqPromise
    expect(error instanceof HttpErrorResponse).toBeTrue()
    expect(error.status).toBe(401)
  } catch(__) {
    fail('It should have not thrown')
  }
})

it('should return 404 error ', async () =>{
  const observable$ = httpClient.get(testUrl)
  const serviceUnavailable = new HttpErrorResponse({
    status: 404,
    statusText: 'Authorization Error, make sure the token is correct.',
    url: testUrl
  })

  const httpReqPromise = firstValueFrom(observable$)
  httpMock.expectOne(testUrl).flush('error', serviceUnavailable)

  try {
    const error: any = await httpReqPromise
    expect(error instanceof HttpErrorResponse).toBeTrue()
    expect(error.status).toBe(404)
  } catch(__) {
    fail('It should have not thrown')
  }
})
  });







