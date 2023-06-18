import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,

    ){}




    //Function to show  logout btn

     isLoggedState(){
  //If user is authenticated
    if (this.authService.isAuthenticated() == true){
    return true
    } else  {return false}   }

     //User logout
  logoutClick(){
    if(this.authService.isAuthenticated() == true){
      this.authService.onLogout();
    }
  }



  }
