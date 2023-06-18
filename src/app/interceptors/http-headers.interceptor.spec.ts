import { HttpHeadersInterceptor } from './http-headers.interceptor';

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { AppModule } from '../app.module';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

const testUrl = '/data';
describe('HttpHeadersInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService : AuthService
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, AppModule],
    providers: [HttpHeadersInterceptor, SnackBarComponent,
   // register our interceptor with the testing module
   {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true
  }
      ]

 }));

 beforeEach(()=>{
  // Inject the http service and test controller for each test
 httpClient = TestBed.inject(HttpClient);
 httpMock = TestBed.inject(HttpTestingController);
 authService = TestBed.inject(AuthService);

 })

   afterEach(()=>{
    httpMock.verify();
   })


  it('should be created', () => {
    const interceptor: HttpHeadersInterceptor = TestBed.inject(HttpHeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });


  it('should add headers to http calls', () => {
     // for localstorage mocking
let store :any= {};
const mockLocalStorage = {
  getItem: (key: string): string => {
    return key in store ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  } }

  spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    localStorage.setItem('accessToken', 'any auth token here');
    const authToken = localStorage.getItem('accessToken');
  const getAccessTokenFn = spyOn(authService, 'getAccessToken').and.returnValue(authToken)

     httpClient.get(`${environment.BASE_URL}/users`, {headers: {
      'Authorization': `Bearer ${getAccessTokenFn}`}}).subscribe(res =>{
      expect(res).toBeTruthy()
    })

   const httpReq = httpMock.expectOne(`${environment.BASE_URL}/users`);
   expect(httpReq.request.headers.has('Content-Type')).toEqual(true);
   expect(httpReq.request.headers.has('Accept')).toEqual(true);
   expect(httpReq.request.headers.has('Authorization')).toEqual(true);
   expect(httpReq.request.headers.get('Content-Type')).toBe('application/json');
   expect(httpReq.request.headers.get('Accept')).toBe('application/json');
   expect(httpReq.request.headers.get('Authorization')).toContain('Bearer any auth token here');


  });

})
