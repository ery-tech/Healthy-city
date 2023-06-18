
import { Component,   OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit{
  loginForm!: NgForm

constructor( private router: Router,
  private bottomSheetRef : MatBottomSheetRef){

}
  ngOnInit() { }

//set access token in localStorage
login(loginForm:NgForm){

  localStorage.setItem('accessToken',loginForm.value.accessToken)
  this.bottomSheetRef.dismiss();
  this.router.navigate(['/profiles'])
}

}


