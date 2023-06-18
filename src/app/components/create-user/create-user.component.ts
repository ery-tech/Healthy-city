import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  registerForm!: NgForm
  user = {name: "", email: "", gender:"", status: ""}
  validateEmail = true;
constructor(private http: HttpService, private router:Router){}

//get infos from the ngForm and create a new user
  signUp(registerForm:NgForm){
    this.user.name = registerForm.value.name;
    this.user.email = registerForm.value.email;
    this.user.gender = registerForm.value.gender;
    this.user.status = registerForm.value.status;
    this.http.createUser(this.user).subscribe((res:any)=>{
     this.user = res
      alert('New user created');
     this.router.navigate(["/profiles"])




    }
    )}
}
