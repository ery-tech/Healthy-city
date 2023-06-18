import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  accessToken: string = ''
  //get access token in localStorage
  getAccessToken(){

   return localStorage.getItem('accessToken')
}
//check if access token is stored
isAuthenticated(){
  if( localStorage.getItem('accessToken') != null ){
    return true}
  else return false ;
}
//logout fn
  onLogout(){
    localStorage.clear(),
    this.router.navigate([''])
  }
}
