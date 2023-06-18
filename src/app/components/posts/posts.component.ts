import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpService } from 'src/app/services/http.service';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

 constructor(private http : HttpService, private createSheet: MatBottomSheet ,
   ){}
 startingPage : number = 1
 posts :any
 comments:any
 value : any
 currentPage: number = 1


  ngOnInit(): void {
   this.fetchPosts()

  }

  //onInit this function will retrieve first 20 posts
fetchPosts(){
  this.http.getPosts(this.startingPage, 20).subscribe(res => {this.posts = res})
}

//fetch specific comments with post id
fetchComments(id:number){
  this.http.getUserComments(id).subscribe(res => {
    if (res != ''){
      this.comments = res
    } else {
      this.comments = [{post_id : id, name: 'No comments yet'}]
    }
  })
}

//search for a specific post by title
searchPost(value: any){
this.http.getPosts(this.startingPage, 100).subscribe(res =>{
  this.posts = res
  this.posts = this.posts.filter((res:any)=>{
    return res.title.toLowerCase().match(value.toLowerCase())
  })    })
}

//open matSheet to create a new user
onAddClick(){
  this.createSheet.open(CreatePostComponent);
  }

//function to get list of posts based on page number
changePage(page:number):void{
  this.currentPage = page;
  this.http.getPosts(this.currentPage,20).subscribe(res=>{
    this.posts = res;
  })
  }


}
