import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
registerForm!:NgForm
post  = {
  user_id: '',
  title: '',
  body: ''

}
constructor(private http: HttpService, private router:Router){}
//get infos from the ngForm and create a new post
  createPost(registerForm:NgForm){
    this.post.title = registerForm.value.title;
    this.post.body = registerForm.value.body;
    this.http.createPost(registerForm.value.Id,this.post).subscribe(res=>{alert('Post created!'),
     this.router.navigate(['/posts'])
    console.log(res)})

  }
}
