import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  constructor(private http: HttpService,
    private commentsSheet: MatBottomSheet,
    private shareService : ShareService

    ){}

    registerForm!:NgForm
    comment ={ name:'', email: '', body:''}
    ngOnInit(): void {

   }

   //create a new comment
   createComment(registerForm: NgForm){
    this.comment.name = registerForm.value.name;
    this.comment.email= registerForm.value.email
    this.comment.body= registerForm.value.body
   this.http.addComment(registerForm.value.Id,
    this.comment).subscribe(res =>{
        this.comment = res
         alert('Comment created!')
        this.updateComments()
     })
  }

  // if a comment is created update comments section by calling shareService
  updateComments(){
    this.commentsSheet.dismiss();
    this.shareService.commentCreated();
    }


  }

