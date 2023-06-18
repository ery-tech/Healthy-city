import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

//get all users
getUsersList(page:number, perPage : number): Observable<any>{
  return this.http.get<any>(`${environment.BASE_URL}/users?page=${page}&per_page=${perPage}`);
}
//get specific data about user
getUser(id :any):Observable<any>{
  return this.http.get<any>(`${environment.BASE_URL}/users/${id}`)
}
getUserTodos(id: any ):Observable<any>{
  return this.http.get<any>(`${environment.BASE_URL}/users/${id}/todos`)
}
getUserPosts(id: any):Observable<any>{
return this.http.get<any>(`${environment.BASE_URL}/users/${id}/posts`)
}
getUserComments(id: any):Observable<any>{
return this.http.get<any>(`${environment.BASE_URL}/posts/${id}/comments`)
}

getPosts(page:number, perPage : number):Observable<any>{
return this.http.get<any>(`${environment.BASE_URL}/posts?page=${page}&per_page=${perPage}`);

}



//delete specific user
deleteUser(id: number):Observable<any>{
return this.http.delete<any>(`${environment.BASE_URL}/users/${id}`)

}
//create functions (post, comment and user)
createPost(id:any, body:any):Observable<any>{
return this.http.post<any>(`${environment.BASE_URL}/users/${id}/posts`, body)
}

addComment(id: any, body:{}):Observable<any>{
return this.http.post<any>(`${environment.BASE_URL}/posts/${id}/comments`, body)
}

createUser(body:{}  ):Observable<any>{
  return this.http.post<any>(`${environment.BASE_URL}/users`, body)
  }
}




