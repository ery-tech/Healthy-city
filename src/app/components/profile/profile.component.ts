import { Component, OnChanges, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges{
  constructor (private http  : HttpService, private route: ActivatedRoute,
    private commentsSheet: MatBottomSheet, private shareService : ShareService){}


user :any = ''
todos: any = ''
posts: any= ''
comments: any = ''
id!:any
ngOnInit(): void {
  this.id=  this.route.snapshot.paramMap.get('id')
   this.http.getUser(this.id).subscribe(res => {this.user= res})
   this.http.getUserTodos(this.id).subscribe(res => {this.todos = res})
}
ngOnChanges(): void {
  this.checkComments()
}
 //retrieve specific comments
 fetchComments(id:number){
  this.http.getUserComments(id).subscribe(res=>{
   if(res != '' ){this.comments= res}
   else{ this.comments = [{post_id : id, name: 'No comments yet'}]}
  })
 }

//retrieve specific posts on button click
fetchPosts(){
  this.http.getUserPosts(this.id).subscribe(res=>{
    if(res != ''){ this.posts=res}
  else {this.posts = [{body:'No posts yet'}]}})
}

//open Add Comments mat sheet on click
openAddComments(){
  this.commentsSheet.open(CommentsComponent)
}

//this function is used in html template to update comments,
// if a new comment is created show reload btn
checkComments(){
  if(this.shareService.isCommentCreated == true){
  return true   } else return false
}
}
