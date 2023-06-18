import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}
  intercept( req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    // Get the auth token from the service.
    const authToken = this.authService.getAccessToken()

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
    setHeaders:{
      'Accept': 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${authToken} `
   },

    })
    // send cloned request with header to the next handler.
    return next.handle(authReq)
  }



}

