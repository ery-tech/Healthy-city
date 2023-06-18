import { Component,  OnInit} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpService } from 'src/app/services/http.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit{

  constructor( private http : HttpService, private addSheet : MatBottomSheet){}
  usersList! :any
  startingPage: number = 1
  searchValue: string =''
  currentPage: number = 1


 ngOnInit(): void {
  this.getUsers();


}



//function to get first 20 users
getUsers(){
  this.http.getUsersList(this.startingPage, 20).subscribe(res=>{this.usersList= res})
}

//function to get a specific user
searchUser(searchValue:string){
  this.http.getUsersList(this.startingPage, 100).subscribe(res=>{
    this.usersList = res;
   this.usersList =  this.usersList.filter((response:any): any =>{
        return response.name.toLowerCase().match(searchValue.toLowerCase())
})
})
}
//function to get list of users based on page number
changePage(page:number):void{
this.currentPage = page;
this.http.getUsersList(this.currentPage,20).subscribe(res=>{
  this.usersList = res;
})
}

//function to delete a specific user
deleteUser(id:any){
  this.http.deleteUser(id).subscribe(res =>{alert('User deleted'), this.getUsers()})
}
//open matSheet to create a new user
onAddClick(){
this.addSheet.open(CreateUserComponent);
}
}
